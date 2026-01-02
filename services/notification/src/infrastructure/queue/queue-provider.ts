import Queue from "bee-queue";
import { config } from "../app-config.js";
import { QUEUE_EMAIL_VERIFICATION } from "./queue-config.js";
import { addSendEmailJob } from "./queue-producer.js";

const host = config.REDIS_HOST;
const port = config.REDIS_PORT;
const password = config.REDIS_PASSWORD;

export let verificationEmailQueue: Queue;

export async function connectQueues() {
  await connectVerificationEmailQueue();
}

async function connectVerificationEmailQueue() {
  verificationEmailQueue = new Queue(QUEUE_EMAIL_VERIFICATION, { redis: { host, port, password } });

  verificationEmailQueue.once("ready", () => console.log(`Queue ${QUEUE_EMAIL_VERIFICATION} is connected`));
  await verificationEmailQueue.connect();
  addSendEmailJob({ body: "sd", subject: "sd", to: "sd" });
}
