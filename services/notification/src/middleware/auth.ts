import { FastifyRequest, FastifyReply } from 'fastify';

interface UserPayload {
  userId: string;
  roles: string[];
  claims: string[];
}

export const authenticate = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    // Verify JWT token
    const user = await request.jwtVerify();
    (request as any).user = user as UserPayload;
  } catch (err) {
    reply.code(401).send({ error: 'Unauthorized' });
  }
};

export const authorize = (requiredClaims: string[]) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    // Check if user has required claims
    const userPayload = (request as any).user as UserPayload | undefined;
    const userClaims = userPayload?.claims || [];

    const hasRequiredClaims = requiredClaims.every(claim =>
      userClaims.includes(claim)
    );

    if (!hasRequiredClaims) {
      reply.code(403).send({ error: 'Forbidden: Insufficient permissions' });
    }
  };
};