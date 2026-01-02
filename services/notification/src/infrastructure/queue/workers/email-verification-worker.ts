import { verificationEmailQueue } from "../queue-provider.js";

export function registerEmailVerificationWorker() {
  interface SendEmailJobData {
    to: string;
    subject: string;
    body: string;
  }

  verificationEmailQueue.process(async (job, done) => {
    const data: SendEmailJobData = job.data;

    console.log(`Processing job ${job.id}: Sending email to ${data.to}`);

    return done(null, job.data.x + job.data.y);
  });
}
