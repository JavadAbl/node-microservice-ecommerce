import { Static, Type } from "@sinclair/typebox";
import { FastifySchema, RouteGenericInterface } from "fastify";
import { OtpDto, OtpSchema } from "../reply/otp.schema.js";

const SendOtpBodySchema = Type.Object({ mobile: Type.String({ description: "Mobile Number" }) });

export const SendOtpSchema: FastifySchema = {
  body: SendOtpBodySchema,
  description: "Send an otp",
  tags: ["Auth"],
  response: { 200: OtpSchema },
};

export type SendOtpDto = Static<typeof SendOtpBodySchema>;

export interface SendOtpRouteType extends RouteGenericInterface {
  Body: SendOtpDto;
  Reply: OtpDto;
}
