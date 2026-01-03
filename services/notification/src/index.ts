import { prisma } from "./infrastructure/database/prisma-provider.js";
import { rmqGracefulShutdown, rmqConnect } from "./infrastructure/rabbitmq/rabbitmq-provider.js";
import { cronSetupJobs } from "./infrastructure/node-cron/cron-jobs.js";
import { queueGracefulShutdown, queuesConnect } from "./infrastructure/queue/queue-provider.js";
import { queueWorkersRegister } from "./infrastructure/queue/queue-workers.js";

async function start() {
  try {
    await startDatabase();
    await startRmq();
    startNodeCron();
    startQueues();
    startWorkers();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

async function startDatabase() {
  await prisma.$connect();
  await prisma.$queryRaw`SELECT 1`;
  console.log("Connected to database");
}

async function startRmq() {
  await rmqConnect();
}

function startNodeCron() {
  cronSetupJobs();
}

function startQueues() {
  queuesConnect();
}

function startWorkers() {
  queueWorkersRegister();
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

start();
