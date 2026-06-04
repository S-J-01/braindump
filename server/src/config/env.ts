import * as z from "zod";
import dotenv from "dotenv";
dotenv.config();
const envSchema = z.object({
  PORT: z.coerce.number(),
  MONGODB_URI: z.url(),
  JWT_SECRET: z.string().trim().min(1),
  JWT_EXPIRES_IN: z.string().trim().min(1),
});

export const env = envSchema.parse(process.env);
