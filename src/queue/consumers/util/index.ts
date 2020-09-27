import puppeteer from "puppeteer";

// Import the routines
import {
  puppeteerv1,
  puppeteerv2,
  puppeteerv3,
  puppeteerv4,
  puppeteerv5,
  puppeteerv6,
} from "../scrapers";

// This function only runs once and sets up our puppeteer browser.
// We could run the proxy through tor or proxy in production
export const setupPuppeteer = async (initVals: {
  kind: string | null;
}): Promise<puppeteer.Browser> => {
  // Set initial variables
  let proxy = null;
  const args = ["--no-sandbox", "--unlimited-storage"];

  const isTor = initVals.kind === "tor";
  const isProxy = initVals.kind === "proxy";

  //if (!isTor && !isProxy && process.env.NODE_ENV === "production") {
  //throw new Error(
  //"Incorrect kind passed to puppeteer, should be 'tor' or 'proxy', provided " +
  //initVals.kind
  //);
  //}

  ///// Initialize Browser
  const browser = await puppeteer.launch({
    headless:
      process.env.NODE_ENV === "production" || process.env.HEADLESS === "true",
    defaultViewport: null,
    devtools: process.env.NODE_ENV !== "production",
    args,
  });

  browser.on("disconnected", () => {
    console.log("Browser was disconnected.");
  });

  console.log("Configured puppeteer.");

  return browser;
};

export const pickScraper = (kind: string) =>
  ((kind) => {
    switch (kind) {
      case "puppeteerv1" || "puppeteerv1.1":
        return puppeteerv1;
      case "puppeteerv2":
        return puppeteerv2;
      case "puppeteerv3":
        return puppeteerv3;
      case "puppeteerv4":
        return puppeteerv4;
      case "puppeteerv5":
        return puppeteerv5;
      case "puppeteerv6":
        return puppeteerv6;
      default:
        throw new Error("That routine doesn't exist!");
    }
  })(kind);
