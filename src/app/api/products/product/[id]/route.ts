import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Product from "@/models/Product";



export async function GET(req: any, { params }: any) {
  try {
    await dbConnect();
    const product = await Product.findById(params.id);
    console.log(product)
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
