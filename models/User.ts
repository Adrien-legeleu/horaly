import mongoose, { Schema, Document } from "mongoose";

// Enum pour les rôles
export enum Role {
  USER = "user",
  ADMIN = "admin",
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  image?: string;
  emailVerified?: Date | null;
  role: string;
  phone?: string;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String },
    emailVerified: { type: Date, default: null },
    role: { type: String, default: Role.USER },
    phone: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;
