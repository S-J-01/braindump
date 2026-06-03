import { app } from "./app";
import { env } from "./config/env";
import { connectDB } from "./db/connect";
import { logger } from "./lib/logger";

const startServer = async () => {
  try {
    await connectDB();
    app.listen(env.PORT, () => {
      logger.info(`Server started on port ${env.PORT}`);
    });
  } catch (error) {
    process.exit(1);
  }
};

startServer();
