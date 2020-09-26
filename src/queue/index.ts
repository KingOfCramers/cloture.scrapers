import Bull from "bull";

import { setupProducers } from "./producers";
import { setupListeners } from "./listeners";

// Import different jobs
import { house, senate } from "./jobs";

export const setupQueue = async () => {
  // Create an instance of the Bull queue: https://github.com/OptimalBits/bull
  try {
    var queue = new Bull("myQueue", {
      redis: {
        port: parseInt(process.env.REDIS_PORT as string),
        host: process.env.REDIS_URL,
        password: process.env.REDIS_PASSWORD,
      },
    });
  } catch (err) {
    console.error("Could not create queue.");
    throw err;
  }

  // Creates jobs by attaching them to queue. If in "scrape" mode, will set jobs w/out restrictions and will run immediately
  try {
    await setupProducers(queue, [...senate, ...house]);
  } catch (err) {
    console.error("Could not setup producers.");
    throw err;
  }

  // Set up listeners. These listeners will accept and process the strings supplied through REDIS by the processors.
  try {
    await setupListeners(queue);
  } catch (err) {
    console.error("Could not setup listeners");
    throw err;
  }
};
