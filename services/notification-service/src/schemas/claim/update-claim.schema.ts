import { Static, Type } from "@sinclair/typebox";
import { RouteGenericInterface } from "fastify";
import { ClaimDto, ClaimDtoSchema } from "./claim.schema.js";

const UpdateClaimBodySchema = Type.Object({
  name: Type.Optional(Type.String({ minLength: 3, description: "Name of the claim" })),
  /*  description: Type.Optional(
    Type.Union([Type.String({ description: "Description of the claim" }), Type.Null()]),
  ), */

  description: Type.Optional(Type.String({ description: "Description of the claim" })),
});

const UpdateClaimParamSchema = Type.Object({
  id: Type.Integer({ description: "Id of the claim", minimum: 1 }),
});

export const UpdateClaimRequestSchema = {
  body: UpdateClaimBodySchema,
  params: UpdateClaimParamSchema,
  description: "Update a claim entity",
  tags: ["Claims"],
  response: { 200: ClaimDtoSchema },
};

export type UpdateClaimRequest = Static<typeof UpdateClaimBodySchema>;
export type UpdateClaimParams = Static<typeof UpdateClaimParamSchema>;

export interface UpdateClaimRequestRouteType extends RouteGenericInterface {
  Body: UpdateClaimRequest;
  Params: UpdateClaimParams;
  Reply: ClaimDto;
}
