import { startCacheClient } from "./infrastructure/cache/cache-provider.js";
import { validateConfig } from "./infrastructure/config.js";
import { startDatabase } from "./infrastructure/database/prisma-provider.js";
import { startCronJobs } from "./infrastructure/node-cron/cron-jobs.js";
import { queueGracefulShutdown, startQueues } from "./infrastructure/queue/queue-provider.js";
import { startQueueWorkers } from "./infrastructure/queue/queue-workers.js";
import { rmqGracefulShutdown, startRmq } from "./infrastructure/rabbitmq/rabbitmq-provider.js";
import { startHttpServer } from "./server.js";

async function run() {
  validateConfig();
  await startDatabase();
  await startHttpServer();
  startCronJobs();
  await startRmq();
  startQueues();
  startQueueWorkers();
  await startCacheClient();
  try {
  } catch (error: any) {
    console.error(error?.message, error);
    process.exit(1);
  }
}

process.on("SIGINT", async () => {
  console.log("Received SIGINT. Starting graceful shutdown...");
  await gracefulShutdown();
});
process.on("SIGTERM", async () => {
  console.log("Received SIGINT. Starting graceful shutdown...");
  await gracefulShutdown();
});

async function gracefulShutdown() {
  await rmqGracefulShutdown();
  await queueGracefulShutdown();
  process.exit(0);
}

run();
