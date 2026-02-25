import { Type, Static } from "@sinclair/typebox";
import { RouteGenericInterface, FastifySchema } from "fastify";
import { Role } from "../../../infrastructure/database/generated/prisma/enums.js";
import { IdParams, IdParamsSchema } from "../../common/id-params.schema.js";

const SetUserRoleBodySchema = Type.Object({ role: Type.Enum(Role, { description: "User role" }) });

export const SetUserRoleSchema: FastifySchema = {
  params: IdParamsSchema,
  body: SetUserRoleBodySchema,
  description: "Set a user role",
  tags: ["Users"],
  response: { 200: undefined },
};

export type SetUserRoleDto = Static<typeof SetUserRoleBodySchema>;

export interface SetUserRoleRouteType extends RouteGenericInterface {
  Params: IdParams;
  Body: SetUserRoleDto;
  Reply: undefined;
}
