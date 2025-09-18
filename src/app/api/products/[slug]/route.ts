import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Product from "@/models/Product";

interface Params {
  params: { slug: string };
}

export async function GET(req: Request, { params }: Params) {
  try {
    await dbConnect();
    const product = await Product.findOne({ slug: params.slug });
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
