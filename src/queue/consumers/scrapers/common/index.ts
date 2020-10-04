import puppeteer from "puppeteer";
// EDIT -- How do we switch this to use our build/src folder instead? It should be build when running and src when dev
//import {
//makeArrayFromDocument,
//getFromText,
//getLink,
//getLinkText,
//getNextTextFromDocument,
//getTextFromDocument,
//getNthInstanceOfText,
//} from "../functions/src";

import { V1, V2, V3, V4, V5, V6, RowsAndDepth } from "../../../jobs/types";

interface linkArgs {
  page: puppeteer.Page;
  selectors: RowsAndDepth;
}

export const getLinksFiltered = async ({ page, selectors }: linkArgs) =>
  page.evaluate((selectors) => {
    let rows = makeArrayFromDocument(selectors.rows);
    const regexSelector = new RegExp(selectors.filter.keyword, "i");
    let filteredRows = rows.filter((row) => {
      let text = getFromText(row, selectors.filter.selector);
      if (text) {
        return !!text.match(regexSelector);
      }
      return false;
    });
    let links = filteredRows.map((x) => getLink(x));
    return links.filter((x, i) => i + 1 <= selectors.depth && x); // Only return pages w/in depth range, prevents overfetching w/ puppeteer (and where x !== null)
  }, selectors);

export const getLinks = async ({
  page,
  selectors,
}: linkArgs): Promise<(string | null)[]> =>
  page.evaluate((selectors: RowsAndDepth) => {
    debugger;
    let rows = makeArrayFromDocument(selectors.rows);
    let links = rows.map((x) => getLink(x));
    return links.filter((x, i) => i + 1 <= selectors.depth && x); // Only return pages w/in depth
  }, selectors);

export const getPageText = async (page: puppeteer.Page): Promise<string> =>
  page.evaluate(() => {
    return document.body.innerText.replace(/[\s,\t\,\n]+/g, " ");
  });

interface PageAndV2Selectors {
  page: puppeteer.Page;
  selectors: V2["selectors"]["layerOne"];
}
export const getLinksAndDatav2 = async ({
  page,
  selectors,
}: PageAndV2Selectors) =>
  page.evaluate((selectors: V2["selectors"]["layerOne"]) => {
    let rows = makeArrayFromDocument(selectors.rows);
    let filteredRows = rows
      .filter((x, i) => i + 1 <= selectors.depth)
      .map((x) => {
        let link = getLink(x);
        let title = getLinkText(x);
        let date;
        let time;
        let innerText = (x as HTMLElement).innerText.trim();
        let myTimeRegex = new RegExp(
          /((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp]\.?[Mm]\.?)?)/
        );
        let myDateRegex = new RegExp(/[0-9]{2}\/[0-9]{2}\/[0-9]{4}/, "gi");
        let isDate = innerText.match(myDateRegex);
        let isTime = innerText.match(myTimeRegex);
        if (isDate) {
          date = isDate[0];
        }

        if (isTime) {
          time = isTime[0];
        }

        return { link, title, date, time };
      });
    return filteredRows;
  }, selectors);

// The main function that runs to scrape data from every subpage
interface GetPageDataParams {
  pages: puppeteer.Page[];
  selectors: V1["selectors"]["layerTwo"];
}

