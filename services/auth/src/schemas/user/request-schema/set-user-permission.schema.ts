import { Type, Static } from "@sinclair/typebox";
import { RouteGenericInterface, FastifySchema } from "fastify";
import { IdParams, IdParamsSchema } from "../../common/id-params.schema.js";

const SetUserPermissionBodySchema = Type.Object({
  permissionIds: Type.Array(Type.Integer({ description: "Id of the permission" })),
});

export const SetUserPermissionSchema: FastifySchema = {
  params: IdParamsSchema,
  body: SetUserPermissionBodySchema,
  description: "Set a user role",
  tags: ["Users"],
  response: { 200: undefined },
};

export type SetUserPermissionDto = Static<typeof SetUserPermissionBodySchema>;

export interface SetUserPermissionRouteType extends RouteGenericInterface {
  Params: IdParams;
  Body: SetUserPermissionDto;
  Reply: undefined;
}
