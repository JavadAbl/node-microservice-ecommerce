import Queue from "bee-queue";
import { config } from "../app-config.js";
import { QUEUE_EMAIL_VERIFICATION } from "./queue-config.js";
import { produceEmailVerificationJob } from "./producers/email-verification-producer.js";

const host = config.REDIS_HOST;
const port = config.REDIS_PORT;
const password = config.REDIS_PASSWORD;

export let verificationEmailQueue: Queue;

export async function connectQueues() {
  await connectVerificationEmailQueue();
}

async function connectVerificationEmailQueue() {
  verificationEmailQueue = new Queue(QUEUE_EMAIL_VERIFICATION, {
    redis: { host, port, password },
    removeOnSuccess: true,
    removeOnFailure: true,
  });

  verificationEmailQueue.once("ready", () => console.log(`Queue ${QUEUE_EMAIL_VERIFICATION} is connected`));

  produceEmailVerificationJob({ body: "ds", subject: "sd", to: "sd" });
  produceEmailVerificationJob({ body: "ds", subject: "sd", to: "sd" });
}

export const queueGracefulShutdown = async () => {
  await verificationEmailQueue.close();
  console.log(`Worker ${verificationEmailQueue.name} stopped.`);
};
