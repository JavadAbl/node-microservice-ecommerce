import { Type } from "@sinclair/typebox";
import { RouteGenericInterface, FastifySchema } from "fastify";
import { GetManyQuery, GetManyQuerySchema } from "../../common/get-many-request.schema.js";
import { UserDto, UserSchema } from "../reply/user.schema.js";

export const GetManyUsersSchema: FastifySchema = {
  querystring: GetManyQuerySchema,
  description: "Set an user permission",
  tags: ["User"],
  response: { 200: Type.Array(UserSchema) },
};

export interface GetManyUsersRouteType extends RouteGenericInterface {
  Querystring: GetManyQuery<"User">;
  Reply: UserDto[];
}
