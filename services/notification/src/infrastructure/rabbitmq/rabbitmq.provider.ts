import amqp, { AmqpConnectionManager, ChannelWrapper } from "amqp-connection-manager";
import { config } from "../config.js";
import { Channel } from "amqplib";

const AMQP_URL = config.RABBITMQ_URL;

export const rabbitConnection: AmqpConnectionManager = amqp.connect([AMQP_URL]);

rabbitConnection.on("connect", () => console.log("Connected to RabbitMQ!"));
rabbitConnection.on("disconnect", (err) => console.log("Disconnected from RabbitMQ", err.err.message));

// Create a channel wrapper
// This allows you to define setup logic (queues/exchanges) that persists across restarts

export const pubChannel = rabbitConnection.createChannel({
  setup: (channel) => {
    return channel.assertExchange("events", "topic");
  },
});

export const subChannel = rabbitConnection.createChannel({
  setup: (channel) => {
    return Promise.all([
      channel.assertQueue("email_queue"),
      channel.consume("email_queue", (msg) => {
        /* logic */
      }),
    ]);
  },
});
