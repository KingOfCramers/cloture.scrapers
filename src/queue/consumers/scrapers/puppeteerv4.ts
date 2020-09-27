import puppeteer from "puppeteer";
import randomUser from "random-useragent";

// Import job types
import { house_job } from "../../jobs/house";
import { senate_job } from "../../jobs/senate";

import { getLinksAndDataV4, getPageText } from "./common";
import { setPageScripts, setPageBlockers } from "./config";

export const puppeteerv4 = async (
  browser: puppeteer.Browser,
  job: house_job | senate_job
) => {
  let page;

  try {
    page = await browser.newPage();
    let userAgentString = randomUser.getRandom();
    await page.setUserAgent(userAgentString || "");
    await setPageBlockers(page);
    await page.goto(job.link);
    await setPageScripts(page);
  } catch (err) {
    console.error("Could not navigate to inital page. ", err);
    throw err;
  }

  let dataWithLinks;

  try {
    dataWithLinks = await getLinksAndDataV4({
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
        await page.goto(job.link);
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
