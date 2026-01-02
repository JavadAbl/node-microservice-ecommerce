import { pause } from "../../../utils/app.util.js";
import {
  WORKER_EMAIL_VERIFICATION_CONCURRENCY,
  WORKER_EMAIL_VERIFICATION_INTERVAL_DELAY,
} from "../queue-config.js";
import { verificationEmailQueue } from "../queue-provider.js";

export function registerEmailVerificationWorker() {
  interface SendEmailJobData {
    to: string;
    subject: string;
    body: string;
  }

  verificationEmailQueue.process(WORKER_EMAIL_VERIFICATION_CONCURRENCY, async (job, done) => {
    await pause(WORKER_EMAIL_VERIFICATION_INTERVAL_DELAY);
    const data: SendEmailJobData = job.data;

    console.log(`Processing job ${job.id}: Sending email to ${data.to}`);

    return done(null, job.data.x + job.data.y);
  });
}
