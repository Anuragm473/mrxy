// src/app/api/checkout/webhook/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Order from "@/models/Order";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const payload = await req.text(); // raw body required for signature verification
    const signature = req.headers.get("x-razorpay-signature") || "";

    // verify signature
    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
      .update(payload)
      .digest("hex");

    if (expected !== signature) {
      console.warn("Webhook signature mismatch");
      return new Response("Invalid signature", { status: 400 });
    }

    const body = JSON.parse(payload);
    const event = body.event;

    // handle common events
    if (event === "payment.captured") {
      const payment = body.payload.payment.entity;
      // notes in razorpay.orders.create had orderId
      const notes = payment.notes || {};
      const orderId = payment.notes?.orderId || (payment.order_id ? payment.order_id : null);

      if (orderId) {
        await Order.findOneAndUpdate({ _id: orderId }, {
          status: "paid",
          "payment.razorpayPaymentId": payment.id,
          "payment.razorpayOrderId": payment.order_id,
          "payment.captured": payment.captured,
          "payment.method": payment.method,
          "payment.raw": payment,
        });
      }
    } else if (event === "payment.failed") {
      const payment = body.payload.payment.entity;
      const orderId = payment.notes?.orderId || null;
      if (orderId) {
        await Order.findOneAndUpdate({ _id: orderId }, {
          status: "failed",
          "payment.raw": payment,
        });
      }
    }

    // respond quick
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    console.error("webhook error", err);
    return new Response("Server error", { status: 500 });
  }
}
