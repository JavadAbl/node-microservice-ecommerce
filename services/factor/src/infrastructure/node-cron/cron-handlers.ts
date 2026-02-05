import { InboxEventStatus } from "../database/generated/prisma/enums.js";
import { prisma } from "../database/prisma-provider.js";
import { queueProduce } from "../queue/queue-producer.js";
import {
  queueEventCustomerCreate,
  queueEventCustomerUpdate,
  queueEventServiceCreate,
  queueEventServiceUpdate,
} from "../queue/queue-provider.js";
import {
  RMQ_QUEUE_CUSTOMER_CREATE,
  RMQ_QUEUE_CUSTOMER_UPDATE,
  RMQ_QUEUE_SERVICE_CREATE,
  RMQ_QUEUE_SERVICE_UPDATE,
} from "../rabbitmq/rabbitmq-config.js";

export async function cronInboxEventHandler() {
  const unhandledEvents = await prisma.inboxEvent.findMany({ where: { status: InboxEventStatus.PENDING } });

  for (const event of unhandledEvents) {
    switch (event.queue) {
      case RMQ_QUEUE_CUSTOMER_CREATE:
        queueProduce(queueEventCustomerCreate, event);
        break;

      case RMQ_QUEUE_CUSTOMER_UPDATE:
        queueProduce(queueEventCustomerUpdate, event);
        break;

      case RMQ_QUEUE_SERVICE_CREATE:
        queueProduce(queueEventServiceCreate, event);
        break;

      case RMQ_QUEUE_SERVICE_UPDATE:
        queueProduce(queueEventServiceUpdate, event);
        break;

      default:
        break;
    }
  }
}
