import { logger } from "../../loggers/winston";

export const every = async (queue, job) => {
  let every = job.schedule.value;
  const options = {
    repeat: { every }, // Repeat job every x milliseconds
    removeOnComplete: true, // Remove the job once it's completed.
    removeOnFail: true, // Remove the job if it fails
  };

  try {
    await queue.add(job.name, job, options);
    logger.info(
      `New job '${job.name}' recurring every ${every / 1000} seconds.`
    );
  } catch (err) {
    logger.info(`Could not schedule ${job.collection} every job`);
    throw err;
  }
};
export const cron = async (queue, job) => {
  let cron = job.schedule.value;
  const options = {
    repeat: { cron }, // Cron is a string like "45 15 * * *", means run every day at 3:45 pm
    removeOnComplete: true, // Remove the job once it's completed.
    removeOnFail: true, // Remove the job if it fails
  };

  try {
    await queue.add(job.name, job, options);
    logger.info(`Created job '${job.collection}' recurring at ${cron}.`);
  } catch (err) {
    logger.info(`Could not schedule ${job.collection} cron job`);
    throw err;
  }
};

export const setupProducers = async (queue, jobs) => {
  let producers = jobs.map(async (job) => {
    if (job.schedule.type === "cron") {
      await cron(queue, job);
    } else if (job.schedule.type === "every") {
      await every(queue, job);
    }
  });
  await Promise.all(producers);
  logger.info("All job producers created.");
};
