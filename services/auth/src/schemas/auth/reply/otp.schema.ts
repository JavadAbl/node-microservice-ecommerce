import { Static, Type } from "@sinclair/typebox";

export const OtpSchema = Type.Object({ otp: Type.String({ description: "Otp code" }) });

export type OtpDto = Static<typeof OtpSchema>;
