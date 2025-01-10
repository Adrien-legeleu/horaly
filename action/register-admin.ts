"use server";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export const registerAdmin = async (values: {
  email: string;
  rightCode?: string;
}) => {
  const { email, rightCode } = values;

  try {
    await connectDB();

    const userFound = await User.findOne({ email });
    if (!userFound) {
      return {
        error: "User not found",
      };
    }

    if (rightCode !== "validCode") {
      return {
        error: "Invalid rights code",
      };
    }

    const updateUser = await User.findOneAndUpdate(
      { email },
      { role: "admin" },
      { new: true }
    );

    return {
      message: "Role updated successfully",
      user: updateUser,
    };
  } catch (error) {
    console.error(error);
    return {
      error: "An error occurred while updating the role",
    };
  }
};
