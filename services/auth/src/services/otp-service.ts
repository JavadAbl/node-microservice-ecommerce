import { randomInt } from "crypto";
import { cacheCheckConnection, cacheClient } from "../infrastructure/cache/cache-provider.js";
import { SendOtpDto } from "../schemas/otp/sent-otp-shema.js";
import { BadRequestError } from "../utils/app-error.js";
import { isEmptyObj, isMobileNumber } from "../utils/app-utils.js";
import { VerifyOtpDto } from "../schemas/otp/verify-otp-shema.js";
import { userService } from "./user-service.js";

export const otpService = { sendOtp, verifyOtp };

const OTP_EXPIRE = 120; // 120 Second expiry

async function sendOtp(payload: SendOtpDto) {
  const { mobile } = payload;
  if (!isMobileNumber(mobile)) throw new BadRequestError("Invalid mobile");

  const otp = generateOtp();

  await cacheCheckConnection();
  await cacheClient.setEx(`otp:${mobile}`, OTP_EXPIRE, otp);

  return { otp };
}

async function verifyOtp(payload: VerifyOtpDto) {
  const { mobile, otp } = payload;
  if (!isMobileNumber(mobile)) throw new BadRequestError("Invalid mobile");

  const cachedOtp = await cacheClient.get(`otp:${mobile}`);
  if (isEmptyObj(cachedOtp)) throw new BadRequestError("Otp code was expired");

  const user = await userService.getUserForLogin(mobile);
}

function generateOtp() {
  return randomInt(100000, 999999).toString();
}
