"use server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const register = async (values: any) => {
  const { email, password, name, phone } = values;

  try {
    await connectDB();
    console.log("Connected to MongoDB.");
    console.log(email, password, name, phone);

    const userFound = await User.findOne({ email });
    if (userFound) {
      return {
        error: "Email already exists!",
      };
    }
    const hashedPassword = await bcrypt.hash(String(password), 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
    });
    console.log(user);

    const savedUser = await user.save();
    console.log(savedUser + "eziueziuei");
  } catch (e) {
    console.log(e);
  }
};
