import { toServiceDto } from "../dto/serivce/service-mapper.js";
import { ServiceReferenceFindManyArgs } from "../infrastructure/database/generated/prisma/models.js";
import { prisma } from "../infrastructure/database/prisma-provider.js";
import { CreateService, UpdateService } from "../types/event-types/service-event-types.js";
import { throwNotFound } from "../utils/app-error.js";

async function getById(id: number) {
  const service = await prisma.serviceReference.findUnique({ where: { id } });
  if (!service) throwNotFound("Service", id);
  return toServiceDto(service!);
}

async function checkExistsById(id: number) {
  const service = await prisma.serviceReference.findUnique({ select: { id: true }, where: { id } });
  if (!service) throwNotFound("Service", id);
}

async function createService(payload: CreateService) {
  const { id } = payload;
  const existingService = await prisma.serviceReference.findUnique({ select: { id: true }, where: { id } });
  if (existingService) return existingService;

  return await prisma.serviceReference.create({ select: { id: true }, data: payload });
}

async function updateService(payload: UpdateService) {
  const { id, ...updataData } = payload;

  const service = await prisma.serviceReference.findUnique({ select: { id: true }, where: { id } });
  if (!service) throwNotFound("Service", id);

  return await prisma.serviceReference.update({ select: { id: true }, where: { id }, data: updataData });
}

async function getManyRawParams(rawParams: ServiceReferenceFindManyArgs) {
  return prisma.serviceReference.findMany(rawParams);
}

export const serviceEntityService = {
  createService,
  updateService,
  getById,
  checkExistsById,
  getManyRawParams,
};
