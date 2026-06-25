import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: {
      unique: true,
      type: String,
      trim: true,
      lowercase: true,
      required: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const User = mongoose.model("User", UserSchema);
