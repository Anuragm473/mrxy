import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { verifyToken } from "@/lib/auth";

export async function GET(req: Request) {
  await dbConnect();
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded: any = verifyToken(token);

    const user = await User.findById(decoded.id).populate("cart.productId");
    return NextResponse.json(user.cart);
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
