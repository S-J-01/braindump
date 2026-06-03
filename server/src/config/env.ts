import * as z from "zod";
import dotenv from "dotenv";
dotenv.config();
const envSchema = z.object({
  PORT: z.coerce.number(),
  MONGODB_URI: z.url(),
});

export const env = envSchema.parse(process.env);
