import mongoose, { Schema, Document, Model } from "mongoose";
import slugify from "slugify";

export interface IReview {
  user: mongoose.Types.ObjectId;
  name: string;
  rating: number; // 1–5
  comment: string;
}

export interface IProduct extends Document {
  name: string;
  slug: string;
  description: string;
  color: string;
  category:
    | "Basic"
    | "Baseball"
    | "Snapback"
    | "Trucker"
    | "Fitted Cap"
    | "Exclusive Collection";
  price: number;
  discountedPrice?: number;
  images: string[]; // Cloudinary URLs
  details: string;
  careInstructions: string[];
  reviews: IReview[];
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
  },
  { timestamps: true }
);

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, unique: true },
    description: { type: String, required: true },
    color: { type: String, required: true },
    category: {
      type: String,
      enum: [
        "Basic",
        "Baseball",
        "Snapback",
        "Trucker",
        "Fitted Cap",
        "Exclusive Collection",
      ],
      required: true,
    },
    price: { type: Number, required: true },
    discountedPrice: { type: Number },
    images: { type: [String], default: [] },
    details: { type: String },
    careInstructions: { type: [String], default: [] },
    reviews: { type: [ReviewSchema], default: [] },
  },
  { timestamps: true }
);

// Auto-generate slug from name
ProductSchema.pre<IProduct>("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

const Product: Model<IProduct> =
  mongoose?.models?.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
