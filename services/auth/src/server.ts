import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { config, isDev } from "./infrastructure/config.js";
import { errorHandler } from "./plugins/error-handler.js";
import fastify from "fastify";
import { otpRoutes } from "./routes/otp-route.js";

export const app = fastify({ logger: false, caseSensitive: false });

export async function startHttpServer() {
  // Register Swagger for API documentation
  if (isDev) {
    await app.register(fastifySwagger, {
      openapi: {
        info: {
          title: "Vehicle Microservice API",
          description: "API documentation for the Vehicle Microservice",
          version: "1.0.0",
        },
        // servers: [{ url: `http://localhost:${config.HTTP_PORT}`, description: "Internal Microservice (h2c)" }],
      },
      exposeHeadRoutes: false,
    });

    await app.register(fastifySwaggerUi, {
      routePrefix: "/",
      uiConfig: { deepLinking: false, docExpansion: "list", persistAuthorization: true },
    });
  }

  app.register(otpRoutes, { prefix: "/Otp" });

  app.setErrorHandler(errorHandler);

  app.get("/health", async () => {
    return { status: "OK", timestamp: new Date().toISOString() };
  });

  const port = config.HTTP_PORT;
  const address = config.HTTP_HOST;

  await app.listen({ port, host: address });

  console.log(`HTTP/2 (h2c) Server running on http://${address}:${port}`);
}
