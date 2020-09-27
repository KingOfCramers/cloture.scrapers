import puppeteer from "puppeteer";
import randomUser from "random-useragent";

// Import job types
import { house_job } from "../../jobs/house";
import { senate_job } from "../../jobs/senate";

import {
  getPageData,
  getLinksFiltered,
  openNewPages,
  setPageBlockers,
  setPageScripts,
} from "./internals";

export const puppeteerv6 = async (
  browser: puppeteer.Browser,
  job: house_job | senate_job
) => {
  // Setup puppeteer page for the job
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

  let links;
  let pages;
  let pageData;

  try {
    links = await getLinksFiltered({
      page,
      selectors: job.details.selectors.layerOne,
    });
    console.log(links);
  } catch (err) {
    console.error("Could not get links. ", err);
    throw err;
  }

  try {
    pages = await openNewPages(browser, links);
  } catch (err) {
    console.error("Could not navigate to pages. ", err);
    throw err;
  }

  try {
    pageData = await getPageData({
      pages,
      selectors: job.details.selectors.layerTwo,
    });
  } catch (err) {
    console.error("Could not get pageData. ", err);
    throw err;
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

  return pageData;
};
