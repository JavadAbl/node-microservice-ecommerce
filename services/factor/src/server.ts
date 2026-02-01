import { config, isDev } from "./infrastructure/config.js";
import express from "express";
import { factorRoutes } from "./routes/factor-route.js";
import { useErrorHandler } from "./middlewares/use-error-handler.js";

export const app = express();

export async function startHttpServer() {
  app.get("/health", async () => {
    return { status: "OK", timestamp: new Date().toISOString() };
  });

  //Register Routes
  app.use("/factors", factorRoutes);

  //Error Handler
  app.use(useErrorHandler);

  const port = config.HTTP_PORT;
  const address = config.HTTP_HOST;
  app.listen({ port, host: address }, () => {
    console.log(`HTTP Server running on http://${address}:${port}`);
  });
}
