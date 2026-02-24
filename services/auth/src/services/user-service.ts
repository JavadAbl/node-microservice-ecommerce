import { prisma } from "../infrastructure/database/prisma-provider.js";
import { UserRepository } from "../infrastructure/database/Repository/user-repository.js";

export const userService = { getUserForLogin };
const userRep = new UserRepository();

async function getUserForLogin(mobile: string) {
  let user = await userRep.findUnique({ where: { mobile }, include: { permissions: true } });
  if (!user) user = await userRep.create({ data: { mobile }, include: { permissions: true } });
  return user;
}
