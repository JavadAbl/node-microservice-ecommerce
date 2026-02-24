import { User } from "../infrastructure/database/generated/prisma/client.js";
import { UserRepository } from "../infrastructure/database/Repository/user-repository.js";
import { SetUserRoleDto } from "../schemas/user/request-schema/set-user-role-schema.js";

export const userService = { getUserForLogin, setUserRole };
const userRep = new UserRepository();

async function getUserForLogin(mobile: string) {
  let user = await userRep.findUnique({ where: { mobile }, include: { permissions: true } });
  if (!user) user = await userRep.create({ data: { mobile }, include: { permissions: true } });
  return user;
}

async function setUserRole(userId: number, payload: SetUserRoleDto): Promise<void> {
  const { role } = payload;
  await userRep.findAndCheckExistsBy({ where: { id: userId } }, { field: "id", value: userId });
  await userRep.update({ where: { id: userId }, data: { role } });
}
