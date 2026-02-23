import { FastifyPluginAsync } from "fastify";
import { SendOtpRouteType, SendOtpSchema } from "../schemas/otp/sent-otp-shema.js";
import { otpService } from "../services/otp-service.js";
import { VerifyOtpRouteType, VerifyOtpSchema } from "../schemas/otp/verify-otp-shema.js";

export const otpRoutes: FastifyPluginAsync = async (app) => {
  // Send otp ------------------------------------------------
  app.post<SendOtpRouteType>("/Send", { schema: SendOtpSchema }, async (request, reply) => {
    return otpService.sendOtp(request.body);
  });

  // Send otp ------------------------------------------------
  app.post<VerifyOtpRouteType>("/Verify", { schema: VerifyOtpSchema }, async (request, reply) => {
    return otpService.verifyOtp(request.body);
  });
};
