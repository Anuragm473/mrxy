// pages/api/orders/verify-payment.ts
import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";
import dbConnect from "@/lib/db";
import Order from "@/models/Order";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextApiResponse) {

  try {
    await dbConnect();
    const body = await req.json();

    const {
      orderId,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      // optionally other fields
    } = body;

    if (!orderId || !razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
      return NextResponse.json({ error: "Missing parameters" });
    }

    // compute signature: HMAC_SHA256(order_id|payment_id, RAZORPAY_SECRET)
    const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!);
    shasum.update(`${razorpayOrderId}|${razorpayPaymentId}`);
    const generatedSignature = shasum.digest("hex");

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ error: "Order not found" });


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
      return NextResponse.json({ success: true, message: "Payment verified and order marked paid" });
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
      return NextResponse.json({ success: false, error: "Signature verification failed, order marked failed" });
    }
  } catch (err: any) {
    console.error("verify-payment error:", err);
    return NextResponse.json({ error: err.message || "Server error" });
  }
}
