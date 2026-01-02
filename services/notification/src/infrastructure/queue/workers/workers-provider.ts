import { registerEmailVerificationWorker } from "./email-verification-worker.js";

export function registerWorkers() {
  registerEmailVerificationWorker();
}
