import { prisma } from "../infrastructure/database/prisma-provider.js";
import { GetManyQuery } from "../schemas/common/get-many-request.schema.js";
import { CreateVehicleService } from "../schemas/vehicle-service/create-vehicle-service-schema.js";
import { UpdateVehicleService } from "../schemas/vehicle-service/update-vehicle-service-schema.js";
import { throwNotFound } from "../utils/app-error.js";
import { buildFindManyArgs } from "../utils/prisma-util.js";

function getMany(query: GetManyQuery<"VehicleService">) {
  const predicate = buildFindManyArgs(query, { searchableFields: ["technicianName", "description"] });
  return prisma.vehicleService.findMany(predicate);
}

function getById(id: number) {
  return prisma.vehicleService.findUnique({ where: { id } });
}

async function create(payload: CreateVehicleService) {
  return prisma.vehicleService.create({ data: payload });
}

async function update(id: number, payload: UpdateVehicleService) {
  const serviceHistory = await prisma.vehicleService.findUnique({ where: { id }, select: { id: true } });
  if (!serviceHistory) throwNotFound("id");

  return prisma.vehicleService.update({ where: { id }, data: payload });
}

async function deleteById(id: number) {
  const serviceHistory = await prisma.vehicleService.findUnique({ where: { id }, select: { id: true } });
  if (!serviceHistory) throwNotFound("id");

  return prisma.vehicleService.delete({ where: { id } });
}

export const vehicleServiceService = { getMany, getById, create, update, deleteById };
