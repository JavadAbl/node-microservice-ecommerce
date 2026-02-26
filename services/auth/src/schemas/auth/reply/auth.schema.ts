import { Static, Type } from "@sinclair/typebox";
import { UserSchema } from "../../user/reply/user.schema.js";

export const AuthDtoSchema = Type.Object({
  accessToken: Type.String({ description: "Access token" }),
  refreshToken: Type.String({ description: "Refresh token" }),
  user: UserSchema,
});

export type AuthDto = Static<typeof AuthDtoSchema>;
