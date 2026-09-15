import { useQuery } from "@tanstack/react-query";
import { listAllEntries } from "./api";
export const entryQueryKey = {
  list: (userId: string | undefined) => ["entries", userId] as const,
};
export const useEntries = (userId: string | undefined) => {
  return useQuery({
    queryKey: entryQueryKey.list(userId),
    queryFn: listAllEntries,
    enabled: Boolean(userId),
  });
};
