import { buildRagContext } from "./buildRagContext";
import { generateAnswer } from "./generateAnswer";
import { retrieveRagChunks } from "./retrieveRagChunks";
import { GeneratedAnswer, RagContext, RetrievedRagChunk } from "./types";

export const orchestrate = async (question: string, userId: string) => {
  const retrievedRagChunkArray: RetrievedRagChunk[] = await retrieveRagChunks(
    question,
    userId,
  );
  const ragContext: RagContext = buildRagContext(retrievedRagChunkArray);
  const generatedAnswer: GeneratedAnswer = await generateAnswer(
    question,
    ragContext.contextString,
  );
};
