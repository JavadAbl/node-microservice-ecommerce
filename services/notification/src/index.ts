import { config } from "./infrastructure/app.config.js";
import { createServer } from "http";
import { pause } from "./utils/app.util.js";
import { prisma, prismaAdapter } from "./infrastructure/database/prisma.provider.js";
import { rabbitConnection } from "./infrastructure/rabbitmq/rabbitmq.provider.js";

async function start() {
  try {
    await rabbitConnection.connect({ timeout: 5000 });
    await prisma.$connect();
    await prisma.$queryRaw`SELECT 1`;
    console.log("Connected to database");

    const server = createServer();

    server.on("request", async (req, res) => {
      const x = await prisma.user.findMany();
      console.log(x);

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
  const gracefulShutdownRabbitMQ = async () => {
    console.log("Closing RabbitMQ connection...");
    const connection = rabbitConnection;

    await pause(2500);
    await connection.close();
    console.log("RabbitMQ connection closed.");
  };

  await gracefulShutdownRabbitMQ();
  process.exit(0);
}

start();
