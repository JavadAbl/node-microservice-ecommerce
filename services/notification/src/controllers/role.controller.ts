import { RoleService } from "../services/role.service.js";
import { GetRolesRequestRouteType } from "../schemas/role/get-roles.schema.js";
import { CreateRoleRequestRouteType } from "../schemas/role/create-role.schema.js";
import { FastifyReply, FastifyRequest } from "fastify";
import { StatusCodes } from "http-status-codes";
import { GetRoleByIdRequestRouteType } from "../schemas/role/get-role-by-id.schema.js";

function getRoles(req: FastifyRequest<GetRolesRequestRouteType>) {
  return RoleService.getMany(req.query);
}

function getRoleById(req: FastifyRequest<GetRoleByIdRequestRouteType>) {
  return RoleService.getById(req.params.id);
}

function createRole(req: FastifyRequest<CreateRoleRequestRouteType>, rep: FastifyReply) {
  rep.statusCode = StatusCodes.CREATED;
  return RoleService.create(req.body);
}
export const roleController = { getRoles, getRoleById, createRole };
