import { FactorItem } from "../infrastructure/database/generated/prisma/client.js";
import { prisma } from "../infrastructure/database/prisma-provider.js";
import { GetManyQuery } from "../schemas/common/get-many-request.schema.js";
import { CreateFactor } from "../schemas/factor/create-factor-schema.js";
import { throwNotFound } from "../utils/app-error.js";
import { generateFactorNumber } from "../utils/app-utils.js";
import { buildFindManyArgs } from "../utils/prisma-util.js";
import { serviceEntityService } from "./serviceEntity-service.js";

function getMany(query: GetManyQuery<"Factor">) {
  const predicate = buildFindManyArgs(query, { searchableFields: ["factorNumber"] });
  return prisma.factor.findMany(predicate);
}

function getById(id: number) {
  return prisma.factor.findUnique({ where: { id } });
}

async function create(payload: CreateFactor) {
  const { customerId, items, description } = payload;

  // 1. Get all service IDs to fetch them in one go (prevents N+1 queries)
  const serviceIds = items.map((item) => item.serviceId);
  const services = await serviceEntityService.getManyRawParams({ where: { id: { in: serviceIds } } });

  // 2. Create a map for easy lookup (id -> service)
  const serviceMap = new Map(services.map((s) => [s.id, s]));

  // 3. Prepare data in memory
  const factorNumber = generateFactorNumber();
  let factorTotalPrice = 0;

  const factorItemsData = items.map((item) => {
    const service = serviceMap.get(item.serviceId);

    if (!service) {
      throw new Error(`Service with ID ${item.serviceId} not found`);
    }

    const itemTotal = service.price * item.quantity;
    factorTotalPrice += itemTotal;

    return {
      quantity: item.quantity,
      description: item.description,
      serviceId: item.serviceId,
      serviceName: service.name,
      unitPrice: service.price,
      totalPrice: item.quantity * service.price,
    } as FactorItem;
  });

  // 4. Create Factor and Items in a single transaction
  const factor = await prisma.factor.create({
    data: {
      factorNumber,
      customerId,
      description,
      totalPrice: factorTotalPrice,
      items: { createMany: { data: factorItemsData } },
    },
  });

  return factor;
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
