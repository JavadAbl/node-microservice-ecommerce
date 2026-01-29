import Fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { claimRoutes } from "./routes/vehicle-route.js";
import { config } from "./infrastructure/config.js";
import { errorHandler } from "./plugins/error-handler.js";
import { prisma } from "./infrastructure/database/prisma-provider.js";

export const app = Fastify({ logger: false, caseSensitive: false, http2: true });

async function run() {
  await startDatabase();
  await startHttpServer;
  try {
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
}

async function startHttpServer() {
  // Register Swagger for API documentation
  await app.register(fastifySwagger, {
    openapi: {
      info: {
        title: "Authentication Microservice API",
        description:
          "API documentation for the Authentication Microservice with JWT, RBAC and claims hierarchy management",
        version: "1.0.0",
      },
      // Revert to http:// since we are using h2c (no SSL)
      servers: [{ url: `http://localhost:${config.HTTP_PORT}`, description: "Internal Microservice (h2c)" }],
    },
    exposeHeadRoutes: true,
  });

  await app.register(fastifySwaggerUi, {
    routePrefix: "/docs",
    uiConfig: { deepLinking: false, docExpansion: "full", persistAuthorization: true },
  });

  app.register(claimRoutes, { prefix: "/claims" });

  app.setErrorHandler(errorHandler);

  app.get("/health", async () => {
    return { status: "OK", timestamp: new Date().toISOString() };
  });

  const port = config.HTTP_PORT;
  const address = config.HTTP_HOST;

  await app.listen({ port, host: address });

  // Note: When using http2: true with Fastify without passing https options,
  // it defaults to running on the HTTP/2 module but may handle the initial
  // connection as HTTP/1.1 and require an Upgrade header depending on the Node version/Fastify wrapper.

  // For strict "h2c" (prior knowledge) where the client speaks HTTP/2 immediately,
  // standard Node.js http2.createServer is needed. However, Fastify's built-in http2: true
  // handles standard h2c upgrades automatically.

  console.log(`HTTP/2 (h2c) Server running on http://${address}:${port}`);
}

async function startDatabase() {
  await prisma.$connect();
  await prisma.$queryRaw`SELECT 1`;
  console.log("Connected to database");
}

process.on("SIGINT", async () => {
  console.log("Received SIGINT. Starting graceful shutdown...");
  await gracefulShutdown();
});
process.on("SIGTERM", async () => {
  console.log("Received SIGINT. Starting graceful shutdown...");
  await gracefulShutdown();
});

async function gracefulShutdown() {
  process.exit(0);
}

run();
