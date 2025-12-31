import amqp, { AmqpConnectionManager, ChannelWrapper } from "amqp-connection-manager";
import { config } from "../app.config.js";
import { Channel } from "amqplib";
import { configRabbitMQ } from "./rabbitmq.config.js";

const AMQP_URL = config.RABBITMQ_URL;

export const rabbitConnection: AmqpConnectionManager = amqp.connect([AMQP_URL]);

rabbitConnection.on("connect", () => console.log("Connected to RabbitMQ!"));
rabbitConnection.on("disconnect", (err) => console.log("Disconnected from RabbitMQ", err.err.message));

//Startup channel-------------------------------------------------------------------
rabbitConnection.createChannel({
  setup: async (channel: Channel) => {
    await configRabbitMQ(channel);
    await channel.close();
  },
});

// Create a channel wrapper
// This allows you to define setup logic (queues/exchanges) that persists across restarts
export const pubChannel = rabbitConnection.createChannel();

export const subChannel = rabbitConnection.createChannel();
