import { Channel } from "amqp-connection-manager";
import { RMQ_QUEUE_EMAIL_VERIFICATION } from "./rabbitmq-config.js";
import { rmqConnection } from "./rabbitmq-provider.js";

export function rmqSetup() {
  rmqConnection.createChannel({
    setup: async (channel: Channel) => {
      await channel.assertQueue(RMQ_QUEUE_EMAIL_VERIFICATION, { durable: true, autoDelete: false });
      await channel.close();
    },
  });
}
