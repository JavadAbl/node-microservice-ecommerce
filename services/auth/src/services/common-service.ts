import { Prisma } from "../infrastructure/database/generated/prisma/client.js";
import { prisma } from "../infrastructure/database/prisma-provider.js";

export const commonService = { findFirst, findUnique, create, update, remove };

async function findFirst<
  TModel extends keyof typeof prisma,
  TArgs extends Prisma.Args<(typeof prisma)[TModel], "findFirst">,
>(model: TModel, args: TArgs): Promise<Prisma.Result<(typeof prisma)[TModel], TArgs, "findFirst"> | null> {
  return (prisma[model] as any).findFirst(args);
}

async function findUnique<
  TModel extends keyof typeof prisma,
  TArgs extends Prisma.Args<(typeof prisma)[TModel], "findUnique">,
>(model: TModel, args: TArgs): Promise<Prisma.Result<(typeof prisma)[TModel], TArgs, "findUnique"> | null> {
  return (prisma[model] as any).findUnique(args);
}

// --- FIND MANY ---
async function findMany<
  TModel extends keyof typeof prisma,
  TArgs extends Prisma.Args<(typeof prisma)[TModel], "findMany">,
>(model: TModel, args: TArgs): Promise<Prisma.Result<(typeof prisma)[TModel], TArgs, "findMany">> {
  return (prisma[model] as any).findMany(args);
}

// --- CREATE ---
async function create<
  TModel extends keyof typeof prisma,
  TArgs extends Prisma.Args<(typeof prisma)[TModel], "create">,
>(model: TModel, args: TArgs): Promise<Prisma.Result<(typeof prisma)[TModel], TArgs, "create">> {
  return (prisma[model] as any).create(args);
}

// --- UPDATE ---
async function update<
  TModel extends keyof typeof prisma,
  TArgs extends Prisma.Args<(typeof prisma)[TModel], "update">,
>(model: TModel, args: TArgs): Promise<Prisma.Result<(typeof prisma)[TModel], TArgs, "update">> {
  return (prisma[model] as any).update(args);
}

// --- DELETE (Renamed to 'remove') ---
async function remove<
  TModel extends keyof typeof prisma,
  TArgs extends Prisma.Args<(typeof prisma)[TModel], "delete">,
>(model: TModel, args: TArgs): Promise<Prisma.Result<(typeof prisma)[TModel], TArgs, "delete">> {
  return (prisma[model] as any).delete(args);
}
