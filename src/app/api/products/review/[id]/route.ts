import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import { verifyToken } from "@/lib/auth";

interface Params {
  params: { id: string };
}

export async function POST(req: Request, { params }: Params) {
  try {
    await dbConnect();
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const token = authHeader.split(" ")[1];
    const decoded: any = verifyToken(token);

    const { rating, comment } = await req.json();

    const product = await Product.findById(params.id);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const alreadyReviewed = product.reviews.find(
      (r: any) => r.user.toString() === decoded.id
    );
    if (alreadyReviewed) {
      return NextResponse.json({ error: "Product already reviewed" }, { status: 400 });
    }

    const review = {
      user: decoded.id,
      name: decoded.email,
      rating: Number(rating),
      comment,
    };

    product.reviews.push(review as any);
    await product.save();

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
