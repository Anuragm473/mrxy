import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { verifyToken } from "@/lib/auth";


export async function DELETE(req:any, { params }: any) {
  await dbConnect();
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded:any = verifyToken(token);

    const user = await User.findById(decoded.id);
    user.cart = user.cart.filter(
      (item:any) => item.productId.toString() !== params.productId
    );
    await user.save();

    return NextResponse.json(user.cart);
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PATCH(req:any, { params }:any) {
  await dbConnect();
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded: any = verifyToken(token);

    const { quantity } = await req.json();
    const user = await User.findById(decoded.id);

    const item = user.cart.find(
      (i: any) => i.productId.toString() === params.productId
    );
    if (item) {
      item.quantity = quantity;
    }

    await user.save();
    return NextResponse.json(user.cart);
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
