import express from "express";
import { SignUpInputSchema } from "@braindump/shared/src";
import { logger } from "../lib/logger";
import { SignUpInput } from "@braindump/shared/src";
import { User } from "../db/models/User";
import { hashPassword } from "../lib/auth/hash";
import { signAuthToken } from "../lib/auth/token";
import { env } from "../config/env";
import { SignOptions } from "jsonwebtoken";
import { setAuthCookie } from "../lib/auth/cookies";
import { AppError } from "../lib/errors";
export const authRouter = express.Router();

authRouter.post("/signup", async (req, res, next) => {
  const isSignupInputValid = SignUpInputSchema.safeParse(req.body);
  if (!isSignupInputValid.success) {
    logger.error(`Signup failed with error: ${isSignupInputValid.error}`);
    return res.status(400).json({ message: "Sign Up request failed" });
  }
  const signUpInput: SignUpInput = isSignupInputValid.data;

  try {
    const userExists = await User.exists({ email: signUpInput.email });
    if (userExists) {
      return res.status(409).json({ message: "Email already in use" });
    }
    const hashedPassword = await hashPassword(signUpInput.password);
    const newUser = await User.create({
      email: signUpInput.email,
      passwordHash: hashedPassword,
    });

    const authToken = signAuthToken(
      { userId: newUser.id },
      env.JWT_SECRET,
      env.JWT_EXPIRES_IN as SignOptions["expiresIn"],
    );
    setAuthCookie(res, authToken);

    return res.status(201).json({
      user: {
        id: newUser.id,
        email: newUser.email,
      },
    });
  } catch (error) {
    logger.error(`signup failed with error ${error}`);
    return next(new AppError("sign up failed with error", 500));
  }
});
