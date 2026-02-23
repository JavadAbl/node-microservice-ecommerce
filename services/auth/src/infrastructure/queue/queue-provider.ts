import Queue from "bee-queue";
import { config } from "../config.js";

// export let queueEventCustomerCreate: Queue;

export function startQueues() {
  // queueEventCustomerCreate = queueCreate(QUEUE_EVENT_CUSTOMER_CREATE);
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
  // await queueEventCustomerCreate.close();
  // console.log(`Worker ${queueEventCustomerCreate.name} stopped.`);
};
