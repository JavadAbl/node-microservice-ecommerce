import { Static, Type } from "@sinclair/typebox";
import { RouteGenericInterface } from "fastify";
import { RoleDto, RoleDtoSchema } from "./role.schema.js";

const GetRoleByIdParamSchema = Type.Object({
  id: Type.Integer({ description: "Id of the role", minimum: 1 }),
});

export const GetRoleByIdRequestSchema = {
  params: GetRoleByIdParamSchema,
  description: "Get a role by its ID",
  tags: ["Roles"],
  response: { 200: RoleDtoSchema },
};

export type GetRoleByIdParams = Static<typeof GetRoleByIdParamSchema>;

export interface GetRoleByIdRequestRouteType extends RouteGenericInterface {
  Params: GetRoleByIdParams;
  Reply: RoleDto;
}
