import { Static, Type } from "@sinclair/typebox";
import { AuthDto, AuthDtoSchema } from "./auth.dto.js";
import { RouteGenericInterface } from "fastify";

const RegisterBodySchema = Type.Object({
  username: Type.String({ minLength: 3, description: "Username of the user" }),
  email: Type.Optional(
    Type.String({ format: "email", description: "User email address" })
  ),
  password: Type.String({ minLength: 3, description: "User password" }),
});

export const RegisterRequestSchema = {
  body: RegisterBodySchema,
  description: "Register a new user and return JWT tokens",
  tags: ["Authentication"],
  response: {
    201: AuthDtoSchema,
  },
};

export type RegisterRequest = Static<typeof RegisterBodySchema>;

export interface RegisterRequestRouteType extends RouteGenericInterface {
  Body: RegisterRequest;
  Reply: AuthDto;
}
