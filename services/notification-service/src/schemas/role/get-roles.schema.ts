import { Type } from "@sinclair/typebox";
import { RouteGenericInterface } from "fastify";
import { GetManyRequestQuery, GetManyRequestQuerySchema } from "../common/get-many-request.schema.js";
import { RoleDto, RoleDtoSchema } from "./role.schema.js";

export const GetRolesRequestSchema = {
  Querystring: GetManyRequestQuerySchema,
  description: "Get multiple roles with pagination, sorting, and searching",
  tags: ["Roles"],
  response: { 200: Type.Array(RoleDtoSchema) },
};

export interface GetRolesRequestRouteType extends RouteGenericInterface {
  Querystring: GetManyRequestQuery<"Role">;
  Reply: RoleDto[];
}
