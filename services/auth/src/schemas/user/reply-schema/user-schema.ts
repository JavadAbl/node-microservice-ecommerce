import { Static, Type } from "@sinclair/typebox";
import { Role } from "../../../infrastructure/database/generated/prisma/enums.js";
import { UserPermission } from "../../../infrastructure/database/generated/prisma/client.js";
import { UserPermissionSchema } from "./user-permission-schema.js";

export const UserDtoSchema = Type.Object({
  mobile: Type.String({ description: "Access token" }),
  role: Type.Enum(Role, { description: "Refresh token" }),
  permissions: Type.Array(UserPermissionSchema),
});

export type UserDto = Static<typeof UserDtoSchema>;
