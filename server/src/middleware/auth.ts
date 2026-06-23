import { Request, Response, NextFunction } from "express";
import { verifyAuthToken } from "../lib/auth/token";
import { env } from "../config/env";
import { authCookieName } from "../lib/auth/cookies";
export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies[authCookieName];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const authTokenPayload = verifyAuthToken(token, env.JWT_SECRET);
  if (!authTokenPayload) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  req.user = authTokenPayload;

  next();
};
