import type { EntryInput } from "@braindump/shared";
import { apiClient } from "../../lib/api";
import type {
  CreateEntryResponse,
  DeleteEntryResponse,
  GetEntryByIdResponse,
  ListAllEntriesResponse,
  UpdateEntryResponse,
} from "./types";

export const listAllEntries = async (): Promise<ListAllEntriesResponse> => {
  const response = await apiClient.get("/entries");
  return response.data;
};

export const getEntryById = async (
  entryId: string,
): Promise<GetEntryByIdResponse> => {
  const response = await apiClient.get(`/entries/${entryId}`);
  return response.data;
};

export const createEntry = async (
  input: EntryInput,
): Promise<CreateEntryResponse> => {
  const response = await apiClient.post("/entries", input);
  return response.data;
};

export const updateEntry = async ({
  entryId,
  input,
}: {
  entryId: string;
  input: EntryInput;
}): Promise<UpdateEntryResponse> => {
  const response = await apiClient.patch(`/entries/${entryId}`, input);
  return response.data;
};

export const deleteEntry = async (
  entryId: string,
): Promise<DeleteEntryResponse> => {
  const response = await apiClient.delete(`/entries/${entryId}`);
  return response.data;
};
