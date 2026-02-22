import { prisma } from "../infrastructure/database/prisma-provider.js";
import { GetManyQuery } from "../schemas/common/get-many-request.schema.js";
import { CreateVehicle } from "../schemas/vehicle/create-vehicle-schema.js";
import { UpdateVehicle } from "../schemas/vehicle/update-vehicle-schema.js";
import { throwConflict, throwNotFound } from "../utils/app-error.js";
import { buildFindManyArgs } from "../utils/prisma-util.js";

function getMany(query: GetManyQuery<"Vehicle">) {
  const predicate = buildFindManyArgs(query, { searchableFields: ["vin", "make", "model", "year"] });
  return prisma.vehicle.findMany(predicate);
}

function getById(id: number) {
  return prisma.vehicle.findUnique({ where: { id } });
}

async function create(payload: CreateVehicle) {
  const { vin } = payload;
  const existingRole = await prisma.vehicle.findUnique({ where: { vin } });
  if (existingRole) throwConflict("Vehicle");
  return prisma.vehicle.create({ data: payload });
}

async function update(id: number, payload: UpdateVehicle) {
  const vehicle = await prisma.vehicle.findUnique({ where: { id }, select: { id: true } });
  if (!vehicle) throwNotFound("id");
  await prisma.vehicle.update({ where: { id }, data: payload });
}

async function deleteById(id: number) {
  const vehicle = await prisma.vehicle.findUnique({ where: { id }, select: { id: true } });
  if (!vehicle) throwNotFound("id");
  await prisma.vehicle.delete({ where: { id } });
}

export const vehicleService = { getMany, getById, create, update, deleteById };
