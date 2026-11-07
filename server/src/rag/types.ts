export type NormalizedRagEntry = {
  sourceId: string;
  userId: string;
  sourceType: "link" | "note";
  title: string;
  sourceUrl?: string;
  tags: string[];
  text: string;
};
export type RagChunk = {
  sourceId: string;
  userId: string;
  sourceType: "link" | "note";
  title: string;
  sourceUrl?: string | undefined;
  tags: string[];
  chunkText: string;
  chunkIndex: number;
};

export type EmbeddedRagChunk = RagChunk & {
  embedding: number[];
  embeddingModel: string;
};

export type RetrievedRagChunk = Omit<
  EmbeddedRagChunk,
  "userId" | "embedding"
> & {
  chunkId: string;
  score: number;
};

export type SourceReference = {
  label: string;
  chunkId: string;
  score: number;
  sourceUrl?: string | undefined;
  title: string;
  sourceType: "link" | "note";
  sourceId: string;
  chunkIndex: number;
  tags: string[];
};

export type RagContext = {
  contextString: string;
  sources: SourceReference[];
};

export type GeneratedAnswer = {
  answer: string;
};

export type GeneratedAnswerWithSourcesSupplied = GeneratedAnswer & {
  sourcesSuppliedToLLM: SourceReference[];
};
