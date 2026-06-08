import jwt from "jsonwebtoken";
import { SignOptions } from "jsonwebtoken";

type AuthTokenPayload = {
  userId: string;
};

export const signAuthToken = (
  payload: AuthTokenPayload,
  secret: string,
  expiresIn: SignOptions["expiresIn"],
): string => {
  return jwt.sign(payload, secret, {
    expiresIn: expiresIn,
  });
};

export const verifyAuthToken = (
  token: string,
  secret: string,
): AuthTokenPayload | undefined => {
  try {
    const decoded = jwt.verify(token, secret);
    if (typeof decoded === "string") {
      return undefined;
    } else if (
      typeof decoded === "object" &&
      Object.hasOwn(decoded, "userId") &&
      typeof decoded.userId === "string"
    ) {
      return decoded as AuthTokenPayload;
    } else {
      return undefined;
    }
  } catch (error) {
    return undefined;
  }
};
