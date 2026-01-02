import { InboxEventStatus } from "../database/generated/prisma/enums.js";
import { prisma } from "../database/prisma.provider.js";

export async function eventInboxCronHandler() {
  const unhandledEvents = await prisma.inboxEvent.findMany({ where: { status: InboxEventStatus.PENDING } });
}
