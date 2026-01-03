import { Channel } from "amqp-connection-manager";
import { RMQ_QUEUE_EMAIL_VERIFICATION, RMQ_QUEUE_EMAIL_WELCOME } from "./rabbitmq-config.js";
import { rmqConnection } from "./rabbitmq-provider.js";

export function rmqSetup() {
  rmqConnection.createChannel({
    setup: async (channel: Channel) => {
      await channel.assertQueue(RMQ_QUEUE_EMAIL_VERIFICATION, { durable: true });
      await channel.assertQueue(RMQ_QUEUE_EMAIL_WELCOME, { durable: true });
      await channel.close();
    },
  });
}
