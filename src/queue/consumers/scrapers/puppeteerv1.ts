import puppeteer from "puppeteer";

// Import job types
import { house_job } from "../../jobs/house";
import { senate_job } from "../../jobs/senate";

// Import common functions for all scrapers and for page-specific logic
import { getPageData, getLinks } from "./common";
import {
  setPageBlockers,
  setPageScripts,
  setInitialPage,
  openNewPages,
} from "./configuration";

export const puppeteerv1 = async (
  browser: puppeteer.Browser,
  job: house_job | senate_job
) => {
  // Setup puppeteer page for the job
  const page: puppeteer.Page = await setInitialPage(browser, job.link);

  let links;
  let pages;
  let pageData;

  try {
    links = await getLinks({
      page,
      selectors: job.details.selectors.layerOne,
    });
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
