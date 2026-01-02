import { config } from "./infrastructure/app-config.js";
import { createServer } from "http";
import { prisma } from "./infrastructure/database/prisma.provider.js";
import { rmqGracefulShutdown, rmqConnect } from "./infrastructure/rabbitmq/rabbitmq-provider.js";
import { cronSetupJobs } from "./infrastructure/node-cron/cron-jobs.js";
import { connectQueues } from "./infrastructure/queue/queue-provider.js";
import { registerWorkers } from "./infrastructure/queue/workers/workers-provider.js";

async function start() {
  try {
    await startDatabase();
    await startRmq();
    startNodeCron();
    await startQueues();
    startWorkers();
    startHttpServer();
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

async function startQueues() {
  await connectQueues();
}

function startWorkers() {
  registerWorkers();
}

function startHttpServer() {
  const server = createServer();

  server.on("request", async (req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({ status: "UP", timestamp: new Date().toISOString(), service: "RabbitMQ-Worker" }),
    );
  });

  const port = config.HTTP_PORT;
  const host = config.HTTP_HOST;

  server.listen(port, host, () => {
    console.log(`Notification server running on http://${host}:${port}`);
  });
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
  process.exit(0);
}

start();
