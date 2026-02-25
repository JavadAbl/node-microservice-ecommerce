import { Static, Type } from "@sinclair/typebox";
import { FastifySchema, RouteGenericInterface } from "fastify";
import { AuthDto, AuthDtoSchema } from "../reply-schema/auth.schema.js";

const VerifyOtpBodySchema = Type.Object({
  mobile: Type.String({ description: "Mobile Number" }),
  otp: Type.String({ description: "Otp code" }),
});

export const VerifyOtpSchema: FastifySchema = {
  body: VerifyOtpBodySchema,
  description: "Verify a vehicle entity",
  tags: ["Otps"],
  response: { 200: AuthDtoSchema },
};

export type VerifyOtpDto = Static<typeof VerifyOtpBodySchema>;

export interface VerifyOtpRouteType extends RouteGenericInterface {
  Body: VerifyOtpDto;
  Reply: AuthDto;
}
