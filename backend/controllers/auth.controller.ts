import { type Request, type Response } from "express";
import { NextApiRequest, NextApiResponse } from "next";
import { Role, Usermodel } from "../models/user.model";

export class AuthController {
  async checkAdminPassword(
    req: Request | NextApiRequest,
    res: Response | NextApiResponse
  ): Promise<void> {
    try {
      const { password } = req.body;
      const adminPassword = process.env.ADMIN_PASSWORD;
      if (password !== adminPassword) {
        res.status(401).send({ error: "incoress Password" });
        return;
      }
      res
        .status(200)
        .json({ message: "Password correct: You can now log in as admin" });
    } catch (error: any) {
      res.status(500).send({ error: error?.message });
    }
  }

  async createAdmin(
    req: Request | NextApiRequest,
    res: Response | NextApiResponse
  ): Promise<void> {
    try {
      const { email } = req.body;
      const user = await Usermodel.findOne({
        email,
      });
      if (!user) {
        res.status(404).send({ error: "User not found" });
        return;
      }
      user.role = Role.ADMIN;
      await user.save();
      res
        .status(200)
        .send({ message: "User role update successfully in admin" });
    } catch (error: any) {
      res.status(500).json({ error: error?.message });
    }
  }
}
