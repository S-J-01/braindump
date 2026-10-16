import * as z from "zod";
import dotenv from "dotenv";
dotenv.config();
const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
  PORT: z.coerce.number(),
  MONGODB_URI: z.url(),
  FRONTEND_ORIGIN: z.url(),
  JWT_SECRET: z.string().trim().min(1),
  JWT_EXPIRES_IN: z
    .string()
    .trim()
    .min(1)
    .regex(/^\d+(ms|[smhdwy])$/),
  VOYAGE_API_KEY: z.string().optional(),
  RAG_EMBEDDING_MODEL: z.string().default("voyage-4-lite"),
  VOYAGE_API_BASE_URL: z.url().default("https://ai.mongodb.com/v1"),
});

export const env = envSchema.parse(process.env);
