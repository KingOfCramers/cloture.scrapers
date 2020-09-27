import { Queue, JobOptions } from "bull";
import { houseCommittee, senateCommittee } from "../../mongodb/models";
import { insertData, cleanDateTime, stripWhiteSpace } from "./helpers";
import { result } from "../consumers";

export const listeners = async (queue: Queue) => {
  // When a job finishes, this data will be obtained from Redis.
  // Take the data, parse it, and try to save it to the database.
  queue.on("global:completed", async (id: string, result: string) => {
    const { data, meta }: result = JSON.parse(result);

    if (!data || !meta) {
      console.error(`${id} failed to return data or meta information`);
    }

    let model =
      meta.collection === "houseCommittee" ? houseCommittee : senateCommittee;

    if (!model) {
      console.error(
        `${id} could not find model, tried to find: ${meta.collection}`
      );
    }

    let cleanedDateAndTimeData = cleanDateTime(stripWhiteSpace(data));

    try {
      let promisedInserts = insertData(model, cleanedDateAndTimeData);
      await Promise.all(promisedInserts);
    } catch (err) {
      console.error(`${id} could not insert data. `, err);
    }
  });

  // Log information about the job.
  // The id points back to the unique job being processed.
  queue.on("global:active", (id) => {
    //console.log(`${id} has started`);
  });

  queue.on("global:stalled", (id) => {
    console.error(`${id} has stalled`);
  });

  queue.on("global:failed", (id, err) => {
    console.error(`${id} failed. `, err);
  });

  queue.on("global:error", (err) => {
    console.error("The queue experienced an error. ", err);
  });
};
