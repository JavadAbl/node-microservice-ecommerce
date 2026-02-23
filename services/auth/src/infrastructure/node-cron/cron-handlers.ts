import { InboxEventStatus } from "../database/generated/prisma/enums.js";
import { prisma } from "../database/prisma-provider.js";
import { queueProduce } from "../queue/queue-producer.js";

export async function cronInboxEventHandler() {
  const unhandledEvents = await prisma.inboxEvent.findMany({ where: { status: InboxEventStatus.PENDING } });

  for (const event of unhandledEvents) {
    switch (event.queue) {
      default:
        break;
    }
  }
}
