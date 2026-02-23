import { Channel } from "amqp-connection-manager";
import { rmqConnection } from "./rabbitmq-provider.js";
import { RMQ_EXCHANGE } from "./rabbitmq-config.js";

export function rmqSetup() {
  return new Promise((res, rej) => {
    const channelWrapper = rmqConnection.createChannel({
      setup: async (channel: Channel) => {
        //Exchange
        await channel.assertExchange(RMQ_EXCHANGE, "direct", { durable: true });

        //Service Create
        /* await channel.assertQueue(RMQ_QUEUE_CUSTOMER_CREATE, { durable: true });
        await channel.bindQueue(RMQ_QUEUE_CUSTOMER_CREATE, RMQ_EXCHANGE, RMQ_RK_CUSTOMER_CREATE);
        logQueueBinding(RMQ_QUEUE_CUSTOMER_CREATE, RMQ_EXCHANGE); */

        await channel.close();

        res(undefined);
      },
    });

    channelWrapper.on("error", (err) => {
      console.error("Channel Setup error:", err);
      rej(err);
    });

    channelWrapper.on("connect", () => {
      console.log("Channel Setup connected");
    });
  });
}

function logQueueBinding(queueName: string, exchangeName: string) {
  console.log(`RMQ Queue ${queueName} bound to exchange ${exchangeName}`);
}
