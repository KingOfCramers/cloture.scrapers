import { Queue, JobOptions } from "bull";
import { houseCommittee, senateCommittee } from "../../mongodb/models";
import { insertData, cleanDateTime, stripWhiteSpace } from "./helpers";
import { Committee, jobType } from "../index";

export const setupListeners = async (queue: Queue) => {
  queue.on("global:completed", async (job: string, result: string) => {
    const { data, meta }: jobType = JSON.parse(result);

    console.log("data is", data);
    console.log("meta is", meta);

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

    let cleanedDateAndTimeData = cleanDateTime(stripWhiteSpace(data));

    try {
      let promisedInserts = insertData(model, data);
      await Promise.all(promisedInserts);
    } catch (err) {
      console.error(`${job} could not insert data. `, err);
    }

    console.log(`${job} has completed [${meta.name}]`);
  });

  queue.on("global:active", (job) => {
    console.log(`${job} has started`);
  });

  queue.on("global:stalled", (job) => {
    console.error(`${job} has stalled`);
  });

  queue.on("global:failed", (job, err) => {
    console.error(`${job} failed. `, err);
  });

  queue.on("global:error", (err) => {
    console.error("The queue experienced an error. ", err);
  });
};
