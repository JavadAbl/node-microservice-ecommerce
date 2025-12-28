import { FastifyRequest, FastifyReply } from "fastify";
import { LoginRequestRouteType } from "../schemas/auth/login.request.js";
import { authService } from "../services/auth.service.js";
import { RegisterRequestRouteType } from "../schemas/auth/register.request.js";
import { StatusCodes } from "http-status-codes";
import { InspectTokenRequestRouteType } from "../schemas/auth/inspect-token.request.js";
import { RenewTokenRequestRouteType } from "../schemas/auth/renew-token.request.js";

const login = (req: FastifyRequest<LoginRequestRouteType>) => {
  return authService.login(req.body);
};

const register = (req: FastifyRequest<RegisterRequestRouteType>, reply: FastifyReply) => {
  reply.statusCode = StatusCodes.CREATED;
  return authService.register(req.body);
};

const inspectToken = (req: FastifyRequest<InspectTokenRequestRouteType>) => {
  return { tokenPayload: req.user };
};

const renewToken = async (request: FastifyRequest<RenewTokenRequestRouteType>) => {
  return authService.renewToken(request.body);
};

export const authController = { login, register, inspectToken, renewToken };
