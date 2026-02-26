import { Type } from "@sinclair/typebox";
import { FastifySchema, RouteGenericInterface } from "fastify";
import { IdParams, IdParamsSchema } from "../../common/id-params.schema.js";
import { StatusCodes } from "http-status-codes";

export const DeletePermissionSchema: FastifySchema = {
  params: IdParamsSchema,
  description: "Delete Permission",
  tags: ["Auth"],
  response: { [StatusCodes.NO_CONTENT]: Type.Null() },
};

export interface DeletePermissionRouteType extends RouteGenericInterface {
  Params: IdParams;
  Reply: void;
}
