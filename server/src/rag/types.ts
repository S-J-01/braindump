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

