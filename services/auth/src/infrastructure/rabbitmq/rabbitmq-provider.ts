import amqp, { AmqpConnectionManager } from "amqp-connection-manager";
import { rmqSetupConsumers } from "./rabbitmq-consumers.js";
import { rmqSetup } from "./rabbitmq-setup.js";
import { config } from "../config.js";
import { pause } from "../../utils/app.util.js";

export let rmqConnection: AmqpConnectionManager;

export async function startRmq() {
  rmqConnection = amqp.connect([config.RABBITMQ_URL]);

  rmqConnection.on("connect", () => console.log("Connected to RabbitMQ!"));
  rmqConnection.on("disconnect", (err) => console.log("Disconnected from RabbitMQ", err.err.message));

  await rmqSetup();
  rmqSetupConsumers();

  return rmqConnection;
}

export const rmqGracefulShutdown = async () => {
  console.log("Closing RabbitMQ connection...");
  const connection = rmqConnection;

  await pause(250);
  await connection.close();
  console.log("RabbitMQ connection closed.");
};
