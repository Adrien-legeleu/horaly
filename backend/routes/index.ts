import express from "express";
import authRouter from "./auth.route";

const appRouter = express.Router();

appRouter.use("/admin", authRouter);

export default appRouter;
