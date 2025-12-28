import { Prisma, PrismaClient, User } from "@prisma/client";
import { PrismaProvider } from "../infrastructure/database/prisma.provider.js";
import { AppError } from "../utils/app-error.js";
import { StatusCodes } from "http-status-codes";

const prisma = PrismaProvider.getInstance();

/* export const getAndCheckExistsBy = async (
  entity: keyof PrismaClient,
  field: keyof Prisma,
  value: any,
  options?: any,
  isUnique: boolean = false
) => {
  const findMethod = isUnique ? "findUnique" : "findFirst";
  const user = await prisma[entity][findMethod]({
    ...options,
    where: { [field]: value },
  });
  if (!user) throwNotFoundIfFalse(user, field, value);

  return user;
}; */

type PrismaModelName = keyof PrismaClient;

// Helper: map model name -> delegate type (e.g. PrismaClient['user'])
type DelegateFor<M extends PrismaModelName> = PrismaClient[M];

// Extract the arg type for findFirst if it exists
type FindFirstArgs<M extends PrismaModelName> =
  DelegateFor<M> extends { findFirst: (args: infer A) => any } ? A : never;

// Extract the arg type for findUnique if it exists
type FindUniqueArgs<M extends PrismaModelName> =
  DelegateFor<M> extends { findUnique: (args: infer A) => any } ? A : never;

// Union of allowed args (covers both findFirst and findUnique signatures)
type AnyFindArgs<M extends PrismaModelName> =
  | FindFirstArgs<M>
  | FindUniqueArgs<M>;

// Result type returned by findFirst/findUnique (nullable)
type FindResult<M extends PrismaModelName> =
  DelegateFor<M> extends { findFirst: (...args: any) => Promise<infer R> }
    ? R
    : DelegateFor<M> extends { findUnique: (...args: any) => Promise<infer R> }
      ? R
      : any;

export async function getAndCheckExistsBy<M extends PrismaModelName>(
  model: M,
  args: AnyFindArgs<M>,
  isUnique: boolean = false
): Promise<NonNullable<FindResult<M>>> {
  // keep delegate as any for dynamic method call (safe at runtime)
  const delegate = prisma[model] as any;
  const method = isUnique ? "findUnique" : "findFirst";

  const result = await delegate[method](args);

  if (!result) {
    // Compiler doesn't guarantee args has `where`, so cast to `any` for runtime inspection.
    const where = (args as any)?.where;
    const [[field, value]] = Object.entries(where ?? {});
    // throwNotFoundIfFalse should throw (or you can throw a custom error)
    throwNotFoundIfFalse(result, field, value);
  }

  return result as NonNullable<FindResult<M>>;
}

export const getAndCheckExistsById = async (entity: string, id: any) => {
  const user = await prisma[entity].findUnique({ where: { id } });
  if (!user) throwNotFoundIfFalse(user, "id", id);
};

const throwNotFoundIfFalse = (value: any, field: string, fieldValue: any) => {
  if (!value) throw new AppError(`${field} ${fieldValue} is not found`);
};
