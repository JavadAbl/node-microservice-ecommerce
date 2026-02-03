import Queue from "bee-queue";
import { InboxEvent } from "../database/generated/prisma/client.js";
import { prisma } from "../database/prisma-provider.js";

export async function queueCustomerCreateHandler(job: Queue.Job<InboxEvent>) {
  const { payload, id } = job.data;
  try {
    await serviceEmailVerificationSend(payload as EmailVerification);
    await prisma.inboxEvent.update({ where: { id }, data: { status: "Handled", handledAt: new Date() } });
  } catch (error) {
    console.error(error);
    await prisma.inboxEvent.update({ where: { id }, data: { status: "Error" } });
  }
}

export async function queueServiceCreateHandler(job: Queue.Job<InboxEvent>) {
  const { payload, id } = job.data;
  try {
    await serviceEmailWelcomeSend(payload as EmailWelcome);
    await prisma.inboxEvent.update({ where: { id }, data: { status: "Handled", handledAt: new Date() } });
  } catch (error) {
    console.error(error);
    await prisma.inboxEvent.update({ where: { id }, data: { status: "Error" } });
  }
}
