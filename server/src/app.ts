import express from "express";
import cors from "cors";
import { apiRouter } from "./routes/index";
import { notFound } from "./middleware/notFound";
import { errorHandler } from "./middleware/errorHandler";
import { httpLogger } from "./lib/logger";
export const app = express();

app.use(cors());
app.use(httpLogger);
app.use(express.json());
app.use("/api/v1", apiRouter);
app.use(notFound);
app.use(errorHandler);
