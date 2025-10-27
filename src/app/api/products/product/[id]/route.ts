import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Product from "@/models/Product";

// ✅ GET: Fetch a product by ID
export async function GET(req: Request, { params }: any) {
  try {
    await dbConnect();
    const product = await Product.findById(params.id);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

// ✅ PATCH: Update product by ID
export async function PATCH(req: Request, { params }:any) {
  try {
    await dbConnect();
    const data = await req.json();

    const updatedProduct = await Product.findByIdAndUpdate(params.id, data, {
      new: true, // returns updated document
      runValidators: true, // validate before updating
    });

    if (!updatedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    console.error("PATCH Error:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

// ✅ DELETE: Remove product by ID
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();

    const { id } = params;
    console.log("Deleting product with ID:", id);

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}