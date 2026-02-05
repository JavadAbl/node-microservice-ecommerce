import Queue from "bee-queue";

export async function queueProduce(queue: Queue, data: any) {
  const job = queue.createJob(data);

  job
    .on("succeeded", (result) => {
      console.log(`Job ${job.id} completed with result:`, result);
    })
    .on("failed", (err) => {
      console.error(`Job ${job.id} failed with error:`, err.message);
    });

  await job.save();
}
