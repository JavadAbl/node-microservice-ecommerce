import { prisma } from "../infrastructure/database/prisma-provider.js";
import { GetManyRequestQuery } from "../schemas/common/get-many-request.schema.js";
import { CreateVehicleRequest } from "../schemas/vehicle/create-vehicle-schema.js";
import { throwCONFLICT } from "../utils/app-error.js";
import { buildFindManyArgs } from "../utils/prisma-util.js";

function getMany(query: GetManyRequestQuery<"Vehicle">) {
  const predicate = buildFindManyArgs(query, { searchableFields: ["model"] });
  return prisma.vehicle.findMany(predicate);
}

function getById(id: number) {
  return prisma.vehicle.findUnique({ where: { id } });
}

async function create(payload: CreateVehicleRequest) {
  const {} = payload;
  const existingRole = await prisma.vehicle.findUnique({ where: { name } });
  if (existingRole) throwCONFLICT("Role");
  return prisma.vehicle.create({ data: payload });
}

export const vehicleService = { getMany, getById, create };
