import { prisma } from "../infrastructure/database/prisma-provider.js";
import { SendOtpDto } from "../schemas/otp/sent-otp-shema.js";
import { BadRequestError } from "../utils/app-error.js";
import { isMobileNumber } from "../utils/app-utils.js";

function sendOtp(payload: SendOtpDto) {
  const { mobile } = payload;
  if (!isMobileNumber(mobile)) throw new BadRequestError("Invalid mobile");
}

export const authService = { sendOtp };
