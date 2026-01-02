import amqp, { AmqpConnectionManager, Channel, ChannelWrapper } from "amqp-connection-manager";
import { config } from "../app-config.js";
import { pause } from "../../utils/app.util.js";
import { rmqSetupConsumers } from "./rabbitmq-consumers.js";
import { rmqSetup } from "./rabbitmq-setup.js";

export let rmqConnection: AmqpConnectionManager;

export function rmqConnect() {
  rmqConnection = amqp.connect([config.RABBITMQ_URL]);

  rmqConnection.on("connect", () => console.log("Connected to RabbitMQ!"));
  rmqConnection.on("disconnect", (err) => console.log("Disconnected from RabbitMQ", err.err.message));

  rmqSetup();
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
