import { rateLimit } from "express-rate-limit";

export const authRateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 5,
  message: { message: "Too many auth requests. Please try after some time" },
  statusCode: 429,
  standardHeaders: true,
  legacyHeaders: false,
});
