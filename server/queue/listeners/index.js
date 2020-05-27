import { logger } from "../../loggers/winston";
import { pickModel } from "../../mongodb/util";
import { calculateResults, insertData } from "./helpers";

export const setupListeners = async (queue) => {
  queue.on("global:completed", async (job, result) => {
    let { data, meta } = JSON.parse(result);

    if (!data || !meta) {
      throw new Error(`${job} returned null field.`);
    }

    let collection = meta.collection;
    let model = pickModel(collection);

    if (!model) {
      throw new Error(`${job} could not find schema, tried ${collection}`);
    }

    try {
      // See: https://silvantroxler.ch/2016/insert-or-update-with-mongodb-and-mongoose/
      let promisedInserts = insertData(model, data);
      let results = await Promise.all(promisedInserts);
      await calculateResults(job, results);

      logger.info(`${job} has completed.`);
    } catch (err) {
      throw new Error(`${job} could not insert documents into MongoDB.`);
    }
  });

  queue.on("global:active", (job) => {
    logger.info(`${job} has started.`); // (${job.data.name}) has started.`);
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
