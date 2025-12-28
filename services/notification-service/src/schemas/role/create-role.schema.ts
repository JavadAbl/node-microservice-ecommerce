import { Static, Type } from "@sinclair/typebox";
import { RoleDto, RoleDtoSchema } from "./role.schema.js";
import { RouteGenericInterface } from "fastify";

const CreateRoleBodySchema = Type.Object({
  name: Type.String({ minLength: 3, description: "Name of the role" }),
  description: Type.Optional(
    Type.Union([Type.String({ description: "Description of the role" }), Type.Null()]),
  ),
});

export const CreateRoleRequestSchema = {
  body: CreateRoleBodySchema,
  description: "Schema for creating a new role",
  tags: ["Role"],
  response: { 201: RoleDtoSchema },
};

export type CreateRoleRequest = Static<typeof CreateRoleBodySchema>;

export interface CreateRoleRequestRouteType extends RouteGenericInterface {
  Body: CreateRoleRequest;
  Reply: RoleDto;
}
