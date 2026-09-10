import { EntryDocument } from "../db/models/Entry";

import { SerializedEntry } from "@braindump/shared";

export const serializeEntry = (
  responseDocument: EntryDocument,
): SerializedEntry => {
  const serializedEntry: SerializedEntry = {
    id: responseDocument._id.toString(),
    userId: responseDocument.userId,
    type: responseDocument.type,
    title: responseDocument.title,
    tags: responseDocument.tags,
    data: {
      url: responseDocument.data?.url ?? undefined,
      description: responseDocument.data?.description ?? undefined,
      content: responseDocument.data?.content ?? undefined,
    },
    createdAt: responseDocument.createdAt.toISOString(),
    updatedAt: responseDocument.updatedAt.toISOString(),
  };
  return serializedEntry;
};
