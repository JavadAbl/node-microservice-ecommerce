import { SERVICES } from "./services.js";
import { FastifyPluginAsync } from "fastify";

export const gatewayRoutes: FastifyPluginAsync = async (app) => {
  Object.keys(SERVICES).forEach((serviceName) => {
    const rawTarget = SERVICES[serviceName];

    // :tail(.*) matches empty or anything after the slash
    app.all(`/${serviceName}/:tail(.*)`, { preHandler: [app.authenticate] }, (request, reply) => {
      // request.params.tail may be empty string
      const tail = (request.params as { tail?: string }).tail ?? "";
      const dest = tail ? `/${tail}` : "/";
      return reply.from(rawTarget + dest);
    });

    // also handle exact /service (no trailing slash)
    app.all(`/${serviceName}`, { preHandler: [app.authenticate] }, (request, reply) => {
      return reply.from(rawTarget + "/");
    });
  });
};
