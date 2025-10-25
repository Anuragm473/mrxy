import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { verifyToken } from "@/lib/auth";

// ✅ DELETE single product from cart
export async function DELETE(
  req: Request,
  { params }: { params: { productId: string } }
) {
  await dbConnect();
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded: any = verifyToken(token);

    const user = await User.findById(decoded.id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Remove product from cart
    user.cart = user.cart.filter(
      (item: any) => item.productId.toString() !== params.productId
    );

    await user.save();

    return NextResponse.json(user.cart);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}