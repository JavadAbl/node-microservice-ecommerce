import { Channel } from "amqp-connection-manager";
import { rmqConnection } from "./rabbitmq-provider.js";
import { RMQ_EXCHANGE, RMQ_QUEUE_CUSTOMER_CREATE, RMQ_RK_CUSTOMER_CREATE } from "./rabbitmq-config.js";

export function rmqSetup() {
  rmqConnection.createChannel({
    setup: async (channel: Channel) => {
      await channel.assertQueue(RMQ_QUEUE_CUSTOMER_CREATE, { durable: true });
      await channel.bindQueue(RMQ_QUEUE_CUSTOMER_CREATE, RMQ_EXCHANGE, RMQ_RK_CUSTOMER_CREATE);
      await channel.close();
    },
  });
}
