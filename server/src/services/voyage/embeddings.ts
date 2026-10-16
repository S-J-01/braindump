import { env } from "../../config/env";
import { getVoyageClient } from "./client";
const outputDimension = 1024;
export const generateEmbeddings = async (
  chunkTexts: string[],
): Promise<number[][]> => {
  if (chunkTexts.length === 0) {
    throw new Error("Input text array cannot be empty");
  }
  if (chunkTexts.some((text) => text.trim().length === 0)) {
    throw new Error("Input texts must not contain blank strings");
  }
  const voyageClient = getVoyageClient();
  let voyageResponse;
  try {
    voyageResponse = await voyageClient.embed({
      input: chunkTexts,
      model: env.RAG_EMBEDDING_MODEL,
      inputType: "document",
      outputDimension: outputDimension,
    });
  } catch (error) {
    throw new Error("API request to voyage failed", {
      cause: error,
    });
  }

  const data = voyageResponse.data;
  if (!data) {
    throw new Error("Response data is undefined");
  }
  if (data.length !== chunkTexts.length) {
    throw new Error("Missing embeddings in response");
  }

  const orderedVectors: number[][] = new Array<number[]>(chunkTexts.length);
  const indexSet = new Set<number>();
  for (const item of data) {
    if (
      item.index === undefined ||
      !Number.isInteger(item.index) ||
      item.index < 0 ||
      item.index >= chunkTexts.length
    ) {
      throw new Error(`Invalid index at ${item.index}`);
    }
    if (indexSet.has(item.index)) {
      throw new Error(`Duplicate index received at ${item.index}`);
    }
    indexSet.add(item.index);
    if (!item.embedding || item.embedding.length !== outputDimension) {
      throw new Error(`Invalid embedding received at index ${item.index}`);
    }
    orderedVectors[item.index] = item.embedding;
  }

  return orderedVectors;
};
