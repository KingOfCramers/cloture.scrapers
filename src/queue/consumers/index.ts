import puppeteer from "puppeteer";
import Bull from "bull";
import { setupPuppeteer } from "./puppeteer";
import { Queue, JobOptions } from "bull";
//import { pickScraper } from "./puppeteer";
import { Committee, jobType } from "../index";

export const setupConsumers = (queue: Queue): void => {
  setupPuppeteer({ kind: null })
    .then((browser: puppeteer.Browser) => {
      queue.process(
        "*",
        async (
          x: Bull.Job<{ data: Committee[]; meta: string }>
        ): Promise<{ data: Committee[]; meta: string }> => {
          return {
            data: [
              {
                link: "test_link",
                title: "test_title",
              },
            ],
            meta: "meta information",
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
