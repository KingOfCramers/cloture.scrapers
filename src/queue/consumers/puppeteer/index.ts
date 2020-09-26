import puppeteer from "puppeteer";

export const setupPuppeteer = async (initVals: {
  kind: string | null;
}): Promise<puppeteer.Browser> => {
  // Set initial variables
  let proxy = null;
  const args = ["--no-sandbox", "--unlimited-storage"];

  const isTor = initVals.kind === "tor";
  const isProxy = initVals.kind === "proxy";

  if (!isTor && !isProxy && process.env.NODE_ENV === "production") {
    throw new Error(
      "Incorrect kind passed to puppeteer, should be 'tor' or 'proxy', provided " +
        initVals.kind
    );
  }

  ///// Initialize Browser
  const browser = await puppeteer.launch({
    headless: process.env.NODE_ENV === "production",
    defaultViewport: null,
    devtools: process.env.NODE_ENV !== "production",
    args,
  });

  browser.on("disconnected", () => {
    console.log("Browser was disconnected.");
  });

  console.log(
    `Configured through site ${isTor || isProxy ? proxy : "locally."}`
  );

  return browser;
};
