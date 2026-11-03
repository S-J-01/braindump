import { RagContext, RetrievedRagChunk, SourceReference } from "./types";

export const buildRagContext = (
  retrievedRagChunks: RetrievedRagChunk[],
): RagContext => {
  const characterBudget = 6000;
  let contextString = "";
  const sources: SourceReference[] = [];
  for (const chunk of retrievedRagChunks) {
    const label = sources.length + 1;
    const blockToBeAppended =
      `[S${label}] ` + chunk.title + `\n` + chunk.chunkText + `\n` + `\n`;
    if (blockToBeAppended.length + contextString.length <= characterBudget) {
      contextString += blockToBeAppended;

      const sourceReference: SourceReference = {
        label: `[S${label}]`,
        chunkId: chunk.chunkId,
        score: chunk.score,
        title: chunk.title,
        sourceType: chunk.sourceType,
        sourceId: chunk.sourceId,
        ...(chunk.sourceUrl !== undefined
          ? { sourceUrl: chunk.sourceUrl }
          : {}),
        chunkIndex: chunk.chunkIndex,
        tags: chunk.tags,
      };
      sources.push(sourceReference);
    }
  }
  const ragContext = {
    contextString: contextString,
    sources: sources,
  };
  return ragContext;
};
