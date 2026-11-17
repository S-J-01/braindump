import type { SourceReference } from "@braindump/shared";

export type AskRagResponse = {
  message: string;
  answer: string;
  sourcesSuppliedToLLM: SourceReference[];
  citations: SourceReference[];
};
