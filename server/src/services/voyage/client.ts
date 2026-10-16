import { VoyageAIClient } from "voyageai";
import { env } from "../../config/env";
let voyageClient: VoyageAIClient | undefined;
export const getVoyageClient = (): VoyageAIClient => {
  if (!env.VOYAGE_API_KEY) {
    throw new Error("Voyage API key is required for generating embeddings");
  }
  if (!voyageClient) {
    voyageClient = new VoyageAIClient({
      apiKey: env.VOYAGE_API_KEY,
      environment: env.VOYAGE_API_BASE_URL,
    });
  }
  return voyageClient;
};
