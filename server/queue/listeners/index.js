import { logger } from "../../loggers/winston";
import { pickModel } from "../../mongodb/util";

let dummyData = [
  {
    title: "Assessing U.S. Security Assistance to Mexico",
    date: "February 13, 2020",
    time: "9:00 AM",
    location: "2172 Rayburn",
    witnesses: [
      "Mr. Hugo Rodriguez",
      "Mr. Richard Glenn",
      "Ms. Barbara Feinstein",
    ],
  },
  {
    title:
      "The Middle East Peace Process: An Analysis from Former U.S. Negotiators",
    date: "February 12, 2020",
    time: "9:30 AM",
    location: "2172 Rayburn",
    witnesses: [
      "Mr. Frank Lowenstein",
      "The Honorable Mara Rudman",
      "Mr. Michael Singh",
    ],
  },
  {
    title:
      "The Wuhan Coronavirus: Assessing the Outbreak, the Response, and Regional Implications",
    date: "February 5, 2020",
    time: "2:00 PM",
    location: "2172 Rayburn",
    witnesses: [
      "Jennifer Nuzzo, Ph.D.",
      "Jennifer Bouey, Ph.D.",
      "Mr. Ron Klain",
    ],
  },
];

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
      let promisedInserts = data.map(async (datum) =>
        model.findOneAndUpdate({ title: datum.title }, datum, {
          upsert: true,
          new: true,
          runValidators: true,
        })
      );

      await Promise.all(promisedInserts);
      logger.info(`${job} added/modified ${promisedInserts.length} values.`);
    } catch (err) {
      throw new Error(`${job} could not insert documents into MongoDB.`);
    }
  });

  queue.on("global:active", (job) => {
    logger.info(`${job} has started.`); // (${job.data.name}) has started.`);
  });

  queue.on("global:completed", (job) => {
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
