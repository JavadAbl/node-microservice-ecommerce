import amqp, { AmqpConnectionManager, Channel, ChannelWrapper } from "amqp-connection-manager";
import { config } from "../app-config.js";
import { pause } from "../../utils/app.util.js";
import { RMQ_EXCHANGE, RMQ_QUEUE_EMAIL, RMQ_RK_EMAIL } from "./rabbitmq-config.js";
import { setupConsumers } from "./consumers.js";

export let rmqConnection: AmqpConnectionManager;

export function connectRmq() {
  rmqConnection = amqp.connect([config.RABBITMQ_URL]);

  rmqConnection.on("connect", () => console.log("Connected to RabbitMQ!"));
  rmqConnection.on("disconnect", (err) => console.log("Disconnected from RabbitMQ", err.err.message));

  setupRmq();
  // setupConsumers();

  return rmqConnection;
}

export function setupRmq() {
  rmqConnection.createChannel({
    setup: async (channel: Channel) => {
      await channel.assertExchange(RMQ_EXCHANGE, "direct", { durable: true });
      await channel.assertQueue(RMQ_QUEUE_EMAIL, { durable: true });
      await channel.bindQueue(RMQ_QUEUE_EMAIL, RMQ_EXCHANGE, RMQ_RK_EMAIL);
      await channel.close();
    },
  });
}

export const gracefulShutdownRabbitMQ = async () => {
  console.log("Closing RabbitMQ connection...");
  const connection = rmqConnection;

  await pause(250);
  await connection.close();
  console.log("RabbitMQ connection closed.");
};
