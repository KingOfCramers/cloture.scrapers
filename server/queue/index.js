import Bull from "bull";

import { logger } from "../loggers/winston";

import { setupProducers } from "./producers";
import { setupListeners } from "./listeners";

// Different job types
import houseCommitteeJobs from "./jobs/houseCommitteeJobs";
import senateCommitteeJobs from "./jobs/senateCommitteeJobs";
import unlimitedHouse from "./jobs/unlimitedHouse";
import unlimitedSenate from "./jobs/unlimitedSenate";

export const setupQueue = async () => {
  try {
    var queue = new Bull("myQueue", {
      redis: {
        port: process.env.REDIS_PORT,
        host: process.env.REDIS_URL,
        password: process.env.REDIS_PASSWORD,
      },
    });
    logger.info(
      `Created new queue with ${
        process.env.NICE ? parseInt(process.env.NICE) : "no"
      } delay`
    );
  } catch (err) {
    logger.error("Could not create queue.");
    throw err;
  }

  try {
    await setupProducers(
      queue,
      process.env.SCRAPE === "true"
        ? [...unlimitedHouse] // [...unlimitedSenate, ...unlimitedHouse]
        : [...senateCommitteeJobs, ...houseCommitteeJobs]
    );
  } catch (err) {
    logger.error("Could not setup producers.");
    throw err;
  }

  // Setup consumers elsewhere for scalability

  try {
    await setupListeners(queue);
  } catch (err) {
    logger.error("Could not setup listeners");
    throw err;
  }
};
