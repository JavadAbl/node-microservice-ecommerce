import Queue from "bee-queue";
import { pause } from "../../utils/app-utils.js";
import { queueEventCustomerCreate, queueEventServiceCreate } from "./queue-provider.js";
import { queueCustomerCreateHandler, queueServiceCreateHandler } from "./queue-handlers.js";

function queueWorkerRegister(
  queue: Queue,
  handler: (job: Queue.Job<any>) => any,
  concurrency = 1,
  delay = 1000,
) {
  queue.process(concurrency, async (job) => {
    await pause(delay);
    const res = await handler(job);
    return res;
  });
}

export function queueWorkersRegister() {
  queueWorkerRegister(queueEventCustomerCreate, queueCustomerCreateHandler);
  queueWorkerRegister(queueEventServiceCreate, queueServiceCreateHandler);
}
