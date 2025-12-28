import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import { roleController } from "../controllers/role.controller.js";
import { GetRolesRequestRouteType, GetRolesRequestSchema } from "../schemas/role/get-roles.schema.js";
import {
  GetRoleByIdRequestRouteType,
  GetRoleByIdRequestSchema,
} from "../schemas/role/get-role-by-id.schema.js";
import { CreateRoleRequestRouteType, CreateRoleRequestSchema } from "../schemas/role/create-role.schema.js";

export const roleRoutes: FastifyPluginAsync = async (app) => {
  app.get<GetRolesRequestRouteType>("/", { schema: GetRolesRequestSchema }, async (req) =>
    roleController.getRoles(req),
  );

  app.get<GetRoleByIdRequestRouteType>("/:id", { schema: GetRoleByIdRequestSchema }, async (req) =>
    roleController.getRoleById(req),
  );

  app.post<CreateRoleRequestRouteType>("/", { schema: CreateRoleRequestSchema }, async (req, rep) =>
    roleController.createRole(req, rep),
  );
};
