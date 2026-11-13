import { logger } from "../lib/logger";
import { buildRagContext } from "./buildRagContext";
import { generateAnswer } from "./generateAnswer";
import { resolveCitations } from "./resolveCitations";
import { retrieveRagChunks } from "./retrieveRagChunks";
import {
  GeneratedAnswer,
  RagAnswerResponse,
  RagContext,
  ResolvedCitations,
  RetrievedRagChunk,
} from "./types";

export const answerRagQuestion = async (
  question: string,
  userId: string,
): Promise<RagAnswerResponse> => {
  const retrievedRagChunkArray: RetrievedRagChunk[] = await retrieveRagChunks(
    question,
    userId,
  );
  const ragContext: RagContext = buildRagContext(retrievedRagChunkArray);
  const generatedAnswer: GeneratedAnswer = await generateAnswer(
    question,
    ragContext.contextString,
  );
  const resolvedCitations: ResolvedCitations = resolveCitations(
    generatedAnswer.answer,
    ragContext.sources,
  );

  if (resolvedCitations.unknownLabelCount > 0) {
    logger.info(
      `The number of unknown labels found in the answer is: ${resolvedCitations.unknownLabelCount}`,
    );
  }
  if (
    ragContext.sources.length > 0 &&
    resolvedCitations.citations.length === 0
  ) {
    return {
      answer: "There is insufficient evidence to produce an answer",
      sourcesSuppliedToLLM: ragContext.sources,
      citations: [],
    };
  }

  return {
    answer: resolvedCitations.answer,
    sourcesSuppliedToLLM: ragContext.sources,
    citations: resolvedCitations.citations,
  };
};
