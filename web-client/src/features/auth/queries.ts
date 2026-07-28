import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "./api";
export const authQueryKeys = {
  currentUser: ["auth", "me"] as const,
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: authQueryKeys.currentUser,
    queryFn: getCurrentUser,
  });
};
