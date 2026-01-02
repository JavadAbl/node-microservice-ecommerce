import { config } from "./infrastructure/app-config.js";
import { createServer } from "http";
import { prisma } from "./infrastructure/database/prisma.provider.js";
import {
  gracefulShutdownRabbitMQ,
  connectRmq,
  rmqConnection,
} from "./infrastructure/rabbitmq/rabbitmq.provider.js";
import { RMQ_QUEUE_EMAIL, RMQ_QUEUE_EMAIL_VERIFICATION } from "./infrastructure/rabbitmq/rabbitmq-config.js";
import { APP_Name } from "./utils/constans.js";

async function start() {
  try {
    await prisma.$connect();
    await prisma.$queryRaw`SELECT 1`;
    console.log("Connected to database");

    await connectRmq();

    const server = createServer();

    server.on("request", async (req, res) => {
      console.log(rmqConnection.channelCount);

      const c = rmqConnection.createChannel({ json: true ,});
      c.sendToQueue(RMQ_QUEUE_EMAIL_VERIFICATION, { s: 1 }, { appId: APP_Name, });

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

    process.on("SIGINT", async () => {
      console.log("Received SIGINT. Starting graceful shutdown...");
      await gracefulShutdown();
    });
    process.on("SIGTERM", async () => {
      console.log("Received SIGINT. Starting graceful shutdown...");
      await gracefulShutdown();
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

async function gracefulShutdown() {
  await gracefulShutdownRabbitMQ();
  process.exit(0);
}

start();
