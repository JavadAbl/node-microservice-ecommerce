import { FastifyPluginAsync } from "fastify";
import {
  CreateClaimRequestRouteType,
  CreateClaimRequestSchema,
} from "../schemas/claim/create-claim.schema.js";
import { GetClaimsRequestRouteType, GetClaimsRequestSchema } from "../schemas/claim/get-claims.schema.js";
import { claimController } from "../controllers/claim.controller.js";
import {
  UpdateClaimRequestRouteType,
  UpdateClaimRequestSchema,
} from "../schemas/claim/update-claim.schema.js";

export const claimRoutes: FastifyPluginAsync = async (app) => {
  // Get all claims
  app.get<GetClaimsRequestRouteType>("/", { schema: GetClaimsRequestSchema }, (request, reply) =>
    claimController.getClaims(request),
  );

  // Create a new claim
  app.post<CreateClaimRequestRouteType>("/", { schema: CreateClaimRequestSchema }, (request, reply) =>
    claimController.createClaim(request, reply),
  );

  // update a claim
  app.patch<UpdateClaimRequestRouteType>("/:id", { schema: UpdateClaimRequestSchema }, (request, reply) =>
    claimController.updateClaim(request),
  );
};
