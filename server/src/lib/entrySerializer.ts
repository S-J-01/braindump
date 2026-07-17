import { EntryDocument } from "../db/models/Entry";

type EntryResponse = {
  id: string;
  userId: string;
  type: "link" | "note";
  title: string;
  tags: string[];
  data: {
    url?: string;
    description?: string;
    content?: string;
  };
  createdAt: string;
  updatedAt: string;
};

export const serializeEntry = (
  responseDocument: EntryDocument,
): EntryResponse => {
  const serializedEntry: EntryResponse = {
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
