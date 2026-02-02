import * as cron from "node-cron";

// Define the type for the job wrapper
interface JobWrapper {
  name: string;
  cronExpression: string;
  task: cron.TaskFn;
  job: cron.ScheduledTask;
  options?: cron.TaskOptions;
}

// 1. State Storage
// We create the Map here to act as the "instance" state.
const jobs = new Map<string, JobWrapper>();

// Internal helper to create the job object
const initializeJob = (
  name: string,
  cronExpression: string,
  task: cron.TaskFn,
  options: cron.TaskOptions,
): JobWrapper => {
  const job = cron.createTask(cronExpression, task, options);

  return { name, cronExpression, task, job, options };
};

// 2. Functions

/**
 * Add a cron job to the manager
 */
export const addJob = (
  name: string,
  cronExpression: string,
  task: cron.TaskFn,
  startOnInit = true,
  options: cron.TaskOptions = {},
): void => {
  if (jobs.has(name)) {
    throw new Error(`Job with name '${name}' already exists`);
  }

  const jobWrapper = initializeJob(name, cronExpression, task, options);
  jobs.set(name, jobWrapper);
  if (startOnInit) jobWrapper.job.start();
};

/**
 * Find a job by name
 */
export const findJob = (name: string): JobWrapper | null => {
  return jobs.get(name) || null;
};

/**
 * Start a job by name
 */
export const startJob = (name: string): boolean => {
  const jobWrapper = jobs.get(name);
  if (!jobWrapper) {
    return false;
  }

  jobWrapper.job.start();
  return true;
};

/**
 * Start all jobs
 */
export const startAllJobs = (): void => {
  jobs.forEach((jobWrapper) => {
    jobWrapper.job.start();
  });
};

/**
 * Stop a job by name
 */
export const stopJob = (name: string): boolean => {
  const jobWrapper = jobs.get(name);
  if (!jobWrapper) {
    return false;
  }

  jobWrapper.job.stop();
  return true;
};

/**
 * Stop all jobs
 */
export const stopAllJobs = (): void => {
  jobs.forEach((jobWrapper) => {
    jobWrapper.job.stop();
  });
};

/**
 * Pause a job by name (alias for stop)
 */
export const pauseJob = (name: string): boolean => {
  return stopJob(name);
};

/**
 * Remove a job by name
 */
export const removeJob = (name: string): boolean => {
  const jobWrapper = jobs.get(name);
  if (!jobWrapper) {
    return false;
  }

  jobWrapper.job.stop();
  jobWrapper.job.destroy();
  jobs.delete(name);
  return true;
};

/**
 * Get all job names
 */
export const getJobNames = (): string[] => {
  return Array.from(jobs.keys());
};

/**
 * Get all jobs
 */
export const getAllJobs = (): JobWrapper[] => {
  return Array.from(jobs.values());
};
