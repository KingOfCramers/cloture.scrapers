import puppeteer from "puppeteer";
import Bull from "bull";
import { setupPuppeteer, pickScraper } from "./util";
import { Queue, JobOptions } from "bull";
import { Committee } from "../index";
import { house_job } from "../jobs/house";
import { senate_job } from "../jobs/senate";
import { houseCommittees, senateCommittees } from "../../statics";

export interface result {
  data: Committee[];
  meta: { committee: string; collection: string };
}

export const consumers = (queue: Queue): void => {
  setupPuppeteer({ kind: null })
    .then((browser: puppeteer.Browser) => {
      // Accept the data from our producer.
      // Use that data in the puppeteer instance
      queue.process(
        "*",
        async (job: Bull.Job): Promise<result> => {
          const data: house_job | senate_job = job.data;
          try {
            const scraper = pickScraper(data.details.version);
            console.log(`${job.id} running for ${job.name}`);
            const results = await scraper(browser, data);
            console.log(`${job.id} finished for ${job.name}`);
            console.log("RESULTS WERE ", results);

            return {
              data: [
                {
                  link: "https://faker.com",
                  title: "Fake",
                  date: new Date(),
                },
              ],
              meta: { committee: data.committee, collection: data.collection },
            };
            //// Return the data and the job's meta-information to the listener for parsing
            //return {
            //data: results.map((job: ) => {
            //job.committee = job.committee;
            //return job;
            //}),
            //meta: job,
            //};
          } catch (err) {
            let oldPages = await browser.pages();
            await Promise.all(
              oldPages.map(async (page, i) => i > 0 && (await page.close()))
            );
            console.error(`${job.id} for ${job.name} errored: `, err);
            return err;
          }
        }
      );
    })
    .catch((err) => {
      console.error("There was an error with the processor. ", err);
      process.exit(1);
    });
};
