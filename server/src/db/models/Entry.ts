import mongoose from "mongoose";

const EntrySchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["link"],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    data: {
      url: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  },
);

export const Entry = mongoose.model("Entry", EntrySchema);
