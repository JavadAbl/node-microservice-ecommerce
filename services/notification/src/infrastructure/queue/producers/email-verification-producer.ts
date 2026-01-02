import { verificationEmailQueue } from "../queue-provider.js";

interface SendEmailJobData {
  to: string;
  subject: string;
  body: string;
}

export async function produceEmailVerificationJob(data: SendEmailJobData) {
  const job = verificationEmailQueue.createJob(data);

  job
    .on("succeeded", (result) => {
      console.log(`Job ${job.id} completed with result:`, result);
    })
    .on("failed", (err) => {
      console.error(`Job ${job.id} failed with error:`, err.message);
    });

  await job.save();
}
