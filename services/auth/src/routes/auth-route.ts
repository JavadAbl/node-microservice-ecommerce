import { FastifyPluginAsync } from "fastify";
import { SendOtpRouteType, SendOtpSchema } from "../schemas/auth/request-schema/sent-otp-shema.js";
import { authService } from "../services/auth-service.js";
import { VerifyOtpRouteType, VerifyOtpSchema } from "../schemas/auth/request-schema/verify-otp-shema.js";

export const authRoutes: FastifyPluginAsync = async (app) => {
  // Send otp ------------------------------------------------
  app.post<SendOtpRouteType>("/Send", { schema: SendOtpSchema }, async (request, reply) => {
    return authService.sendOtp(request.body);
  });

  // Send otp ------------------------------------------------
  app.post<VerifyOtpRouteType>("/Verify", { schema: VerifyOtpSchema }, async (request, reply) => {
    return authService.verifyOtp(request.body);
  });
};
