import mongoose from "mongoose";
import { env } from "../config/env";
import { logger } from "../lib/logger";

export const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGODB_URI);
    logger.info("Database connection successful");
  } catch (error) {
    logger.error(`Database connection failed with error: ${error}`);
    throw error;
  }
};
