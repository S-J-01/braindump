import express from "express";
import cors from "cors";
import { apiRouter } from "./routes/index";
import { notFound } from "./middleware/notFound";
import { errorHandler } from "./middleware/errorHandler";
export const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1", apiRouter);
app.use(notFound);
app.use(errorHandler);
