import Queue from "bee-queue";
import { RMQ_QUEUE_EMAIL_WELCOME } from "../rabbitmq/rabbitmq-config.js";
import { QUEUE_EMAIL_VERIFICATION } from "./queue-config.js";
import { config } from "../app-config.js";

export let queueEmailVerification: Queue;
export let queueEmailWelcome: Queue;

export function queuesConnect() {
  queueEmailVerification = queueCreate(QUEUE_EMAIL_VERIFICATION);
  queueEmailWelcome = queueCreate(RMQ_QUEUE_EMAIL_WELCOME);
}

function queueCreate(queueName: string) {
  const host = config.REDIS_HOST;
  const port = config.REDIS_PORT;
  const password = config.REDIS_PASSWORD;

  const queue = new Queue(queueName, {
    redis: { host, port, password },
    removeOnSuccess: true,
    removeOnFailure: true,
  });

  queue.once("ready", () => console.log(`Queue ${queueName} is connected`));

  return queue;
}

export const queueGracefulShutdown = async () => {
  await queueEmailVerification.close();
  await queueEmailWelcome.close();
  // console.log(`Worker ${queueEmailVerification.name} stopped.`);
};
