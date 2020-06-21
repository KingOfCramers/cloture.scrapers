import { logger } from "../../loggers/winston";
import moment from "moment";
import { houseCommittee, senateCommittee } from "../../mongodb/models";
import { insertData, stripWhiteSpace, cleanDateTime } from "./helpers";

export const setupListeners = async (queue) => {
  queue.on("global:completed", async (job, result) => {
    let { data, meta } = JSON.parse(result);

    if (!data || !meta) {
      logger.error(`${job} failed to return data or meta information`);
    }

    let model =
      meta.collection === "houseCommittee" ? houseCommittee : senateCommittee;

    if (!model) {
      logger.error(
        `${job} could not find model, tried to find: ${meta.collection}`
      );
    }

    try {
      let strippedData = stripWhiteSpace(data);
      let cleanedData = cleanDateTime(meta, strippedData);
      let promisedInserts = insertData(model, cleanedData);
      await Promise.all(promisedInserts);

      logger.info(`${job} has completed [${meta.name}]`);
    } catch (err) {
      logger.error(`${job} could not insert documents into MongoDB: `, err);
    }
  });

  queue.on("global:active", (job) => {
    logger.info(`${job} has started`); // (${job.data.name}) has started`);
  });

  queue.on("global:stalled", (job) => {
    logger.error(`${job} has stalled`);
    // A job has been marked as stalled. This is useful for debugging job workers that crash or pause the event loop.
  });

  queue.on("global:failed", (job, err) => {
    logger.error(`${job} failed. `, err);
  });

  queue.on("global:error", (err) => {
    logger.error("The queue experienced an error. ", err);
  });
};
