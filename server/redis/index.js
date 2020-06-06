import util from "util";
import redis from "redis";
import { logger } from "../loggers/winston";

export const configureRedis = async () => {
  // Initial connection
  const client = redis.createClient({
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_URL,
    auth_pass: process.env.REDIS_PASSWORD || null,
  });

  // Configure promisify-ed methods
  //const hset = util.promisify(client.hset).bind(client);
  //const hget = util.promisify(client.hget).bind(client);
  const flusher = util.promisify(client.flushdb).bind(client);

  try {
    await flusher();
    //console.log("Run");
  } catch (err) {
    logger.error("Could not flush Redis cache.");
    throw err;
  }
};
