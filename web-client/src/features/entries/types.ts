import type { SerializedEntry } from "@braindump/shared";

export type ListEntriesResponse = {
  message: string;
  entries: SerializedEntry[];
};

export type GetEntryResponse = {
  message: string;
  entry: SerializedEntry;
};

export type CreateEntryResponse = {
  message: string;
  entry: SerializedEntry;
};
