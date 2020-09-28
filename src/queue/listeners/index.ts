import { Queue, JobOptions } from "bull";
import { houseCommittee, senateCommittee } from "../../mongodb/models";
import { insertData, cleanDateTime, stripWhiteSpace } from "./helpers";
import { result } from "../consumers";

// When a job finishes, this data will be obtained from Redis (passed there by the consumer).
// Take the data, parse it, and try to save it to the database on completion.
// The other listeners listen to the queue and log information about the status of jobs
export const listeners = async (queue: Queue) => {
  queue.on("global:completed", async (id: string, result: string) => {
    const { data, meta }: result = JSON.parse(result);

    let model =
      meta.collection === "houseCommittee" ? houseCommittee : senateCommittee;
    let committee = meta.committee;

    if (!model) {
      return console.error(
        `${id} could not find model, tried to find: ${meta.collection}`
      );
    }

    let cleanedDateAndTimeData = cleanDateTime(stripWhiteSpace(data));

    // Add the committee (from the metadata) onto the committee object and attempt to save
    try {
      let promisedInserts = insertData(
        model,
        cleanedDateAndTimeData.map((data) => ({
          ...data,
          committee,
        }))
      );
      await Promise.all(promisedInserts);
    } catch (err) {
      console.error(`${id} could not insert data. `, err);
    }
  });

  queue.on("global:active", (id) => {
    console.log(`${id} has started`);
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
