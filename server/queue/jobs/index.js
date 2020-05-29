export default [
  //{
  //data: {
  //type: "puppeteerv1", // Scraping routine
  //collection: "hfac", // MongoDB collection
  //name: "House Foreign Affairs Committee Hearings", // Stored in Redis, must be unique
  //link: "https://foreignaffairs.house.gov/hearings", // Initial Link
  //selectors: {
  //// Scrapers used in the routine
  //layerOne: {
  //depth: 5, // Max number of rows checked
  //rows: "table tbody tr",
  //dateSelector: "td.recordListDate",
  //dateFormat: "MM/DD/YYYY",
  //},
  //layerTwo: {
  //title: ".title",
  //date: "span.date",
  //time: "span.time",
  //location: "span.location strong",
  //witnesses: "div.witnesses strong",
  //},
  //},
  //},
  //schedule: { type: "every", value: 2000 },
  //},
  //{
  //data: {
  //type: "puppeteerv1",
  //collection: "hfac",
  //name: "House Foreign Affairs Committee Markups",
  //link: "https://foreignaffairs.house.gov/markups",
  //selectors: {
  //layerOne: {
  //depth: 1,
  //rows: "table tbody tr",
  //dateSelector: "td.recordListDate",
  //dateFormat: "MM/DD/YYYY",
  //},
  //layerTwo: {
  //title: ".title",
  //date: "span.date",
  //time: "span.time",
  //location: "span.location strong",
  //witnesses: "div.witnesses strong",
  //},
  //},
  //},
  //schedule: { type: "every", value: 2000 },
  //},
  //{
  //data: {
  //type: "puppeteerv1",
  //collection: "hasc",
  //name: "House Armed Services Committee",
  //link: "https://armedservices.house.gov/hearings",
  //selectors: {
  //layerOne: {
  //depth: 5,
  //rows: "table tbody tr",
  //dateSelector: "td.recordListDate",
  //dateFormat: "MM/DD/YYYY",
  //},
  //layerTwo: {
  //title: ".title",
  //date: "span.date:first-of-type",
  //},
  //},
  //},
  //schedule: { type: "every", value: 2000 },
  //},
  //{
  //data: {
  //type: "puppeteerv2", // This version is best when the second page is un-parseable due to shitty HTML
  //collection: "hvac",
  //name: "House Veterans Affairs Committee Hearings",
  //link: "https://veterans.house.gov/events/hearings",
  //selectors: {
  //layerOne: {
  //depth: 5,
  //rows: "tr.vevent",
  //date: "time.dtstart",
  //time: "time.dtstart",
  //location: "span.location",
  //dateFormat: "MMM D",
  //},
  //},
  //},
  //schedule: { type: "every", value: 2000 },
  //},
  //{
  //data: {
  //type: "puppeteerv2", // This version is best when the second page is un-parseable due to shitty HTML
  //collection: "hvac",
  //name: "House Veterans Affairs Committee Markups",
  //link: "https://veterans.house.gov/events/markups",
  //selectors: {
  //layerOne: {
  //depth: 5,
  //rows: "tr.vevent",
  //date: "time.dtstart",
  //time: "time.dtstart",
  //location: "span.location",
  //dateFormat: "MMM D",
  //},
  //},
  //},
  //schedule: { type: "every", value: 2000 },
  //},
  //{
  //data: {
  //type: "puppeteerv2", // This version is best when the second page is un-parseable due to shitty HTML
  //collection: "hhsc",
  //name: "House Homeland Security Committee Hearings",
  //link: "http://homeland.house.gov/activities/hearings",
  //selectors: {
  //layerOne: {
  //depth: 5,
  //rows: "tr.vevent",
  //date: "time.dtstart",
  //time: "time.dtstart",
  //location: "span.location",
  //dateFormat: "MMM DD YYYY",
  //},
  //},
  //},
  //schedule: { type: "every", value: 2000 },
  //},
  //{
  //data: {
  //type: "puppeteerv2", // This version is best when the second page is un-parseable due to shitty HTML
  //collection: "hhsc",
  //name: "House Homeland Security Committee Markups",
  //link: "http://homeland.house.gov/activities/markups",
  //selectors: {
  //layerOne: {
  //depth: 5,
  //rows: "tr.vevent",
  //date: "time.dtstart",
  //time: "time.dtstart",
  //location: "span.location",
  //dateFormat: "MMM DD YYYY",
  //},
  //},
  //},
  //schedule: { type: "every", value: 2000 },
  //},
  //{
  //data: {
  //type: "puppeteerv3", // This version is best when the second page is un-parseable due to shitty HTML
  //collection: "hagc",
  //name: "House Agriculture Committee Hearings",
  //link: "https://agriculture.house.gov/calendar/",
  //selectors: {
  //layerOne: {
  //depth: 5,
  //rows: "ul.calendar-listing li",
  //date: "div.newsie-details span:nth-child(1)",
  //time: "div.newsie-details span:nth-child(2)",
  //dateFormat: "MMMM DD, YYYY",
  //},
  //},
  //},
  //schedule: { type: "every", value: 2000 },
  //},
  //{
  //data: {
  //type: "puppeteerv4", // This version is best when the second page is un-parseable due to shitty HTML
  //collection: "hapc",
  //name: "House Appropriations Committee Hearings",
  //link: "https://appropriations.house.gov/events/hearings",
  //selectors: {
  //layerOne: {
  //depth: 5,
  //upcomingHearings: ".pane-content",
  //hearings: ".views-row",
  //dateTime: ".views-field-field-congress-meeting-date",
  //time: "div.newsie-details span:nth-child(2)",
  //dateFormat: "ddd, DD/MM/YYYY",
  //},
  //},
  //},
  //schedule: { type: "every", value: 2000 },
  //},
  {
    data: {
      type: "puppeteerv4", // This version is best when the second page is un-parseable due to shitty HTML
      collection: "hapc",
      name: "House Appropriations Committee Markups",
      link: "https://appropriations.house.gov/events/markups",
      selectors: {
        layerOne: {
          depth: 5,
          upcomingHearings: ".pane-content",
          hearings: ".views-row",
          dateTime: ".views-field-field-congress-meeting-date",
          time: "div.newsie-details span:nth-child(2)",
          dateFormat: "ddd, DD/MM/YYYY",
        },
      },
    },
    schedule: { type: "every", value: 2000 },
  },
];
