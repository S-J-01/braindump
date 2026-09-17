import { useMutation } from "@tanstack/react-query";
import { createEntry } from "./api";

export const useCreateEntry = () => {
  return useMutation({
    mutationFn: createEntry,
  });
};
