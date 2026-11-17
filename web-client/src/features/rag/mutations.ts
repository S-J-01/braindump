import { useMutation } from "@tanstack/react-query";
import { askRag } from "./api";

export const useAskRag = () => {
  return useMutation({
    mutationFn: askRag,
  });
};
