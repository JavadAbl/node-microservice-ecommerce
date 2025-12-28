import { Static, Type } from "@sinclair/typebox";

export const RoleDtoSchema = Type.Object({
  id: Type.Integer({ description: "Unique identifier for the role" }),
  name: Type.String({ minLength: 3, description: "Name of the role" }),
  description: Type.Optional(
    Type.Union([Type.String({ description: "Description of the role" }), Type.Null()]),
  ),
});

export type RoleDto = Static<typeof RoleDtoSchema>;
