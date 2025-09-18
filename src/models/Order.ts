// src/models/Order.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOrderItem {
  productId: mongoose.Types.ObjectId;
  name: string;
  unitPrice: number; // in rupees (or cents — choose consistently). We'll store in paise in payments.
  quantity: number;
  image?: string;
}

export type OrderStatus = "created" | "paid" | "failed" | "processing" | "shipped" | "delivered" | "cancelled";

export interface IOrder extends Document {
  user?: mongoose.Types.ObjectId;
  items: IOrderItem[];
  shippingAddress: {
    apartmentName?: string;
    streetName: string;
    city: string;
    state?: string;
    country?: string;
    pincode: string;
  };
  subTotal: number; // in rupees
  tax?: number;
  shippingFee?: number;
  totalAmount: number; // in rupees
  currency: string; // "INR"
  status: OrderStatus;
  payment: {
    razorpayOrderId?: string;
    razorpayPaymentId?: string;
    razorpaySignature?: string;
    method?: string;
    captured?: boolean;
    raw?: any;
  };
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  name: { type: String, required: true },
  unitPrice: { type: Number, required: true },
  quantity: { type: Number, required: true },
  image: { type: String },
});

const OrderSchema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    items: { type: [OrderItemSchema], default: [] },
    shippingAddress: {
      apartmentName: String,
      streetName: String,
      city: { type: String, required: true },
      state: String,
      country: { type: String, default: "India" },
      pincode: { type: String, required: true },
    },
    subTotal: { type: Number, required: true },
    tax: { type: Number, default: 0 },
    shippingFee: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    currency: { type: String, default: "INR" },
    status: { type: String, default: "created" },
    payment: {
      razorpayOrderId: String,
      razorpayPaymentId: String,
      razorpaySignature: String,
      method: String,
      captured: Boolean,
      raw: Schema.Types.Mixed,
    },
  },
  { timestamps: true }
);

const Order: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);
export default Order;
