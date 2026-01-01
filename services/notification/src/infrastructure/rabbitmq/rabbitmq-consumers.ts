import { Channel } from "amqp-connection-manager";
import { RMQ_QUEUE_EMAIL_VERIFICATION } from "./rabbitmq-config.js";
import { rmqConnection } from "./rabbitmq.provider.js";
import { emailVerificationEventHandler } from "../../services/event-handlers.service.js";

export function rmqSetupConsumers() {
  createConsumer(RMQ_QUEUE_EMAIL_VERIFICATION, emailVerificationEventHandler);
}

function createConsumer(queueName: string, handler: any) {
  const channelWrapper = rmqConnection.createChannel({
    json: true,
    setup: async (channel: Channel) => {
      await channel.consume(
        queueName,
        async (event) => {
          if (!event) return;

          try {
            const eventPayload = JSON.parse(event.content.toString());

            await handler(eventPayload, event.properties.appId);

            console.log(`[✅] Processed and acknowledged message from ${queueName}`);
          } catch (error) {
            console.error(`[❌] Failed to process message from ${queueName}:`, error);
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
