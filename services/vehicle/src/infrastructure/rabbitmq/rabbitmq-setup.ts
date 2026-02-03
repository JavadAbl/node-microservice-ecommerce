import { Channel } from "amqp-connection-manager";
import { rmqConnection } from "./rabbitmq-provider.js";
import {
  RMQ_EXCHANGE,
  RMQ_QUEUE_CUSTOMER_CREATE,
  RMQ_QUEUE_SERVICE_CREATE,
  RMQ_RK_CUSTOMER_CREATE,
  RMQ_RK_SERVICE_CREATE,
} from "./rabbitmq-config.js";

export function rmqSetup() {
  const channelWrapper = rmqConnection.createChannel({
    json: true,
    setup: async (channel: Channel) => {
      await channel.assertExchange(RMQ_EXCHANGE, "direct", { durable: true });

      await channel.assertQueue(RMQ_QUEUE_CUSTOMER_CREATE, { durable: true });
      await channel.assertQueue(RMQ_QUEUE_SERVICE_CREATE, { durable: true });

      await channel.bindQueue(RMQ_QUEUE_SERVICE_CREATE, RMQ_EXCHANGE, RMQ_RK_SERVICE_CREATE);
      await channel.bindQueue(RMQ_QUEUE_CUSTOMER_CREATE, RMQ_EXCHANGE, RMQ_RK_CUSTOMER_CREATE);

      console.log(`Queue ${RMQ_QUEUE_CUSTOMER_CREATE} bound to exchange ${RMQ_EXCHANGE}`);
      console.log(`Queue ${RMQ_QUEUE_SERVICE_CREATE} bound to exchange ${RMQ_EXCHANGE}`);

      await channel.close();
    },
  });

  channelWrapper.on("error", (err) => {
    console.error("Channel Setup error:", err);
  });

  channelWrapper.on("connect", () => {
    console.log("Channel Setup connected");
  });
}
