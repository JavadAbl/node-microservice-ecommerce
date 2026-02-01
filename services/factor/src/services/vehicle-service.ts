import { prisma } from "../infrastructure/database/prisma-provider.js";
import { GetManyQuery } from "../schemas/common/get-many-request.schema.js";
import { throwConflict, throwNotFound } from "../utils/app-error.js";
import { buildFindManyArgs } from "../utils/prisma-util.js";

function getMany(query: GetManyQuery<"Vehicle">) {
  const predicate = buildFindManyArgs(query, { searchableFields: ["vin", "make", "model", "year"] });
  return prisma.factor.findMany(predicate);
}

function getById(id: number) {
  return prisma.factor.findUnique({ where: { id } });
}

async function create(payload: CreateVehicle) {
  const { vin } = payload;
  const existingRole = await prisma.factor.findUnique({ where: { vin } });
  if (existingRole) throwConflict("Vehicle");
  return prisma.factor.create({ data: payload });
}

async function update(id: number, payload: UpdateVehicle) {
  const factor = await prisma.factor.findUnique({ where: { id }, select: { id: true } });
  if (!factor) throwNotFound("id");
  await prisma.factor.update({ where: { id }, data: payload });
}

async function deleteById(id: number) {
  const factor = await prisma.factor.findUnique({ where: { id }, select: { id: true } });
  if (!factor) throwNotFound("id");
  await prisma.factor.delete({ where: { id } });
}

export const factorService = { getMany, getById, create, update, deleteById };
