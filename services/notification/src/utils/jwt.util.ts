import { FastifyInstance } from "fastify";
import { config } from "../infrastructure/config.js";
import { Prisma, User } from "@prisma/client";

interface JWTPayload {
  userId: number;
  roles: string[];
  claims: string[];
}

type UserWithRoles = Prisma.UserGetPayload<{
  include: { roles: { select: { name: true; id: false } } };
}>;

export class JwtUtil {
  static async generateAccessToken(
    fastify: FastifyInstance,
    user: Prisma.UserGetPayload<{
      include: {
        roles: { select: { name: true; id: false } };
        claims: { select: { name: true } };
      };
    }>
  ): Promise<string> {
    const payload: JWTPayload = {
      userId: user.id,
      roles: user.roles.map((role) => role.name),
      claims: user.claims.map((claim) => claim.name),
    };

    return await fastify.jwt.sign(payload, {
      expiresIn: config.JWT_ACCESS_EXPIRES_IN,
    });
  }

  static async generateRefreshToken(
    fastify: FastifyInstance,
    user: User
  ): Promise<string> {
    const payload = {
      userId: user.id,
    };

    return await fastify.jwt.sign(payload, {
      expiresIn: config.JWT_REFRESH_EXPIRES_IN,
    });
  }

  static async verifyToken(
    fastify: FastifyInstance,
    token: string
  ): Promise<any> {
    try {
      return await fastify.jwt.verify(token);
    } catch (error) {
      return null;
    }
  }

  static async generateTokens(
    fastify: FastifyInstance,
    user: Prisma.UserGetPayload<{
      include: {
        roles: { select: { name: true; id: false } };
        claims: { select: { name: true } };
      };
    }>
  ) {
    const accessToken = await this.generateAccessToken(fastify, user);
    const refreshToken = await this.generateRefreshToken(fastify, user);
    return { accessToken, refreshToken };
  }
}
