import { resolve } from "path";
import { mailer } from "../infrastructure/email/email-provider.js";
import { cwd } from "process";

export type EmailVerification = { email: string; username: string; verificationCode: string };
export type EmailWelcome = { email: string; username: string };

export async function serviceEmailVerificationSend(payload: EmailVerification) {
  const { email, username, verificationCode } = payload;
  const template = resolve(cwd(), "handlebars", "verification-email.hbs");
  await mailer.sendTemplate(
    template,
    { username, verificationCode, currentYear: new Date().getFullYear().toString() },
    { to: email, subject: "Verification Code" },
  );
}

export async function serviceEmailWelcomeSend(payload: EmailWelcome) {
  const { email, username } = payload;
  const template = resolve(cwd(), "handlebars", "welcome-email.hbs");
  await mailer.sendTemplate(
    template,
    { username, currentYear: new Date().getFullYear().toString() },
    { to: email, subject: "Welcome" },
  );
}
