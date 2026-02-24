import { Type, Static } from "@sinclair/typebox";
import { RouteGenericInterface, FastifySchema } from "fastify";
import { Role } from "../../../infrastructure/database/generated/prisma/enums.js";

const SetUserRoleBodySchema = Type.Object({ role: Type.Enum(Role, { description: "User role" }) });
const SetUserRoleParamsSchema = Type.Object({ userId: Type.Integer({ description: "User id" }) });

export const SetUserRoleSchema: FastifySchema = {
  params: SetUserRoleParamsSchema,
  body: SetUserRoleBodySchema,
  description: "Set a user role",
  tags: ["Users"],
  response: { 200: undefined },
};

export type SetUserRoleParams = Static<typeof SetUserRoleParamsSchema>;
export type SetUserRoleDto = Static<typeof SetUserRoleBodySchema>;

export interface SetUserRoleRouteType extends RouteGenericInterface {
  Params: SetUserRoleParams;
  Body: SetUserRoleDto;
  Reply: SetUserRoleDto;
}
