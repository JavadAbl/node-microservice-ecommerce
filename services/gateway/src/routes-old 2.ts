import { SERVICES } from "./services.js";
import { FastifyPluginAsync } from "fastify";

export const gatewayRoutes: FastifyPluginAsync = async (app) => {
  Object.keys(SERVICES).forEach((serviceName) => {
    const rawTarget = SERVICES[serviceName];

    app.all(`/${serviceName}/:tail(.*)`, (request, reply) => {
      const tail = (request.params as { tail?: string }).tail ?? "";
      // Normalize: ensure leading slash if tail exists
      const dest = tail ? `/${tail}` : "/";
      return reply.from(rawTarget + dest);
    });

    app.all(`/${serviceName}`, (request, reply) => {
      reply.redirect(`/${serviceName}/`);
    });
  });

  // Not found handler for unmatched routes
  app.setNotFoundHandler((request, reply) => {
    reply
      .status(404)
      .send({
        error: "Not Found",
        message: `Route ${request.method} ${request.url} does not exist`,
        statusCode: 404,
      });
  });
};

/**
 * Public routes to proxy service Swagger JSONs (NO AUTHENTICATION)
 * Must be registered BEFORE gatewayRoutes to avoid wildcard capture
 */
export const swaggerProxyRoutes: FastifyPluginAsync = async (app) => {
  for (const [serviceName, baseUrl] of Object.entries(SERVICES)) {
    app.get(`/api-docs/${serviceName}/swagger.json`, async (request, reply) => {
      try {
        // Proxy to service's Swagger endpoint (adjust path if needed per service)
        return reply.from(`${baseUrl}/swagger/v1/swagger.json`, {
          rewriteRequestHeaders: (req, headers) => ({
            ...headers,
            // Optional: Add service-specific auth headers here if services require internal auth
          }),
          onError: (reply, error) => {
            console.error(`Failed to fetch ${serviceName} Swagger:`, error);
            reply.code(502).send({ error: `Service '${serviceName}' documentation unavailable` });
          },
        });
      } catch (err) {
        console.error(`Proxy error for ${serviceName}:`, err);
        reply.code(500).send({ error: "Documentation fetch failed" });
      }
    });
  }
};
