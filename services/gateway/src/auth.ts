// auth.ts
import fastifyPlugin from "fastify-plugin";
import fastifyJwt from "@fastify/jwt";
import jwksClient from "jwks-rsa";
import fetch from "node-fetch";

export default fastifyPlugin(async (fastify) => {
  const keycloakIssuer = "https://<KEYCLOAK_HOST>/realms/<REALM>";
  // discover jwks_uri
  const openid = await (await fetch(`${keycloakIssuer}/.well-known/openid-configuration`)).json();
  const jwksUri = openid.jwks_uri;

  const client = jwksClient({ jwksUri, cache: true, rateLimit: true });

  await fastify.register(fastifyJwt, {
    // provide a function that returns PEM for a given token header.kid
    secret: async (request, token) => {
      const kid = token.header.kid;
      const key = await client.getSigningKey(kid);
      return key.getPublicKey();
    },
    algorithms: ["RS256"],
  });

  fastify.decorate("authenticate", async (request, reply) => {
    try {
      await request.jwtVerify({
        issuer: keycloakIssuer,
        // optionally require audience: audience: 'account' or your client id
      });
    } catch (err) {
      reply.code(401).send({ error: "Unauthorized" });
    }
  });
});
