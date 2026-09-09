import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./query-client";
import type { ReactNode } from "react";

type AppProvidersProps = {
  children: ReactNode;
};
export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
