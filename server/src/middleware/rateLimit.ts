import { rateLimit } from "express-rate-limit";

export const authRateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 5,
  message: "Too many auth requests. Please try after some time",
  standardHeaders: true,
  legacyHeaders: false,
});
