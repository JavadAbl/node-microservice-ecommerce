import { Static, Type } from "@sinclair/typebox";
import { RouteGenericInterface } from "fastify";

const RenewTokenBodySchema = Type.Object({
  refreshToken: Type.String({
    description: "Refresh token to use for renewal",
  }),
});

const RenewTokenDtoSchema = Type.Object({
  accessToken: Type.String({ description: "Newly issued access token" }),
  refreshToken: Type.String({ description: "Newly issued refresh token" }),
});

export const RenewTokenRequestSchema = {
  body: RenewTokenBodySchema,
  description: "Renew access token using refresh token",
  tags: ["Authentication"],
  response: {
    200: RenewTokenDtoSchema,
  },
};

export type RenewTokenRequest = Static<typeof RenewTokenBodySchema>;
export type RenewTokenDto = Static<typeof RenewTokenDtoSchema>;

export interface RenewTokenRequestRouteType extends RouteGenericInterface {
  Body: RenewTokenRequest;
  Reply: RenewTokenDto;
}
