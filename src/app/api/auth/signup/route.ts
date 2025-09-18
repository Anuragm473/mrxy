import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { hashPassword, generateToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { firstName, lastName, email, password, addresses, role } =
      await req.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      addresses,
      role,
    });

    const token = generateToken(user);

    return NextResponse.json({
      token,
      user: { id: user._id, firstName, lastName, email, role },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
