import { logger } from "../../loggers/winston";

export const every = async (queue, data, every) => {
  const options = {
    repeat: { every }, // Repeat job every x milliseconds
    removeOnComplete: true, // Remove the job once it's completed.
    removeOnFail: true, // Remove the job if it fails
  };

  try {
    await queue.add(data.name, data, options);
    logger.info(
      `New job '${data.name}' recurring every ${every / 1000} seconds.`
    );
  } catch (err) {
    logger.info(`Could not schedule ${data.collection} every job`);
    throw err;
  }
};
export const cron = async (queue, data, cron) => {
  console.log(cron)
  const options = {
    repeat: { cron }, // Cron is a string like "45 15 * * *", means run every day at 3:45 pm
    removeOnComplete: true, // Remove the job once it's completed.
    removeOnFail: true, // Remove the job if it fails
  };

  try {
    await queue.add(data.name, data, options); // collection, { data }, options);
    logger.info(`Created job '${data.collection}' recurring at ${cron}.`);
  } catch (err) {
    logger.info(`Could not schedule ${data.collection} cron job`);
    throw err;
  }
};

export const setupProducers = async (queue, jobs) => {
  let producers = jobs.map(async ({ schedule, data }) => {
    if (schedule.type === "cron") {
      await cron(queue, data, schedule.value);
    } else if (schedule.type === "every") {
      await every(queue, data, schedule.value);
    }
  });
  await Promise.all(producers);
  logger.info("All job producers created.");
};
