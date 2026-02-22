import { Static, Type } from "@sinclair/typebox";
import { RouteGenericInterface } from "fastify";
import { OtpDto, OtpDtoSchema } from "./otp-schema.js";

const SendOtpBodySchema = Type.Object({ mobile: Type.String({ description: "Mobile Number" }) });

export const SendOtpSchema = {
  body: SendOtpBodySchema,
  description: "Send a vehicle entity",
  tags: ["Otps"],
  response: { 201: OtpDtoSchema },
};

export type SendOtpDto = Static<typeof SendOtpBodySchema>;

export interface SendOtpRouteType extends RouteGenericInterface {
  Body: SendOtpDto;
  Reply: OtpDto;
}
