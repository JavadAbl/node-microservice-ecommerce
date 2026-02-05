import { prisma } from "../../infrastructure/database/prisma-provider.js";
import { CreateService, UpdateService } from "../../types/event-types/service-types.js";
import { throwNotFound } from "../../utils/app-error.js";

async function createService(payload: CreateService) {
  const { id } = payload;
  const existingService = await prisma.serviceReference.findUnique({ select: { id: true }, where: { id } });
  if (existingService) return existingService;

  return await prisma.serviceReference.create({ select: { id: true }, data: payload });
}

async function updateService(payload: UpdateService) {
  const { id } = payload;

  const service = await prisma.serviceReference.findUnique({ select: { id: true }, where: { id } });
  if (!service) throwNotFound("Service");

  delete payload.id;
  return await prisma.serviceReference.update({ select: { id: true }, where: { id }, data: payload });
}

export const serviceService = { createService, updateService };
