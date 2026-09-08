import express from "express";
import cors from "cors";
import { apiRouter } from "./routes/index";
import { notFound } from "./middleware/notFound";
import { errorHandler } from "./middleware/errorHandler";
import { httpLogger } from "./lib/logger";
import cookieParser from "cookie-parser";
import { env } from "./config/env";
export const app = express();

app.use(
  cors({
    origin: env.FRONTEND_ORIGIN,
    credentials: true,
  }),
);
app.use(httpLogger);
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1", apiRouter);
app.use(notFound);
app.use(errorHandler);
