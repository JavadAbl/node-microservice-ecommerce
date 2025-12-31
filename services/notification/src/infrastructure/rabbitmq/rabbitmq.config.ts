import { Channel } from "amqplib";

export const RMQ_EXCHANGE = "Events";
export const RMQ_QUEUE_EMAIL = "notification_email";
export const RMQ_RK_EMAIL = "notification_email";

export async function configRabbitMQ(channel: Channel) {
  await channel.assertExchange(RMQ_EXCHANGE, "direct", { durable: true });
  await channel.assertQueue(RMQ_QUEUE_EMAIL, { durable: true });
  await channel.bindQueue(RMQ_QUEUE_EMAIL, RMQ_EXCHANGE, RMQ_RK_EMAIL);
}
