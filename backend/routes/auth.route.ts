import express from "express";
import { authControler } from "../controllers";

const authRouter = express.Router();

authRouter
  .post("/check-admin-password", authControler.checkAdminPassword)
  .post("/create-admin", authControler.createAdmin);

export default authRouter;
