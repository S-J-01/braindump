export type NormalizedRagEntry = {
  sourceId: string;
  userId: string;
  sourceType: "link" | "note";
  title: string;
  sourceUrl?: string;
  tags: string[];
  text: string;
};
