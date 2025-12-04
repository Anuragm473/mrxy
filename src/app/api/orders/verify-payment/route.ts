// src/app/api/orders/verify-payment/route.ts
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import dbConnect from "@/lib/db";
import Order from "@/models/Order";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    // Read JSON body in App Router
    const body = await req.json();
    console.log("exec", body);

    const {
      orderId,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
    } = body;

    if (!orderId || !razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
      console.log(orderId, razorpayOrderId, razorpayPaymentId, razorpaySignature);
      return NextResponse.json(
        { error: "Missing parameters" },
        { status: 400 }
      );
    }

    // compute signature: HMAC_SHA256(order_id|payment_id, RAZORPAY_SECRET)
    const shasum = crypto.createHmac(
      "sha256",
      process.env.RAZORPAY_KEY_SECRET as string
    );
    shasum.update(`${razorpayOrderId}|${razorpayPaymentId}`);
    const generatedSignature = shasum.digest("hex");

    const order = await Order.findById(orderId);
    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    // verify signature
    if (generatedSignature === razorpaySignature) {
      // success
      order.status = "paid";
      order.payment = {
        ...order.payment,
        razorpayOrderId,
        razorpayPaymentId,
        razorpaySignature,
        method: "razorpay",
        captured: true,
      };
      await order.save();

      return NextResponse.json({
        success: true,
        message: "Payment verified and order marked paid",
      });
    } else {
      // signature mismatch -> mark failed
      order.status = "failed";
      order.payment = {
        ...order.payment,
        razorpayOrderId,
        razorpayPaymentId,
        razorpaySignature,
        method: "razorpay",
        captured: false,
      };
      await order.save();

      return NextResponse.json(
        {
          success: false,
          error: "Signature verification failed, order marked failed",
        },
        { status: 400 }
      );
    }
  } catch (err: any) {
    console.error("verify-payment error:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
