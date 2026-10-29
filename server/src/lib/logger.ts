import pino from "pino";
import pinoHttp from "pino-http";

export const logger = pino({
  redact: {
    paths: [
      "req.headers.cookie",
      "req.headers.authorization",
      "res.headers.set-cookie",
    ],
    censor: "[REDACTED]",
  },
});
export const httpLogger = pinoHttp({ logger });
