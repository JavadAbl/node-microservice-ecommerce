import { prisma } from "../infrastructure/database/prisma.provider.js";
import { RMQ_QUEUE_EMAIL_VERIFICATION } from "../infrastructure/rabbitmq/rabbitmq-config.js";

export function emailVerificationEventHandler(payload: any, serviceName: string) {
  return prisma.eventInbox.create({ data: { queue: RMQ_QUEUE_EMAIL_VERIFICATION, payload, serviceName } });
}
