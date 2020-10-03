import randomUser from "random-useragent";
import puppeteer from "puppeteer";

import { getLinksAndData, getPageText, getLinks } from "./common";
import {
  setPageBlockers,
  setPageScripts,
  setInitialPage,
  openNewPages,
} from "./configuration";

// Import job types
import { HouseJob, SenateJob, V2 } from "../../jobs";

export const puppeteerv2 = async (
  browser: puppeteer.Browser,
  job: HouseJob<V2> | SenateJob<V2>
) => {
  const page: puppeteer.Page = await setInitialPage(browser, job.link);

  let dataWithLinks;

  try {
    dataWithLinks = await getLinksAndData({
      page,
      selectors: job.details.selectors.layerOne,
    });
  } catch (err) {
    console.error("Could not get links. ", err);
    throw err;
  }
  try {
    dataWithLinks = await Promise.all(
      dataWithLinks.map(async (datum: any) => {
        let page = await browser.newPage();
        await setPageBlockers(page);
        await page.goto(datum.link);
        await setPageScripts(page);
        let text = await getPageText(page);
        return { ...datum, text };
      })
    );
  } catch (err) {
    console.error("Could not get page text. ", err);
  }

  try {
    let pages = await browser.pages();
    await Promise.all(
      pages.map(async (page, i) => i > 0 && (await page.close()))
    );
  } catch (err) {
    console.error("Could not close pages. ", err);
    throw err;
  }

  return dataWithLinks;
};
