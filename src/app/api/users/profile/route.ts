import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { verifyToken } from "@/lib/auth";
import Order from "@/models/Order";
import Product from "@/models/Product";

export async function GET(req: Request) {
  try {
    await dbConnect();
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded: any = verifyToken(token);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userOrders=(await Order.find({user:decoded.id})).toSorted((a,b)=>b.createdAt.getTime()-a.createdAt.getTime());
    user.orders=userOrders;

    const suggestedProducts = await Product.find()
  .sort({ createdAt: 1 }) // ascending; use -1 for descending
  .limit(5);

  user.suggestedProducts=suggestedProducts;

    return NextResponse.json({user});
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
