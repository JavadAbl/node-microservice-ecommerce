import { Prisma } from "../infrastructure/database/generated/prisma/client.js";
import { prisma } from "../infrastructure/database/prisma-provider.js";
import { PermissionRepository } from "../infrastructure/database/Repository/permission.repository.js";
import { UserRepository } from "../infrastructure/database/Repository/user.repository.js";
import { SetUserPermissionDto } from "../schemas/user/request/set-user-permission.schema.js";
import { SetUserRoleDto } from "../schemas/user/request/set-user-role.schema.js";

export const userService = { getUserForLogin, setUserRole, setUserPermissions };
const userRep = new UserRepository();
const permissionRep = new PermissionRepository();

async function getUserForLogin(mobile: string) {
  let user = await userRep.findUnique({ where: { mobile } });
  if (!user) user = await userRep.create({ data: { mobile } });

  const permissions = await permissionRep.findMany({
    where: { UserPermissions: { every: { userId: user.id } } },
  });

  return { ...user, permissions };
}

async function setUserRole(userId: number, payload: SetUserRoleDto): Promise<void> {
  const { role } = payload;
  await userRep.findAndCheckExistsBy({ where: { id: userId } }, "id", userId);
  await userRep.update({ where: { id: userId }, data: { role } });
}

async function setUserPermissions(userId: number, payload: SetUserPermissionDto): Promise<void> {
  await userRep.findAndCheckExistsBy({ where: { id: userId } }, "id", userId);

  const permissionIds = Array.from(new Set(payload.permissionIds || []));

  await prisma.$transaction(async (tx) => {
    // delete user permissions whose permissionId is not in the new list
    await tx.userPermission.deleteMany({
      where: { userId, NOT: permissionIds.length ? { permissionId: { in: permissionIds } } : undefined },
    });

    if (permissionIds.length === 0) return;

    // find which permissionIds are already assigned
    const existing = await tx.userPermission.findMany({
      where: { userId, permissionId: { in: permissionIds } },
      select: { permissionId: true },
    });
    const existingSet = new Set(existing.map((r) => r.permissionId));

    // create missing UserPermission rows
    const toCreate = permissionIds
      .filter((id) => !existingSet.has(id))
      .map((permissionId) => ({ userId, permissionId }));

    if (toCreate.length) {
      await tx.userPermission.createMany({ data: toCreate });
    }
  });
}
