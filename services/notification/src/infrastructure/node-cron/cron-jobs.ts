import { CronExpression } from "./cron-expression.js";
import { JOB_EVENT_INBOX } from "./cron-config.js";
import { addJob } from "./cron-provider.js";
import { cronInboxEventHandler } from "./cron-handlers.js";

export function cronSetupJobs() {
  addJob(JOB_EVENT_INBOX, CronExpression.EVERY_10_SECONDS, cronInboxEventHandler);
}
