import express from "express";
import { auth } from "../middleware/auth";
import { QuestionInputSchema } from "@braindump/shared";
import { logger } from "../lib/logger";
import {
  GeneratedAnswerWithSourcesSupplied,
  RetrievedRagChunk,
} from "../rag/types";
import { retrieveRagChunks } from "../rag/retrieveRagChunks";
import { AppError } from "../lib/errors";
import { answerRagQuestion } from "../rag/answerRagQuestion";
export const ragRouter = express.Router();
ragRouter.use(auth);
ragRouter.post("/retrieve", async (req, res, next) => {
  const isQuestionInputValid = QuestionInputSchema.safeParse(req.body);
  if (!isQuestionInputValid.success) {
    logger.error(`Invalid question input: ${isQuestionInputValid.error}`);
    return res
      .status(400)
      .json({ message: "Retrieval failed due to invalid question format" });
  }
  const { question } = isQuestionInputValid.data;
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const userId = req.user.userId;
  try {
    const retrievedRagChunkArray: RetrievedRagChunk[] = await retrieveRagChunks(
      question,
      userId,
    );
    return res.status(200).json({
      message: "Chunks retrieved successfully",
      chunks: retrievedRagChunkArray,
    });
  } catch (error) {
    logger.error(`Chunks retrieval failed `);
    return next(new AppError("Chunks retrieval failed", 500));
  }
});

ragRouter.post("/ask", async (req, res, next) => {
  const isQuestionInputValid = QuestionInputSchema.safeParse(req.body);
  if (!isQuestionInputValid.success) {
    logger.error(`Invalid question input: ${isQuestionInputValid.error}`);
    return res.status(400).json({
      message: "Asking question failed due to invalid question format",
    });
  }
  const { question } = isQuestionInputValid.data;
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const userId = req.user.userId;
  try {
    const generatedAnswerWithSourcesSupplied: GeneratedAnswerWithSourcesSupplied =
      await answerRagQuestion(question, userId);
    return res.status(200).json({
      message: "Answer generated from RAG successfully",
      answer: generatedAnswerWithSourcesSupplied.answer,
      sourcesSuppliedToLLM:
        generatedAnswerWithSourcesSupplied.sourcesSuppliedToLLM,
    });
  } catch (error) {
    logger.error("Answer generation from RAG failed ");
    return next(new AppError("Answer generation from LLM failed", 500));
  }
});
