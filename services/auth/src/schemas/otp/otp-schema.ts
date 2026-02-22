import { Static, Type } from "@sinclair/typebox";

export const OtpDtoSchema = Type.Object({
  code: Type.String({ description: "Otp code" }),
  hash: Type.String({ description: "hash code" }),
});

export type OtpDto = Static<typeof OtpDtoSchema>;
