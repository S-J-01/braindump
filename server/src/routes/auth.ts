import express from "express";
import {
  LogInInput,
  LogInInputSchema,
  SignUpInputSchema,
} from "@braindump/shared/src";
import { logger } from "../lib/logger";
import { SignUpInput } from "@braindump/shared/src";
import { User } from "../db/models/User";
import { comparePassword, hashPassword } from "../lib/auth/hash";
import { signAuthToken } from "../lib/auth/token";
import { env } from "../config/env";
import { SignOptions } from "jsonwebtoken";
import { setAuthCookie } from "../lib/auth/cookies";
import { AppError } from "../lib/errors";
export const authRouter = express.Router();

authRouter.post("/signup", async (req, res, next) => {
  const isSignUpInputValid = SignUpInputSchema.safeParse(req.body);
  if (!isSignUpInputValid.success) {
    logger.error(`Sign Up failed with error: ${isSignUpInputValid.error}`);
    return res.status(400).json({ message: "Sign Up request failed" });
  }
  const signUpInput: SignUpInput = isSignUpInputValid.data;

  try {
    const existingUser = await User.exists({ email: signUpInput.email });
    if (existingUser) {
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
    logger.error(`Sign Up failed with error ${error}`);
    return next(new AppError("Sign Up failed", 500));
  }
});

authRouter.post("/login", async (req, res, next) => {
  const isLogInInputValid = LogInInputSchema.safeParse(req.body);
  if (!isLogInInputValid.success) {
    logger.error(`Log In failed with error: ${isLogInInputValid.error}`);
    return res.status(400).json({ message: "Log In request failed" });
  }
  const logInInput: LogInInput = isLogInInputValid.data;
  try {
    const user = await User.findOne({ email: logInInput.email });
    if (!user) {
      return res.status(401).json({ message: "Wrong Email or Password" });
    }
    const isPasswordCorrect = await comparePassword(
      logInInput.password,
      user.passwordHash,
    );
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Wrong Email or Password" });
    }
    const authToken = signAuthToken(
      { userId: user.id },
      env.JWT_SECRET,
      env.JWT_EXPIRES_IN as SignOptions["expiresIn"],
    );
    setAuthCookie(res, authToken);
    return res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    logger.error(`Log In failed with error: ${error}`);
    return next(new AppError("Log In failed", 500));
  }
});
