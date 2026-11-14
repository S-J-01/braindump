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
