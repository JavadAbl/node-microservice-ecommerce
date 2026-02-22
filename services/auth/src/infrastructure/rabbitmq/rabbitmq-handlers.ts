import { prisma } from "../database/prisma-provider.js";

export type RmqEventHandler = (payload: any, queue: string, serviceName: string, routingKey: string) => any;

export function rmqInboxEventHandler(payload: any, queue: string, serviceName: string, routingKey: string) {
  return prisma.inboxEvent.create({ data: { queue, payload, serviceName, routingKey } });
}
