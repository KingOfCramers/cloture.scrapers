import Bull from "bull";

import { logger } from "../loggers/winston";

import { setupProducers } from "./producers";
import { setupListeners } from "./listeners";

const jobs = [
  {
    data: {
      collection: "hfac",
      link: "https://foreignaffairs.house.gov/hearings",
      selectors: {
        layerOne: {
          rows: "table tbody tr",
          dateSelector: "td.recordListDate",
          dateFormat: "MM/DD/YYYY",
        },
        layerTwo: {
          title: ".title",
          date: "span.date",
          time: "span.time",
          location: "span.location strong",
          witnesses: "div.witnesses strong",
        },
      },
    },
    schedule: { type: "every", value: 2000 },
  },
  //{
  //data: { collection: "hvac", foo: "bar2" },
  //schedule: { type: "cron", value: "* * * * *" },
  //},
];

export const setupQueue = async () => {
  try {
    var myQueue = new Bull("myQueue", {
      redis: {
        port: process.env.REDIS_PORT,
        host: process.env.REDIS_URL,
        password: process.env.REDIS_PASSWORD,
      },
    });
    logger.info("Created new queue.");
  } catch (err) {
    logger.error("Could not create queue.");
    throw err;
  }

  try {
    await setupProducers(myQueue, jobs);
  } catch (err) {
    logger.error("Could not setup producers.");
    throw err;
  }

  // Setup consumers elsewhere for scalability

  try {
    await setupListeners(myQueue);
  } catch (err) {
    logger.error("Could not setup listeners");
    throw err;
  }
};
