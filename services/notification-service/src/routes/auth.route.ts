import { authController } from "../controllers/auth.controller.js";
import { LoginRequestRouteType, LoginRequestSchema } from "../schemas/auth/login.request.js";
import { RegisterRequestRouteType, RegisterRequestSchema } from "../schemas/auth/register.request.js";
import { InspectTokenRequestRouteType, inspectTokenSchema } from "../schemas/auth/inspect-token.request.js";
import { RenewTokenRequestRouteType, RenewTokenRequestSchema } from "../schemas/auth/renew-token.request.js";
import { FastifyPluginAsync } from "fastify";

export const authRoutes: FastifyPluginAsync = async (app) => {
  // Login route
  app.post<LoginRequestRouteType>("/login", { schema: LoginRequestSchema }, (request, reply) =>
    authController.login(request),
  );

  // Register route
  app.post<RegisterRequestRouteType>(
    "/register",
    { schema: RegisterRequestSchema },
    async (request, reply) => await authController.register(request, reply),
  );

  // Token inspection route
  app.get<InspectTokenRequestRouteType>(
    "/inspect-token",
    { onRequest: [app.authenticate], schema: inspectTokenSchema },
    (request, reply) => authController.inspectToken(request),
  );

  // Token renewal route
  app.post<RenewTokenRequestRouteType>(
    "/renew-token",
    { schema: RenewTokenRequestSchema },
    (request, reply) => authController.renewToken(request),
  );
};