export const getPageData = async ({ pages, selectors }: GetPageDataParams) =>
  await Promise.all(
    pages.map(async (page) =>
      page.evaluate((selectors: GetPageDataParams["selectors"]) => {
        let title = getTextFromDocument(selectors.title);
        if (selectors.titleTrimRegex) {
          let titleRegex = new RegExp(selectors.titleTrimRegex, "i");
          title && title.replace(titleRegex, "");
        }

        // If date is merely "true" then search by Regex
        if (typeof selectors.date === "boolean") {
          let myDateRegex = new RegExp(
            /(monday|tuesday|wednesday|thursday|friday|saturday|sunday)?,? ?(January|February|March|April|May|June|July|August|September|October|November|December) ([0-9][0-9]?),? \d\d\d\d/,
            "gi"
          );
          let isMatch = document.body.innerText.match(myDateRegex);
          var date = isMatch && isMatch[0];
        } else {
          // EDIT -- Something to do with labels here?
          var date = selectors.date.label
            ? getNextTextFromDocument(selectors.date.value)
            : getTextFromDocument(selectors.date.value);
        }

        if (selectors.location) {
          var location = selectors.location.label
            ? getNextTextFromDocument(selectors.location.value)
            : getTextFromDocument(selectors.location.value);
        } else {
          var location: string | null = null;
        }

        if (typeof selectors.time === "boolean") {
          let myTimeRegex = new RegExp(
            /((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp]\.?[Mm]\.?)?)/
          );
          let isMatch = document.body.innerText.match(myTimeRegex);
          var time = isMatch && isMatch[0];
        } else {
          var time = selectors.time.label
            ? getNextTextFromDocument(selectors.time.value)
            : getTextFromDocument(selectors.time.value);
        }

        let link = document.URL;
        let text = document.body.innerText.replace(/[\s,\t\,\n]+/g, " ");

        return {
          title,
          date,
          time,
          location,
          link,
          text,
        };
      }, selectors)
    )
  );

interface GetPageDataWithJQueryInterface {
  pages: puppeteer.Page[];
  selectors: V5["selectors"]["layerTwo"];
}
export const getPageDataWithJQuery = async ({
  pages,
  selectors,
}: GetPageDataWithJQueryInterface) =>
  Promise.all(
    pages.map(async (page) => {
      return page.evaluate(
        (selectors: GetPageDataWithJQueryInterface["selectors"]) => {
          let title = getTextFromDocument(selectors.title);
          let info = $(selectors.jquerySelector)
            .contents()[1]
            .textContent.split("\n")
            .map((x: string) => x.trim())
            .filter((x: string) => x !== "" && x !== "@" && x !== "0");
          let location =
            selectors.locationIndex === null
              ? null
              : info[selectors.locationIndex];
          let date =
            selectors.dateIndex === null ? null : info[selectors.dateIndex];
          let time =
            selectors.timeIndex === null ? null : info[selectors.timeIndex];
          let link = document.URL;
          let text = document.body.innerText.replace(/[\s,\t\,\n]+/g, " ");
          return {
            title,
            date,
            time,
            location,
            link,
            text,
          };
        },
        selectors
      );
    })
  );

export const getLinksAndData = async ({ page, selectors }: linkArgs) =>
  page.evaluate((selectors) => {
    let rows = makeArrayFromDocument(selectors.rows);
    return rows
      .filter((x, i) => i + 1 <= selectors.depth)
      .map((x) => {
        let link = getLink(x);
        let title = getLinkText(x);
        let location = getFromText(x, selectors.location);
        let date;
        let time;
        if (selectors.time) {
          time = getNthInstanceOfText(
            x,
            selectors.time.selector,
            selectors.time.instance
          );
        }
        if (selectors.date) {
          date = getNthInstanceOfText(
            x,
            selectors.date.selector,
            selectors.date.instance
          );
        }
        if (selectors.splitDate) {
          // If data includes splitDate...
          time = date && date.split(selectors.splitDate)[1];
          date = date && date.split(selectors.splitDate)[0];
        }
        return { link, title, location, date, time };
      });
  }, selectors);

// EDIT fix the selectors, dont use any
export const getLinksAndDataV4 = async ({ page, selectors }: linkArgs) =>
  page.evaluate((selectors) => {
    let rows: Element[] = Array.from(
      document
        .querySelector(selectors.upcomingHearings)
        .querySelectorAll(selectors.hearings)
    );
    return rows
      .filter((x, i) => i + 1 <= selectors.depth)
      .map((x) => {
        let link = getLink(x);
        let title = getLinkText(x);
        let dateAndTimeInfo = getFromText(x, selectors.dateTime)
          ?.split("-")
          .map((x: string) => x.trim());
        let date = dateAndTimeInfo && dateAndTimeInfo[0];
        let time = dateAndTimeInfo && dateAndTimeInfo[1];
        let location = getFromText(x, selectors.location);
        return { link, title, date, time, location };
      });
  }, selectors);
