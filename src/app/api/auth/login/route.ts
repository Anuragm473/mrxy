import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { email, password, guestCart } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
    }

    // 🔥 Merge guestCart into DB cart
    if (guestCart && guestCart.length > 0) {
      for (const item of guestCart) {
        const existing = user.cart.find(
          (ci: any) => ci.productId.toString() === item.productId
        );
        if (existing) {
          existing.quantity += item.quantity;
        } else {
          user.cart.push(item);
        }
      }
      await user.save();
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    return NextResponse.json({
      token,
      user,
      cart: user.cart, // return merged cart
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
