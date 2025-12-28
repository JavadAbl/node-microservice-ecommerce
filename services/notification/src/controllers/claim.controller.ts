import { FastifyRequest, FastifyReply } from "fastify";
import { GetClaimsRequestRouteType } from "../schemas/claim/get-claims.schema.js";
import { CreateClaimRequestRouteType } from "../schemas/claim/create-claim.schema.js";
import { StatusCodes } from "http-status-codes";
import { claimService } from "../services/claim.service.js";
import { UpdateClaimRequestRouteType } from "../schemas/claim/update-claim.schema.js";

function getClaims(req: FastifyRequest<GetClaimsRequestRouteType>) {
  return claimService.getClaims(req.query);
}

function createClaim(req: FastifyRequest<CreateClaimRequestRouteType>, rep: FastifyReply) {
  rep.statusCode = StatusCodes.CREATED;
  return claimService.createClaim(req.body);
}

function updateClaim(req: FastifyRequest<UpdateClaimRequestRouteType>) {
  return claimService.updateClaim(req.params.id, req.body);
}

export const claimController = { getClaims, createClaim, updateClaim };
