import { Static, Type } from "@sinclair/typebox";
import { Role } from "../../../infrastructure/database/generated/prisma/enums.js";
import { PermissionSchema } from "../../auth/reply/permission.schema.js";

export const UserSchema = Type.Object({
  id: Type.Integer({ description: "User id" }),
  mobile: Type.String({ description: "User mobile" }),
  role: Type.Enum(Role, { description: "User role" }),
  permissions: Type.Optional(Type.Array(PermissionSchema)),
});

export type UserDto = Static<typeof UserSchema>;
