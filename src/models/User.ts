import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    clerkId: { type: String, index: true, unique: true, required: true },
    email: { type: String },
    name: { type: String },
    imageUrl: { type: String },
  },
  { timestamps: true }
);

export type IUser = {
  clerkId: string;
  email?: string;
  name?: string;
  imageUrl?: string;
};

export const User = models.User || model("User", UserSchema);
