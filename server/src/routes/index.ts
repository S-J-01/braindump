import express from "express";
import { healthRouter } from "./health";
import { authRouter } from "./auth";

export const apiRouter = express.Router();

apiRouter.use("/health", healthRouter);
apiRouter.use("/auth", authRouter);
