import { Static, Type } from "@sinclair/typebox";
import { RouteGenericInterface } from "fastify";
import { ClaimDto, ClaimDtoSchema } from "./claim.schema.js";
import { ClaimType } from "../../enums/claim-type.enum.js";

const CreateClaimBodySchema = Type.Object({
  name: Type.String({ minLength: 3, description: "Name of the claim" }),
  type: Type.Enum(ClaimType, { description: "Type of the claim" }),
  description: Type.Optional(Type.String({ description: "Description of the claim" })),
});

export const CreateClaimRequestSchema = {
  body: CreateClaimBodySchema,
  description: "Create a claim entity",
  tags: ["Claims"],
  response: { 201: ClaimDtoSchema },
};

export type CreateClaimRequest = Static<typeof CreateClaimBodySchema>;

export interface CreateClaimRequestRouteType extends RouteGenericInterface {
  Body: CreateClaimRequest;
  Reply: ClaimDto;
}
