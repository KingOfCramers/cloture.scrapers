import { setupPuppeteer } from "./puppeteer";
//import { pickScraper } from "./scrapers";

export const setupConsumers = (queue) => {
  setupPuppeteer({ kind: null })
    .then((browser) => {
      queue.process("*", async (x) => {
        let job = x.data;
        try {
          const scraper = pickScraper(job.type);
          console.log(`${x.id} of ${job.type} running for ${job.name}`);
          const results = await scraper(browser, job, job.timestamp);
          console.log(`${x.id} of ${job.type} finished for ${job.name}`);

          // Return the data and the job's meta-information to the listener for parsing
          return {
            data: results.map((x) => {
              x.committee = job.committee;
              return x;
            }),
            meta: job,
          };
        } catch (err) {
          let oldPages = await browser.pages();
          await Promise.all(
            oldPages.map(async (page, i) => i > 0 && (await page.close()))
          );
          console.error(
            `${x.id} of ${job.type} for ${job.name} errored: `,
            err
          );
        }
      });
    })
    .catch((err) => {
      console.error("There was an error with the processor. ", err);
      process.exit(1);
    });
};
