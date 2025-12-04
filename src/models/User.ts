import mongoose, { Schema, Document } from "mongoose";
import { unique } from "next/dist/build/utils";

export interface IAddress {
  apartment: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface ICartItem {
  productId: mongoose.Types.ObjectId;
  quantity: number;
}

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone:string;
  orders:[];
  password: string;
  addresses: IAddress[];
  role: "user" | "admin";
  cart: ICartItem[];
}

const AddressSchema = new Schema<IAddress>({
  apartment: String,
  street: String,
  city: String,
  state: String,
  pincode: String,
  country: { type: String, default: "India" },
});

const CartItemSchema = new Schema<ICartItem>({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, default: 1 },
});

const UserSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    phone:{type:String,unique:true},
    orders:{type:[mongoose.Types.ObjectId]},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    addresses: [AddressSchema],
    role: { type: String, enum: ["user", "admin"], default: "user" },
    cart: { type: [CartItemSchema], default: [] },
  },
  { timestamps: true }
);

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);
