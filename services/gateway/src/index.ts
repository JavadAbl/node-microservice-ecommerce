// index.ts
import fastify from "fastify";
import { appConfig } from "./utils/app-config.js";
import { fastifyReplyFrom } from "@fastify/reply-from";
import { gatewayRoutes, swaggerProxyRoutes } from "./routes.js";
import { SERVICES } from "./services.js";
import { authPlugin } from "./plugins/auth-plugin.js";
import swagger from "@fastify/swagger"; // REQUIRED DEPENDENCY
import swaggerUi from "@fastify/swagger-ui";

export const app = fastify({
  logger: true,
  routerOptions: { caseSensitive: false, ignoreTrailingSlash: false },
});

async function start() {
  try {
    await startHttpServer();
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
}

async function startHttpServer() {
  const host = appConfig.HTTP_HOST;
  const port = appConfig.HTTP_PORT;

  await setupFastifyPlugins();

  await app.listen({ port, host });
  app.log.info(`HTTP server running on ${host}:${port}`);
}

async function setupFastifyPlugins() {
  // 1. Auth plugin
  await app.register(authPlugin);

  // 2. Reply-from for proxying
  await app.register(fastifyReplyFrom, {
    disableCache: true,
    http: { agentOptions: { keepAlive: true, maxFreeSockets: 1000, timeout: 60000 } },
  });

  // 3. Swagger core (minimal config - only needed for swagger-ui dependency)
  await app.register(swagger, {
    openapi: {
      info: {
        title: "API Gateway",
        description: "Select a service from the dropdown above to view its API documentation",
        version: "1.0.0",
      },
    },
  });

  // 4. Public Swagger proxy routes (MUST be before gatewayRoutes)
  await app.register(swaggerProxyRoutes);

  // 5. Protected gateway routes
  await app.register(gatewayRoutes);

  // 6. Swagger UI with external service specs in dropdown
  await app.register(swaggerUi, {
    routePrefix: "/",
    uiConfig: {
      // THIS POPULATES THE TOP-RIGHT DROPDOWN ("Definition List")
      urls: Object.entries(SERVICES).map(([name]) => ({
        name: `${name.charAt(0).toUpperCase() + name.slice(1)} Service`,
        url: `/api-docs/${name}/swagger.json`,
      })),
      defaultModelsExpandDepth: -1, // Hide empty schemas
      defaultModelRendering: "model",
      displayRequestDuration: true,
    },
    staticCSP: true,
  });
}

start();
