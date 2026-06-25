import { Response, CookieOptions } from "express";
import { env } from "../../config/env";

export const authCookieName = "jwtTokenCookie";

const authCookieOptions: CookieOptions = {
  maxAge: 60 * 60 * 1000,
  httpOnly: true,
  secure: env.NODE_ENV === "production",
  sameSite: "strict",
};
export const setAuthCookie = (res: Response, token: string) => {
  res.cookie(authCookieName, token, authCookieOptions);
};

export const clearAuthCookie = (res: Response) => {
  res.clearCookie(authCookieName, authCookieOptions);
};
