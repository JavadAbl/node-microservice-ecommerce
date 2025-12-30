import { config } from "./infrastructure/config.js";
import { rabbitConnection } from "./infrastructure/rabbitmq/rabbitmq.provider.js";
import { createServer } from "http";
import { pause } from "./utils/app.util.js";

async function start() {
  try {
    const server = createServer();

    server.on("request", (req, res) => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({ status: "UP", timestamp: new Date().toISOString(), service: "RabbitMQ-Worker" }),
      );
    });

    await rabbitConnection.connect({ timeout: 10000 });

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
    console.log("connection", connection);

    await pause(2500);
    await connection.close();
    console.log("RabbitMQ connection closed.");
  };

  await gracefulShutdownRabbitMQ();
  process.exit(0);
}

start();
