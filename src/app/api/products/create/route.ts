import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import { verifyToken } from "@/lib/auth";
import { uploadImage } from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const token = authHeader.split(" ")[1];
    const decoded: any = verifyToken(token);
    if (decoded.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const {
      name,
      description,
      color,
      category,
      price,
      discountedPrice,
      images,
      details,
      careInstructions,
    } = await req.json();

    // Upload images to cloudinary
    let uploadedUrls: string[] = [];
    if (images && images.length > 0) {
      for (const img of images) {
        const uploaded = await uploadImage(img);
        uploadedUrls.push(img);
      }
    }

    const product = await Product.create({
      name,
      description,
      color,
      category,
      price,
      discountedPrice,
      images: uploadedUrls,
      details,
      careInstructions,
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
