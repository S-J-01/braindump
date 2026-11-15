import type { QuestionInput } from "@braindump/shared";
import { apiClient } from "../../lib/api";
import type { AskRagResponse } from "./types";

export const askRag = async (
  question: QuestionInput,
): Promise<AskRagResponse> => {
  const response = await apiClient.post("/rag/ask", question, {
    timeout: 60000,
  });
  return response.data;
};
