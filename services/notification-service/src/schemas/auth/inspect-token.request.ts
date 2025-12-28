import { Static, Type } from "@sinclair/typebox";
import { RouteGenericInterface } from "fastify";

const InspectTokenDtoSchema = Type.Object({
  tokenPayload: Type.Any({ description: "Decoded token content" }),
});

export const inspectTokenSchema = {
  description: "Inspect and validate JWT token",
  tags: ["Authentication"],
  headers: Type.Object({
    authorization: Type.String({ description: "Bearer token" }),
  }),
  response: {
    200: InspectTokenDtoSchema,
  },
};

export type InspectTokenRequest = Static<typeof inspectTokenSchema.headers>;
export type InspectTokenDto = Static<typeof InspectTokenDtoSchema>;

export interface InspectTokenRequestRouteType extends RouteGenericInterface {
  Headers: InspectTokenRequest;
  Reply: InspectTokenDto;
}
