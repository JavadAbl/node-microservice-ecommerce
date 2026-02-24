import { Type, Static } from "@sinclair/typebox";
import { Permission } from "../../../infrastructure/database/generated/prisma/enums.js";

export const UserPermissionSchema = Type.Object({
  id: Type.Integer({ description: "id" }),
  permission: Type.Enum(Permission, { description: "Permission" }),
});

export type UserPermissionDto = Static<typeof UserPermissionSchema>;
