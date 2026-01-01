import { Channel } from "amqp-connection-manager";
import { RMQ_QUEUE_EMAIL } from "./rabbitmq-config.js";
import { rmqConnection } from "./rabbitmq.provider.js";

export function setupConsumers() {
  createConsumer(RMQ_QUEUE_EMAIL, (event) => console.log(event));
}

function createConsumer(queueName: string, handler: any) {
  const channelWrapper = rmqConnection.createChannel({
    json: true,
    setup: async (channel: Channel) => {
      await channel.consume(queueName, async (msg) => {
        if (!msg) {
          return;
        }

        try {
          const messageObject = msg.content;
          await handler(messageObject);
          channel.ack(msg);
          console.log(`[✅] Processed and acknowledged message from ${queueName}`);
        } catch (error) {
          console.error(`[❌] Failed to process message from ${queueName}:`, error);
          channel.nack(msg, false, false);
        }
      });
    },
  });

  console.log(`[🚀] Consumer setup for queue: ${queueName}`);
}
