import { prisma } from "../infrastructure/database/prisma-provider.js";

export const userService = { getUserForLogin };

async function getUserForLogin(mobile: string) {
  let user = await prisma.user.findUnique({ where: { mobile } });
  if (!user) user = await prisma.user.create({ data: { mobile } });
  return user;
}
