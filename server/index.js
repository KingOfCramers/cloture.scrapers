import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: `./envs/.env.${process.env.NODE_ENV}` });

import { connect } from "./mongodb/connect";
import { configureRedis } from "./redis";
import { setupQueue } from "./queue";
import { logger } from "./loggers/winston";

const runServer = async () => {
  try {
    await connect();
    logger.info(`Connected to MongoDB at ${process.env.MONGODB_URI}.`);
  } catch (err) {
    logger.error(`Could not connect to MongoDB.`);
    throw err;
  }

  try {
    await configureRedis(); // Hoisted
    logger.info(
      `Connected to Redis at url ${process.env.REDIS_URL}, cache flushed.`
    );
  } catch (err) {
    logger.error("Could not connect to Redis.");
    throw err;
  }

  try {
    await setupQueue();
    logger.info(`Queue successfully established.`);
  } catch (err) {
    logger.error(`Could not setup queue.`);
    throw err;
  }
};

runServer()
  .then(() => logger.info("Setup successful."))
  .catch((err) => {
    logger.error("Something went wrong. ", err);
    process.exit(1);
  });
