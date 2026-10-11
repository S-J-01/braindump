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
      environment: "https://ai.mongodb.com/v1/embeddings",
    });
  }
  return voyageClient;
};
