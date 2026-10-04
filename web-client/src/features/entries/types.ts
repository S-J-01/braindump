import type { SerializedEntry } from "@braindump/shared";

export type ListAllEntriesResponse = {
  message: string;
  entries: SerializedEntry[];
};

export type GetEntryByIdResponse = {
  message: string;
  entry: SerializedEntry;
};

export type CreateEntryResponse = {
  message: string;
  entry: SerializedEntry;
};

export type UpdateEntryResponse = {
  message: string;
  entry: SerializedEntry;
};

export type DeleteEntryResponse = {
  message: string;
  entry: SerializedEntry;
};
