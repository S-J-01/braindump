import express from "express";
import { healthRouter } from "./health";
import { authRouter } from "./auth";
import { entriesRouter } from "./entries";

export const apiRouter = express.Router();

apiRouter.use("/health", healthRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/entries", entriesRouter);
