import { Static, Type } from "@sinclair/typebox";

export const UserDtoSchema = Type.Object({
  id: Type.Integer(),
  username: Type.String({ minLength: 3 }),
  email: Type.Optional(Type.String({ format: "email" })),
});

export type UserDto = Static<typeof UserDtoSchema>;
