import { Static, Type } from "@sinclair/typebox";

export const OtpDtoSchema = Type.Object({ otp: Type.String({ description: "Otp code" }) });

export type OtpDto = Static<typeof OtpDtoSchema>;
