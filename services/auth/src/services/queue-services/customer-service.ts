import { prisma } from "../../infrastructure/database/prisma-provider.js";
import { CreateCustomer, UpdateCustomer } from "../../types/event-types/customer-types.js";
import { throwNotFound } from "../../utils/app-error.js";

async function createCustomer(payload: CreateCustomer) {
  const { id } = payload;
  const existingCustomer = await prisma.customerReference.findUnique({ select: { id: true }, where: { id } });
  if (existingCustomer) return existingCustomer;

  return await prisma.customerReference.create({ select: { id: true }, data: payload });
}

async function updateCustomer(payload: UpdateCustomer) {
  const { id } = payload;

  const customer = await prisma.customerReference.findUnique({ select: { id: true }, where: { id } });
  if (!customer) throwNotFound("Customer");

  delete payload.id;
  return await prisma.customerReference.update({ select: { id: true }, where: { id }, data: payload });
}

export const customerService = { createCustomer, updateCustomer };
