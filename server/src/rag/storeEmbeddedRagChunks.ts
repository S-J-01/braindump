import { EmbeddedRagChunk as EmbeddedRagChunkModel } from "../db/models/EmbeddedRagChunk";
import { logger } from "../lib/logger";
import { EmbeddedRagChunk } from "./types";

/*This is for first-time ingestion. 
Re-ingestion can hit duplicate keys, edits or deletions can leave stale chunks, 
and a failed insertMany may have inserted some documents already.
Replacement, cleanup, and failure recovery must be established before automatic CRUD integration.*/

export const storeEmbeddedRagChunks = async (chunks: EmbeddedRagChunk[]) => {
  if (chunks.length === 0) {
    logger.info("Embedded Rag Chunk array is empty");
    return;
  }
  const docsToInsert = chunks.map((chunk) => ({
    sourceId: chunk.sourceId,
    userId: chunk.userId,
    sourceType: chunk.sourceType,
    title: chunk.title,
    tags: chunk.tags,
    chunkText: chunk.chunkText,
    chunkIndex: chunk.chunkIndex,
    embedding: chunk.embedding,
    embeddingModel: chunk.embeddingModel,
    ...(chunk.sourceUrl !== undefined ? { sourceUrl: chunk.sourceUrl } : {}),
  }));
  try {
    await EmbeddedRagChunkModel.insertMany(docsToInsert);
  } catch (error) {
    logger.error(
      `Embedded Rag Chunk array insertion failed with error ${error}`,
    );
    throw error;
  }
};
