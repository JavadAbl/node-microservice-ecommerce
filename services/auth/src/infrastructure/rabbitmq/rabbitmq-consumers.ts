import { Channel } from "amqp-connection-manager";
import { rmqConnection } from "./rabbitmq-provider.js";
import { RmqEventHandler, rmqInboxEventHandler } from "./rabbitmq-handlers.js";


export function rmqSetupConsumers() {
  //Customer
 // createConsumer(RMQ_QUEUE_CUSTOMER_CREATE, RMQ_RK_CUSTOMER_CREATE, rmqInboxEventHandler);

}

function createConsumer(queueName: string, routingKey: string, handler: RmqEventHandler) {
  const channelWrapper = rmqConnection.createChannel({
    json: false,
    setup: async (channel: Channel) => {
      await channel.consume(
        queueName,
        async (event) => {
          if (!event) return;

          try {
            const eventPayload = event.content?.toString("utf8");

            await handler(eventPayload, queueName, event.properties.appId, routingKey);
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
