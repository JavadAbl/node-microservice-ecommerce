import { Channel } from "amqp-connection-manager";
import { rmqConnection } from "./rabbitmq-provider.js";
import { EventHandler, rmqInboxEventHandler } from "./rabbitmq-handlers.js";
import { RMQ_QUEUE_CUSTOMER_CREATE } from "./rabbitmq-config.js";

export function rmqSetupConsumers() {
  createConsumer(RMQ_QUEUE_CUSTOMER_CREATE, rmqInboxEventHandler);
}

function createConsumer(queueName: string, handler: EventHandler) {
  rmqConnection.createChannel({
    json: true,
    setup: async (channel: Channel) => {
      await channel.consume(
        queueName,
        async (event) => {
          if (!event) return;

          try {
            const eventPayload = JSON.parse(event.content.toString());

            await handler(eventPayload, queueName, event.properties.appId);

            console.log(`[✅] Processed and acknowledged rabbitmq message from ${queueName}`);
          } catch (error) {
            console.error(`[❌] Failed to process rabbitmq message from ${queueName}:`, error);
            //todo
            //handle error events
          } finally {
            channel.ack(event);
          }
        },
        {},
      );
    },
  });

  console.log(`[🚀] Consumer setup for queue: ${queueName}`);
}
