import { Static, Type } from "@sinclair/typebox";
import { AuthDto, AuthDtoSchema } from "./auth.dto.js";
import { RouteGenericInterface } from "fastify";

const LoginBodySchema = Type.Object({
  username: Type.String({ description: "Username" }),
  password: Type.String({ minLength: 3, description: "User password" }),
});

export const LoginRequestSchema = {
  description: "Authenticate user and return JWT tokens",
  tags: ["Authentication"],
  body: LoginBodySchema,
  response: {
    200: AuthDtoSchema,
  },
};

export type LoginRequest = Static<typeof LoginBodySchema>;

export interface LoginRequestRouteType extends RouteGenericInterface {
  Body: LoginRequest;
  Reply: AuthDto;
}
