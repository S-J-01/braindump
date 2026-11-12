import { ResolvedCitations, SourceReference } from "./types";

export const resolveCitations = (
  answerFromLLM: string,
  sourcesSuppliedToLLM: SourceReference[],
): ResolvedCitations => {
  const pattern: RegExp = /\[S\d+\]/g;
  const rawMatches = [...answerFromLLM.matchAll(pattern)];
  const sourceMap = new Map<string, SourceReference>();
  const seenLabels = new Set<string>();
  const citations: SourceReference[] = [];
  let unknownLabel = 0;
  for (const source of sourcesSuppliedToLLM) {
    sourceMap.set(source.label, source);
  }
  for (const match of rawMatches) {
    if (sourceMap.has(match[0])) {
      if (!seenLabels.has(match[0])) {
        seenLabels.add(match[0]);
        const validCitation = sourceMap.get(match[0]);
        if (validCitation !== undefined) {
          citations.push(validCitation);
        }
      }
    } else {
      unknownLabel = unknownLabel + 1;
    }
  }
  const cleanedAnswer = answerFromLLM
    .replace(pattern, (match) => {
      return sourceMap.has(match) ? match : "";
    })
    .replace(/[ \t]+(?=[.,!?;:])/g, "")
    .trim();
  return {
    answer: cleanedAnswer,
    citations,
    unknownLabelCount: unknownLabel,
  };
};
