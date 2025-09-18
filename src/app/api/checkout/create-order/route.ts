// src/app/api/checkout/create-order/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Order from "@/models/Order";
import Product from "@/models/Product";
import { verifyToken } from "@/lib/auth";
import razorpay from "@/lib/razorpay";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const token = authHeader.split(" ")[1];
    const decoded: any = verifyToken(token);

    const body = await req.json();
    /*
      Expected body:
      {
        items: [{ productId, quantity }],
        shippingAddress: { apartmentName, streetName, city, state, country, pincode },
        paymentMethod: "razorpay" // currently supported
      }
    */

    const { items, shippingAddress, paymentMethod } = body;
    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // Fetch product details server-side to compute price (prevent client tampering)
    const productIds = items.map((i: any) => i.productId);
    const products = await Product.find({ _id: { $in: productIds } });

    // Build order items with current price and validate availability
    const orderItems = items.map((it: any) => {
      const p:any = products.find((x:any) => x._id.toString() === it.productId);
      if (!p) throw new Error(`Product not found: ${it.productId}`);
      return {
        productId: p._id,
        name: p.name || p.title || p.slug,
        unitPrice: p.discountedPrice ?? p.price, // use discountedPrice if present
        quantity: it.quantity || 1,
        image: p.images?.[0] ?? null,
      };
    });

    // compute totals
    const subTotal = orderItems.reduce((s:any, i:any) => s + i.unitPrice * i.quantity, 0);
    const tax = 0; // compute if required
    const shippingFee = 0; // compute if required
    const totalAmount = subTotal + tax + shippingFee; // in rupees

    // create order in DB (status: created)
    const order:any = await Order.create({
      user: decoded.id,
      items: orderItems,
      shippingAddress,
      subTotal,
      tax,
      shippingFee,
      totalAmount,
      currency: "INR",
      status: "created",
    });

    // create Razorpay order (amount in paise)
    const amountInPaise = Math.round(totalAmount * 100);
    const razorpayOrder = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: `order_rcpt_${order._id}`,
      notes: {
        orderId: order._id.toString(),
        userId: decoded.id,
      },
    });

    // store razorpayOrderId in DB
    order.payment = { razorpayOrderId: razorpayOrder.id };
    await order.save();

    // send necessary info to client to open Razorpay Checkout
    return NextResponse.json({
      orderId: order._id,
      razorpayOrderId: razorpayOrder.id,
      amount: amountInPaise,
      currency: "INR",
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    });
  } catch (err: any) {
    console.error("create-order error:", err);
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}
