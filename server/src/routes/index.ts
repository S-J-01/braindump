import express from "express";
import { healthRouter } from "./health";

export const apiRouter = express.Router();

apiRouter.use("/health", healthRouter);
