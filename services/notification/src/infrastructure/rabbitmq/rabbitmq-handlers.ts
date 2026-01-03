import { prisma } from "../database/prisma-provider.js";

export type EventHandler = (payload: any, queue: string, serviceName: string) => any;

export function rmqInboxEventHandler(payload: any, queue: string, serviceName: string) {
  return prisma.inboxEvent.create({ data: { queue, payload, serviceName } });
}
