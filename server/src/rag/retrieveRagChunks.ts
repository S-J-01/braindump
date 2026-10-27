import { RetrievedRagChunk } from "./types";

import { generateEmbeddings } from "../services/voyage/embeddings";
import { EmbeddedRagChunk } from "../db/models/EmbeddedRagChunk";
import { env } from "../config/env";

export const retrieveRagChunks = async (
  question: string,
  userId: string,
): Promise<RetrievedRagChunk[]> => {
  if (question.trim() === "" || userId.trim() === "") {
    throw new Error("Question or User Id cannot be empty");
  }
  const questionEmbeddingArray = await generateEmbeddings([question], "query");
  if (!questionEmbeddingArray[0]) {
    throw new Error("Embedding of the query not received");
  }
  const retrievedRagChunkArray: RetrievedRagChunk[] =
    await EmbeddedRagChunk.aggregate([
      {
        $vectorSearch: {
          index: "rag_chunks_vector",
          path: "embedding",
          limit: 5,
          numCandidates: 100,
          queryVector: questionEmbeddingArray[0],
          filter: {
            userId: userId,
            embeddingModel: env.RAG_EMBEDDING_MODEL,
          },
        },
      },
      {
        $project: {
          _id: 0,
          chunkId: { $toString: "$_id" },
          sourceId: 1,
          sourceType: 1,
          title: 1,
          sourceUrl: 1,
          tags: 1,
          chunkText: 1,
          chunkIndex: 1,
          embeddingModel: 1,
          score: { $meta: "vectorSearchScore" },
        },
      },
    ]);
  if (retrievedRagChunkArray.length === 0) {
    return [];
  }
  return retrievedRagChunkArray;
};
