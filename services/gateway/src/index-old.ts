import fastify from "fastify";
import { appConfig } from "./utils/app-config.js";
import { fastifyReplyFrom } from "@fastify/reply-from";
import { gatewayRoutes } from "./routes.js";
import { authPlugin } from "./plugins/auth-plugin.js";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";

export const app = fastify({ routerOptions: { caseSensitive: false } });

async function start() {
  try {
    startHttpServer();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

function startHttpServer() {
  const host = appConfig.HTTP_HOST;
  const port = appConfig.HTTP_PORT;

  setupFastifyPlugins();

  app.listen({ port, host }, (err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Http server Running on ${host}:${port}`);
  });
}

function setupFastifyPlugins() {
  /*  app.addContentTypeParser("application/json", (req, payload, done) => {
    done(null); // This skips parsing and keeps the body as a stream
  }); */

  app.register(authPlugin);
  /*  app.decorate("authenticate", async function (request: FastifyRequest, reply: FastifyReply) {
    try {
      console.log(1232);

      await request.jwtVerify();
    } catch (err) {
      reply.code(401).send({ error: "Unauthorized" });
    }
  }); */

  app.register(fastifyReplyFrom, {
    disableCache: true,
    http: { agentOptions: { keepAlive: true, maxFreeSockets: 1000, timeout: 60000 } },
  });
  app.register(gatewayRoutes);
}

start();
