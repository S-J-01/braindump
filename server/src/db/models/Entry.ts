import mongoose, { InferSchemaType } from "mongoose";

const EntrySchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["link", "note"],
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
      },
      description: {
        type: String,
      },
      content: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  },
);
export type EntrySchemaType = InferSchemaType<typeof EntrySchema>;
export type EntryDocument = mongoose.HydratedDocument<EntrySchemaType>;
export const Entry = mongoose.model("Entry", EntrySchema);
