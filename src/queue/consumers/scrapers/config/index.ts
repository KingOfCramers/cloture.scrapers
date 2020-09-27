import path from "path";
import puppeteer from "puppeteer";
import fs from "fs";

export const setPageBlockers = async (page: puppeteer.Page) => {
  await page.setRequestInterception(true);
  const blockedResources = [
    "quantserve",
    "adzerk",
    "doubleclick",
    "adition",
    "exelator",
    "sharethrough",
    "twitter",
    "google-analytics",
    "fontawesome",
    "facebook",
    "analytics",
    "optimizely",
    "clicktale",
    "mixpanel",
    "zedo",
    "clicksor",
    "tiqcdn",
    "googlesyndication",
    "youtube",
  ];

  page.on("request", async (request) => {
    const url = request.url().toLowerCase();
    // const headers = request.headers();
    if (
      url.endsWith(".mp4") ||
      url.endsWith(".avi") ||
      url.endsWith(".flv") ||
      url.endsWith(".mov") ||
      url.endsWith(".wmv") ||
      ["image", "stylesheet", "media", "jpg", "png"].includes(
        request.resourceType()
      ) ||
      blockedResources.some((resource) => url.indexOf(resource) !== -1)
    ) {
      try {
        await request.abort();
      } catch (err) {
        if (err.message !== "Request is already handled!") {
          console.error(`Problem blocking resource from ${url}`);
        }
      }
    } else {
      try {
        await request.continue();
      } catch (err) {
        if (err.message !== "Request is already handled!") {
          console.error(`Problem blocking resource from ${url}`);
        }
      }
    }
  });
};

// Add personal functions to the page.
// These are then accessible within puppeteer. If not accessible, throw an error because scrapers won't work
export const setPageScripts = async (page: puppeteer.Page) => {
  let consumerFunctionsPath = path.resolve(__dirname, "./functions.js");
  let consumerFunctionsExist = fs.existsSync(consumerFunctionsPath);
  if (!consumerFunctionsExist) {
    console.error("Consumer or jQuery utility function files do not exist!");
    process.exit(1);
  } else {
    await page.addScriptTag({ path: consumerFunctionsPath }); // Uses path from CWD
  }
};
