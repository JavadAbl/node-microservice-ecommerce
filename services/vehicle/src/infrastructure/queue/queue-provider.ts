import Queue from "bee-queue";
import { config } from "../config.js";
import { QUEUE_EVENT_CUSTOMER_CREATE, QUEUE_EVENT_SERVICE_CREATE } from "./queue-config.js";

export let queueEventCustomerCreate: Queue;
export let queueEventServiceCreate: Queue;

export function startQueues() {
  queueEventCustomerCreate = queueCreate(QUEUE_EVENT_CUSTOMER_CREATE);
  queueEventServiceCreate = queueCreate(QUEUE_EVENT_SERVICE_CREATE);
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
  await queueEventCustomerCreate.close();
  await queueEventServiceCreate.close();
  // console.log(`Worker ${queueEventCustomerCreate.name} stopped.`);
};
