// auth.ts
import fastifyPlugin from "fastify-plugin";
import fastifyJwt, { FastifyJWTOptions } from "@fastify/jwt";
import jwksClient from "jwks-rsa";
import fetch from "node-fetch";
import type { FastifyInstance } from "fastify";
import { appConfig } from "./infrastructure/app-config.js";

export const authPlugin = fastifyPlugin(async (fastify: FastifyInstance) => {
  const keycloakIssuer = `${appConfig.KEYCLOAK_ADDRESS}/realms/${appConfig.KEYCLOAK_REALM}`;
  const openid: any = await (await fetch(`${keycloakIssuer}/.well-known/openid-configuration`)).json();
  const jwksUri: string = openid.jwks_uri;

  const client = jwksClient({ jwksUri, cache: true, rateLimit: true });

  // Register plugin with allowed options only. The plugin expects either a secret string
  // or a function that returns secret (sync or async) with the signature (request, token) => Secret | Promise<Secret>.
  // Use the FastifyJwtOptions type for clarity.
  const jwtOptions: FastifyJWTOptions = {
    decode: { complete: true },
    secret: async (request, token) => {
      // token is of type { header: { kid?: string } } | undefined
      const kid = token?.header?.kid;
      if (!kid) throw new Error("Missing kid in token header");
      const key = await client.getSigningKey(kid);
      return key.getPublicKey();
    },
  };

  await fastify.register(fastifyJwt as any, jwtOptions);

  // Use jsonwebtoken VerifyOptions when calling jwtVerify; include issuer and algorithms there.
  fastify.decorate("authenticate", async (request: any, reply: any) => {
    try {
      // jwtVerify accepts VerifyOptions (from jsonwebtoken): { issuer, audience, algorithms, ... }
      await request.jwtVerify({
        issuer: keycloakIssuer,
        //  algorithms: ["RS256"],
        // audience: "your-client-id" // optional
      });
    } catch (err) {
      reply.code(401).send({ error: "Unauthorized" });
    }
  });
});

/* // auth.ts
import fastifyPlugin from "fastify-plugin";
import fastifyJwt, { FastifyJWTOptions } from "@fastify/jwt";
import jwksClient from "jwks-rsa";
import fetch from "node-fetch";
import type { FastifyInstance } from "fastify";
import { appConfig } from "./infrastructure/app-config.js";

export const authPlugin = fastifyPlugin(async (fastify: FastifyInstance) => {
  const keycloakIssuer = `${appConfig.KEYCLOAK_ADDRESS}/realms/${appConfig.KEYCLOAK_REALM}`;
  
  // Fetch OpenID configuration
  const openid: any = await (await fetch(`${keycloakIssuer}/.well-known/openid-configuration`)).json();
  const jwksUri: string = openid.jwks_uri;

  const client = jwksClient({ 
    jwksUri, 
    cache: true, 
    rateLimit: true 
  });

  // Register JWT plugin with proper configuration
  const jwtOptions: FastifyJWTOptions = {
    decode: { complete: true },
    secret: (request, token, callback) => {
      if (!token || typeof token === 'string') {
        return callback(new Error("Invalid token format"));
      }
      
      const kid = token.header.kid;
      if (!kid) {
        return callback(new Error("Missing kid in token header"));
      }

      client.getSigningKey(kid, (err, key) => {
        if (err) {
          return callback(err);
        }
        const signingKey = key.getPublicKey();
        callback(null, signingKey);
      });
    },
    verify: {
      issuer: keycloakIssuer,
      algorithms: ["RS256"],
      // Uncomment and set if you need audience validation
      // audience: "your-client-id"
    },
    // Important: This must be set to false for RS256 tokens
    sign: { algorithm: 'RS256' }
  };

  await fastify.register(fastifyJwt, jwtOptions);

  // Create authentication decorator
  fastify.decorate("authenticate", async (request: any, reply: any) => {
    try {
      // Try to verify the token
      await request.jwtVerify();
    } catch (err: any) {
      console.error("JWT Verification Error:", err.message);
      reply.code(401).send({ error: "Unauthorized", message: err.message });
    }
  });
}); */
