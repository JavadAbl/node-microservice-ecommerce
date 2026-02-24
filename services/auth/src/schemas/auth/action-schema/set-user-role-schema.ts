import { Type, Static } from "@sinclair/typebox";
import { Role } from "../../infrastructure/database/generated/prisma/enums.js";
import { RouteGenericInterface, FastifySchema } from "fastify";

export const SetUserRoleBodySchema = Type.Object({ role: Type.Enum(Role, { description: "User role" }) });
export const SetUserRoleParamsSchema = Type.Object({ userId: Type.Integer({ description: "User id" }) });

export const SetUserRoleSchema: FastifySchema = {
  params: SetUserRoleParamsSchema,
  body: SetUserRoleBodySchema,
  description: "Set a user role",
  tags: ["Users"],
  response: { 200: VehicleDtoSchema },
};

export type SetUserRoleParams = Static<typeof SetUserRoleParamsSchema>;
export type SetUserRoleDto = Static<typeof SetUserRoleBodySchema>;

export interface GetVehicleByIdRouteType extends RouteGenericInterface {
  Params: SetUserRoleParams;
  Reply: SetUserRoleDto;
}
