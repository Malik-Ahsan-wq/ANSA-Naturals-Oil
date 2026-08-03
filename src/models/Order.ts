import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOrder extends Document {
  customerName: string;
  email: string;
  address: string;
  phone: string;
  note?: string;
  totalAmount: number;
  status: string;
  paymentMethod: string;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }[];
  createdAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    customerName: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    note: { type: String },
    totalAmount: { type: Number, required: true },
    status: { type: String, default: "Pending", enum: ["Pending", "Confirmed", "Completed", "Cancelled"] },
    paymentMethod: { type: String, default: "Cash on Delivery" },
    items: [
      {
        productId: { type: String, required: true },
        productName: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

// Prevent overwrite model error
const Order: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
