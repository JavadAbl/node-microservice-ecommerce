import { Channel } from "amqp-connection-manager";
import { rmqConnection } from "./rabbitmq-provider.js";
import { EventHandler, rmqInboxEventHandler } from "./rabbitmq-handlers.js";
import { RMQ_QUEUE_CUSTOMER_CREATE, RMQ_QUEUE_SERVICE_CREATE } from "./rabbitmq-config.js";

export function rmqSetupConsumers() {
  createConsumer(RMQ_QUEUE_CUSTOMER_CREATE, rmqInboxEventHandler);
  createConsumer(RMQ_QUEUE_SERVICE_CREATE, rmqInboxEventHandler);
}

function createConsumer(queueName: string, handler: EventHandler) {
  const channelWrapper = rmqConnection.createChannel({
    json: true,
    setup: async (channel: Channel) => {
      await channel.consume(
        queueName,
        async (event) => {
          if (!event) return;

          try {
            const eventPayload = JSON.parse(event.content.toString());

            await handler(eventPayload, queueName, event.properties.appId);
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

  channelWrapper.on("error", (err) => {
    console.error(`Channel error for queue ${queueName}:`, err);
  });

  channelWrapper.on("connect", () => {
    console.log(`[🚀] Consumer connected for queue: ${queueName}`);
  });
}
