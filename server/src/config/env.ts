import * as z from "zod";
import dotenv from "dotenv";
dotenv.config();
const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
  PORT: z.coerce.number(),
  MONGODB_URI: z.url(),
  JWT_SECRET: z.string().trim().min(1),
  JWT_EXPIRES_IN: z
    .string()
    .trim()
    .min(1)
    .regex(/^\d+(ms|[smhdwy])$/),
});

export const env = envSchema.parse(process.env);
