import mongoose from "mongoose";

const EmbeddedRagChunkSchema = new mongoose.Schema(
  {
    sourceId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    sourceType: {
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
    sourceUrl: {
      type: String,
    },
    chunkText: {
      type: String,
      required: true,
    },
    chunkIndex: {
      type: Number,
      required: true,
    },
    embedding: {
      type: [Number],
      required: true,
    },
    embeddingModel: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

EmbeddedRagChunkSchema.index(
  { userId: 1, sourceId: 1, chunkIndex: 1 },
  { unique: true },
);

export const EmbeddedRagChunk = mongoose.model(
  "EmbeddedRagChunk",
  EmbeddedRagChunkSchema,
);
