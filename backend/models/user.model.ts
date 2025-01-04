import mongoose from "mongoose";

export enum Role {
  USER = "user",
  ADMIN = "admin",
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  image: string;
  emailVerified: boolean | null;
  role: Role;
  city: string;
  country: string;
  tel: string;
  lastname: string;
  street: string;
  postalCode: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
    },
    email: {
      type: String,
      required: [true, "Please provide a email"],
      unique: true,
    },
    image: {
      type: String,
      default: "no-photo.jpg",
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: [Role.USER, Role.ADMIN],
      default: Role.USER,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
    tel: {
      type: String,
    },
    lastname: {
      type: String,
    },
    street: {
      type: String,
    },
    postalCode: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Usermodel = mongoose.model<IUser>("users", UserSchema);
