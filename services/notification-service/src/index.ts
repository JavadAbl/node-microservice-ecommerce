import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import helmet from "@fastify/helmet";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { authRoutes } from "./routes/auth.route.js";
import { claimRoutes } from "./routes/claim.route.js";
import { roleRoutes } from "./routes/role.route.js";
import { config } from "./infrastructure/config.js";
import { errorHandler } from "./middleware/error-handler.js";

export const app = Fastify({ logger: false, caseSensitive: false });

async function start() {
  try {
    // Register Swagger for API documentation
    await app.register(fastifySwagger, {
      openapi: {
        info: {
          title: "Authentication Microservice API",
          description:
            "API documentation for the Authentication Microservice with JWT, RBAC and claims hierarchy management",
          version: "1.0.0",
        },
        servers: [{ url: `http://localhost:${config.PORT || 3000}`, description: "Development server" }],
      },
      exposeHeadRoutes: true,
    });

    await app.register(fastifySwaggerUi, {
      routePrefix: "/docs", // Swagger UI will be available at /docs
      uiConfig: { deepLinking: false, docExpansion: "full", persistAuthorization: true },
    });

    // Security headers
    await app.register(helmet);

    // Enable CORS
    await app.register(cors, { origin: config.CORS_ORIGIN || "*" });

    // JWT authentication
    await app.register(jwt, { secret: config.JWT_SECRET });

    // Register routes
    app.register(authRoutes, { prefix: "/auth" });
    app.register(claimRoutes, { prefix: "/claims" });
    app.register(roleRoutes, { prefix: "/roles" });

    // Decorate Fastify with an `authenticate` function
    app.decorate("authenticate", async function (request: FastifyRequest, reply: FastifyReply) {
      try {
        await request.jwtVerify();
      } catch (err) {
        throw err;
      }
    });

    // Global error handler
    app.setErrorHandler(errorHandler);

    // Health check endpoint
    app.get("/health", async () => {
      return { status: "OK", timestamp: new Date().toISOString() };
    });

    const port = config.PORT;

    await app.listen({ port, host: "0.0.0.0" });
    console.log(`Server running on ${port}`);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
}

start();
