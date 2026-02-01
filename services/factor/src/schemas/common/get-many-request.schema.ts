import { Type } from "@sinclair/typebox";
import { Prisma } from "../../infrastructure/database/generated/prisma/client.js";

/* export type GetManyQuery = {
  page?: string | undefined;
  limit?: string | undefined;
  sortBy?: string | undefined;
  sortOrder?: "asc" | "desc" | undefined;
  search?: string | undefined;
};
 */

export type GetManyQuery<T extends keyof Prisma.TypeMap["model"]> = {
  page?: number;
  limit?: number;
  sortBy?: keyof Prisma.TypeMap["model"][T]["fields"];
  sortOrder?: "asc" | "desc";
  search?: string;
};

export const GetManyQuerySchema = Type.Object({
  page: Type.Optional(Type.String()),
  limit: Type.Optional(Type.String()),
  sortBy: Type.Optional(Type.String()),
  sortOrder: Type.Optional(Type.Union([Type.Literal("asc"), Type.Literal("desc")])),
  search: Type.Optional(Type.String()),
});
