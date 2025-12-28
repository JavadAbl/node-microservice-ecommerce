import { Type } from "@sinclair/typebox";
import { RouteGenericInterface } from "fastify";
import { ClaimDto, ClaimDtoSchema } from "./claim.schema.js";
import { GetManyRequestQuery, GetManyRequestQuerySchema } from "../common/get-many-request.schema.js";

export const GetClaimsRequestSchema = {
  Querystring: GetManyRequestQuerySchema,
  description: "Get multiple claims with pagination, sorting, and searching",
  tags: ["Claims"],
  response: { 200: Type.Array(ClaimDtoSchema) },
};

export interface GetClaimsRequestRouteType extends RouteGenericInterface {
  Querystring: GetManyRequestQuery<"Claim">;
  Reply: ClaimDto[];
}
