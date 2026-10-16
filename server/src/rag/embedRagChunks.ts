import { env } from "../config/env";
import { generateEmbeddings } from "../services/voyage/embeddings";
import { EmbeddedRagChunk, RagChunk } from "./types";

export const embedRagChunks = async (
  chunks: RagChunk[],
): Promise<EmbeddedRagChunk[]> => {
  if (chunks.length === 0) {
    return [];
  }
  const chunkTexts: string[] = chunks.map((chunk) => chunk.chunkText);
  const embeddings: number[][] = await generateEmbeddings(chunkTexts);

  if (embeddings.length !== chunks.length) {
    throw new Error(
      "Number of embeddings returned do not match number of chunks",
    );
  }

  const embeddedRagChunks: EmbeddedRagChunk[] = chunks.map((chunk, index) => {
    const embedding = embeddings[index];
    if (embedding === undefined) {
      throw new Error(`Missing embedding for chunk at index ${index}`);
    }
    return {
      ...chunk,
      embedding: embedding,
      embeddingModel: env.RAG_EMBEDDING_MODEL,
    };
  });
  return embeddedRagChunks;
};
