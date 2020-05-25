import { logger } from "../../loggers/winston";

export const setupListeners = async (queue) => {
  queue.on("global:completed", (job, result) => {
    // Check that shit against MongoDB
    let parsed = JSON.parse(result);
    // Get the current date
    let filtered = parsed.map((x) => x);

    // Filter out entries that are not upcoming (only those beyond the current date)
    // Get the model based on the job collection
    // Insert them into the database (w/ upsert === true, to modify changes)
  });

  queue.on("global:active", (job) => {
    console.log(job);
    logger.info(`${job} has started.`); // (${job.data.name}) has started.`);
  });

  queue.on("global:completed", (job) => {
    console.log(job);
    logger.info(`${job} has completed.`); // (${job.data.name}) has started.`);
  });

  queue.on("global:stalled", (job) => {
    logger.error(`${job} has stalled.`);
    // A job has been marked as stalled. This is useful for debugging job workers that crash or pause the event loop.
  });

  queue.on("global:failed", (job, err) => {
    logger.error(`${job} failed. `, err);
  });

  queue.on("global:error", (err) => {
    logger.error("The queue experienced an error. ", err);
  });
};
