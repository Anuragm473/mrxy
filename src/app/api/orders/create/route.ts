// src/app/api/orders/create/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Order from "@/models/Order";
import jwt from "jsonwebtoken";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    // Verify authentication
    const authHeader = req.headers.get("authorization");
    console.log(authHeader)
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log(authHeader?.startsWith("Bearer"))
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    let decoded: any;
    console.log({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})
    
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!);
      console.log(decoded)
    } catch (error) {
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { items, shippingAddress, subTotal, tax, shippingFee, totalAmount } = body;

    // Validate required fields
    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "Order items are required" },
        { status: 400 }
      );
    }

    if (!shippingAddress || !shippingAddress.streetName || !shippingAddress.city || !shippingAddress.pincode) {
      return NextResponse.json(
        { error: "Complete shipping address is required" },
        { status: 400 }
      );
    }

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(totalAmount * 100), // Convert to paise
      currency: "INR",
      receipt: `order_${Date.now()}`,
      notes: {
        userId: decoded.userId,
      },
    });


    // Create order in database
    const order = await Order.create({
      user: decoded.id,
      items,
      shippingAddress,
      subTotal,
      tax: tax || 0,
      shippingFee: shippingFee || 0,
      totalAmount,
      currency: "INR",
      status: "created",
      payment: {
        razorpayOrderId: razorpayOrder.id,
      },
    });

    return NextResponse.json({
      success: true,
      orderId: order.id.toString(),
      razorpayOrderId: razorpayOrder.id,
    });
  } catch (error: any) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { error: error || "Failed to create order" },
      { status: 500 }
    );
  }
}