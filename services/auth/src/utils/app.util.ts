import { createHash } from "crypto";

export async function pause(time: number) {
  return new Promise((res) => setTimeout(() => res(undefined), time));
}

export function isMobileNumber(mobile: string) {
  const iranMobileRegex = /^09[0-3]\d{8}$/;
  return iranMobileRegex.test(mobile);
}

export function isEmptyObj(obj: any) {
  if (!obj) return true;
  return Object.keys(obj).length === 0;
}
