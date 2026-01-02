import { Channel } from "amqp-connection-manager";
import { RMQ_QUEUE_EMAIL_VERIFICATION } from "./rabbitmq-config.js";
import { rmqConnection } from "./rabbitmq-provider.js";
import { prisma } from "../database/prisma.provider.js";

export function rmqSetupConsumers() {
  createConsumer(RMQ_QUEUE_EMAIL_VERIFICATION, addToInboxEvent);
}

function createConsumer(queueName: string, handler: typeof addToInboxEvent) {
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

function addToInboxEvent(payload: any, queue: string, serviceName: string) {
  return prisma.inboxEvent.create({ data: { queue, payload, serviceName } });
}
