import { useMutation } from "@tanstack/react-query";
import { createEntry, deleteEntry, updateEntry } from "./api";

export const useCreateEntry = () => {
  return useMutation({
    mutationFn: createEntry,
  });
};

export const useUpdateEntry = () => {
  return useMutation({
    mutationFn: updateEntry,
  });
};

export const useDeleteEntry = () => {
  return useMutation({
    mutationFn: deleteEntry,
  });
};
