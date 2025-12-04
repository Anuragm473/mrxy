// src/app/api/orders/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Order from "@/models/Order";
import { verifyToken } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    await dbConnect();
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const token = authHeader.split(" ")[1];
    const decoded: any = verifyToken(token);

    // if admin, you can return all orders (add query param ?all=true)
    const url = new URL(req.url);
    const all = url.searchParams.get("all");

    if (decoded.role === "admin" && all === "true") {
      const orders = await Order.find().sort({ createdAt: -1 }).populate("user").lean();
      return NextResponse.json(orders);
    }

    const orders = await Order.find({ user: decoded.id }).sort({ createdAt: -1 }).lean();
    return NextResponse.json(orders);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}