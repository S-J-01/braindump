import { buildRagContext } from "./buildRagContext";
import { generateAnswer } from "./generateAnswer";
import { retrieveRagChunks } from "./retrieveRagChunks";
import {
  GeneratedAnswer,
  GeneratedAnswerWithSourcesSupplied,
  RagContext,
  RetrievedRagChunk,
} from "./types";

export const answerRagQuestion = async (
  question: string,
  userId: string,
): Promise<GeneratedAnswerWithSourcesSupplied> => {
  const retrievedRagChunkArray: RetrievedRagChunk[] = await retrieveRagChunks(
    question,
    userId,
  );
  const ragContext: RagContext = buildRagContext(retrievedRagChunkArray);
  const generatedAnswer: GeneratedAnswer = await generateAnswer(
    question,
    ragContext.contextString,
  );

  return {
    answer: generatedAnswer.answer,
    sourcesSuppliedToLLM: ragContext.sources,
  };
};
