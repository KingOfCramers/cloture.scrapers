import puppeteer from "puppeteer";
import Bull from "bull";
import { setupPuppeteer } from "./puppeteer";
import { Queue, JobOptions } from "bull";
//import { pickScraper } from "./puppeteer";
import { Committee } from "../index";
import { house_job } from "../jobs/house";
import { senate_job } from "../jobs/senate";
import { houseCommittees, senateCommittees } from "../../statics";

export interface result {
  data: Committee[];
  meta: { committee: string; collection: string };
}

export const setupConsumers = (queue: Queue): void => {
  setupPuppeteer({ kind: null })
    .then((browser: puppeteer.Browser) => {
      // Accept the data from our producer.
      // Use that data in the puppeteer instance
      queue.process(
        "*",
        async (x: Bull.Job): Promise<result> => {
          const data: house_job | senate_job = x.data;
          console.log("Value inside the job consumer ", data);
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
          //try {
          //const scraper = pickScraper(job.type);
          //console.log(`${x.id} of ${job.type} running for ${job.name}`);
          //const results = await scraper(browser, job, job.timestamp);
          //console.log(`${x.id} of ${job.type} finished for ${job.name}`);

          //// Return the data and the job's meta-information to the listener for parsing
          //return {
          //data: results.map((x: ) => {
          //x.committee = job.committee;
          //return x;
          //}),
          //meta: job,
          //};
          //} catch (err) {
          //let oldPages = await browser.pages();
          //await Promise.all(
          //oldPages.map(async (page, i) => i > 0 && (await page.close()))
          //);
          //console.error(
          //`${x.id} of ${job.type} for ${job.name} errored: `,
          //err
          //);
          //}
        }
      );
    })
    .catch((err) => {
      console.error("There was an error with the processor. ", err);
      process.exit(1);
    });
};
