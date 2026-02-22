import { FastifyRequest, FastifyReply } from "fastify";

interface UserPayload {
  userId: string;
  roles: string[];
  claims: string[];
}

export const authorize = (requiredClaims: string[]) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    // Check if user has required claims
    const userPayload = (request as any).user as UserPayload | undefined;
    const userClaims = userPayload?.claims || [];

    const hasRequiredClaims = requiredClaims.every((claim) => userClaims.includes(claim));

    if (!hasRequiredClaims) {
      reply.code(403).send({ error: "Forbidden: Insufficient permissions" });
    }
  };
};
