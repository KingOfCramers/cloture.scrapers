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

  // Determine tor/proxy for browser
  //if (isTor) {
  //let ports = process.env.TOR_PORTS.split(",");
  //let portIndex = getRandom(0, ports.length - 1)();
  //let port = isProduction ? ports[portIndex] : "9050";
  //proxy = `socks5://127.0.0.1:` + port;
  //}

  //if (isProxy) {
  //let proxies = await getProxies();
  //let proxyIndex = getRandom(0, proxies.length - 1)();
  //proxy = proxies[proxyIndex];
  //}

  //if (isProxy || isTor) {
  //args.push(`--proxy-server=${proxy}`);
  //}

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

  /////// Page setup
  //const page = (await browser.pages())[0];
  //if (isTor) {
  //await page.goto("https://check.torproject.org/");
  //const isUsingTor = await page.$eval("body", (el) =>
  //el.innerHTML.includes(
  //"Congratulations. This browser is configured to use Tor"
  //)
  //);
  //if (!isUsingTor) {
  //logger.error(`Browser is not using Tor. Exiting...`);
  //return await browser.close();
  //}
  //}

  console.log(
    `Configured through site ${isTor || isProxy ? proxy : "locally."}`
  );

  return browser;
};
