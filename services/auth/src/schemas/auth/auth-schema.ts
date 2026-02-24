import { Static, Type } from "@sinclair/typebox";
import { UserDtoSchema } from "../user/user-schema.js";

export const AuthDtoSchema = Type.Object({
  accessToken: Type.String({ description: "Access token" }),
  refreshToken: Type.String({ description: "Refresh token" }),
  user: UserDtoSchema,
});

export type AuthDto = Static<typeof AuthDtoSchema>;
