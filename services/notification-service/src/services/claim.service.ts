import { Claim } from "@prisma/client";
import { PrismaProvider } from "../infrastructure/database/prisma.provider.js";
import { buildFindManyArgs } from "../utils/prisma.util.js";
import { GetManyRequestQuery } from "../schemas/common/get-many-request.schema.js";
import { CreateClaimRequest } from "../schemas/claim/create-claim.schema.js";
import { UpdateClaimRequest } from "../schemas/claim/update-claim.schema.js";

const prisma = PrismaProvider.getInstance();

async function createClaim(payload: CreateClaimRequest): Promise<Claim> {
  return await prisma.claim.create({
    data: { name: payload.name, description: payload.description, type: payload.type },
  });
}

async function getClaims(query: GetManyRequestQuery<"Claim">): Promise<Claim[]> {
  const predicate = buildFindManyArgs(query, { searchableFields: ["name", "description"] });
  return await prisma.claim.findMany(predicate);
}

async function updateClaim(claimId: number, payload: UpdateClaimRequest): Promise<Claim> {
  return await prisma.claim.update({ where: { id: claimId }, data: { ...payload } });
}

export const claimService = { getClaims, createClaim, updateClaim };

/* -------------------------------------------------------------------------- */
/*  Tree & relationship helpers                                               */
/* -------------------------------------------------------------------------- */
/*
type ClaimsTree = Record<
  string, // service name
  Record<string, string[]> // controller name → list of action names
>; */

/* export async function getClaimsTree(prisma: PrismaClient): Promise<ClaimsTree> {
  // Re‑use the getAllClaims helper for consistency
  const allClaims = await getAllClaims(prisma);

  const tree: ClaimsTree = {};

  // Service level
  const serviceClaims = allClaims.filter((c) => c.type === "SERVICE");

  for (const service of serviceClaims) {
    if (!service.id || !service.name) continue;
    const serviceName = service.name;
    tree[serviceName] = {};

    // Controllers belonging to this service
    const controllerClaims = allClaims.filter((c) => c.parentId === service.id && c.type === "CONTROLLER");

    for (const controller of controllerClaims) {
      if (!controller.id || !controller.name) continue;
      const controllerName = controller.name;
      tree[serviceName][controllerName] = [];

      // Actions belonging to this controller
      const actionClaims = allClaims.filter((c) => c.parentId === controller.id && c.type === "ACTION");

      tree[serviceName][controllerName] = actionClaims.map((a) => a.name);
    }
  }

  return tree;
} */
