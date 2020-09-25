import { houseCommittee, senateCommittee } from "../../mongodb/models";
import { insertData, cleanDateTime, stripWhiteSpace } from "./helpers";

export const setupListeners = async (queue) => {
  queue.on("global:completed", async (job, result) => {
    let { data, meta } = JSON.parse(result);

    if (!data || !meta) {
      console.error(`${job} failed to return data or meta information`);
    }

    let model =
      meta.collection === "houseCommittee" ? houseCommittee : senateCommittee;

    if (!model) {
      console.error(
        `${job} could not find model, tried to find: ${meta.collection}`
      );
    }

    let strippedData;
    let cleanedDateAndTimeData;

    try {
      strippedData = stripWhiteSpace(data);
    } catch (err) {
      console.error(`${job} could not strip white space. `, err);
    }

    try {
      cleanedDateAndTimeData = cleanDateTime(strippedData);
    } catch (err) {
      console.error(`${job} could not cleanedDateAndTimeData. `, err);
    }

    try {
      let promisedInserts = insertData(model, cleanedDateAndTimeData);
      await Promise.all(promisedInserts);
    } catch (err) {
      console.error(`${job} could not insert data. `, err);
    }

    console.log(`${job} has completed [${meta.name}]`);
  });

  queue.on("global:active", (job) => {
    console.log(`${job} has started`); // (${job.data.name}) has started`);
  });

  queue.on("global:stalled", (job) => {
    console.error(`${job} has stalled`);
    // A job has been marked as stalled. This is useful for debugging job workers that crash or pause the event loop.
  });

  queue.on("global:failed", (job, err) => {
    console.error(`${job} failed. `, err);
  });

  queue.on("global:error", (err) => {
    console.error("The queue experienced an error. ", err);
  });
};
