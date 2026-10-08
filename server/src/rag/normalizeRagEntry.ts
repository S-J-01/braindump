import { EntryDocument } from "../db/models/Entry";
import { NormalizedRagEntry } from "./types";

export const normalizeRagEntry = (
  entryDocument: EntryDocument,
): NormalizedRagEntry => {
  const bodyText =
    entryDocument.type === "note"
      ? entryDocument.data?.content
      : entryDocument.data?.description;

  const searchableText = [entryDocument.title.trim(), bodyText?.trim() ?? ""]
    .filter((part) => part.length > 0)
    .join("\n\n");

  const normalizedRagEntry: NormalizedRagEntry =
    entryDocument.type === "note"
      ? {
          sourceId: entryDocument._id.toString(),
          userId: entryDocument.userId,
          sourceType: entryDocument.type,
          title: entryDocument.title,
          tags: entryDocument.tags,
          text: searchableText,
        }
      : {
          sourceId: entryDocument._id.toString(),
          userId: entryDocument.userId,
          sourceType: entryDocument.type,
          title: entryDocument.title,
          sourceUrl: entryDocument.data?.url ?? undefined,
          tags: entryDocument.tags,
          text: searchableText,
        };
  return normalizedRagEntry;
};
