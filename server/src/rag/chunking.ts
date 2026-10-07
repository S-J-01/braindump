import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { NormalizedRagEntry } from "./types";
const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1200,
  chunkOverlap: 150,
});

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

export const chunkRagEntry = async (
  normalizedRagEntry: NormalizedRagEntry,
): Promise<RagChunk[]> => {
  const chunkTextArray = await splitter.splitText(normalizedRagEntry.text);

  const ragChunkArray = chunkTextArray.map((chunkText, index) => ({
    sourceId: normalizedRagEntry.sourceId,
    userId: normalizedRagEntry.userId,
    sourceType: normalizedRagEntry.sourceType,
    title: normalizedRagEntry.title,
    ...(normalizedRagEntry.sourceUrl !== undefined && {
      sourceUrl: normalizedRagEntry.sourceUrl,
    }),
    tags: normalizedRagEntry.tags,
    chunkText: chunkText,
    chunkIndex: index,
  }));
  return ragChunkArray;
};
