import { prisma } from "../infrastructure/database/prisma.provider.js";
import { GetManyRequestQuery } from "../schemas/common/get-many-request.schema.js";
import { CreateRoleRequest } from "../schemas/role/create-role.schema.js";
import { throwCONFLICT } from "../utils/app-error.js";
import { buildFindManyArgs } from "../utils/prisma.util.js";

function getMany(query: GetManyRequestQuery<"Role">) {
  const predicate = buildFindManyArgs(query, { searchableFields: ["name"] });
  return prisma.role.findMany(predicate);
}

function getById(id: number) {
  return prisma.role.findUnique({ where: { id } });
}

async function create(payload: CreateRoleRequest) {
  const { name } = payload;
  const existingRole = await prisma.role.findUnique({ where: { name } });
  if (existingRole) throwCONFLICT("Role");
  return prisma.role.create({ data: payload });
}

export const RoleService = { getMany, getById, create };
