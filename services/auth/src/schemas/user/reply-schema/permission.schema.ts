import { Type, Static } from "@sinclair/typebox";

export const PermissionSchema = Type.Object({
  id: Type.Integer({ description: "id" }),
  name: Type.String({ description: "Permission" }),
});

export type PermissionDto = Static<typeof PermissionSchema>;
