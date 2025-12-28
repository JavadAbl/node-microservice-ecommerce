import { Static, Type } from "@sinclair/typebox";
import { UserDtoSchema } from "./user.dto.js";

export const AuthDtoSchema = Type.Object({
  accessToken: Type.String({ description: "JWT access token" }),
  refreshToken: Type.String({ description: "JWT refresh token" }),
  user: UserDtoSchema,
});

export type AuthDto = Static<typeof AuthDtoSchema>;
