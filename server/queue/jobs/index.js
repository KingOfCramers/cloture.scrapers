export default [
  {
    data: {
      type: "puppeteerv1", // Scraping routine
      collection: "hfac", // MongoDB collection
      name: "House Foreign Affairs Committee Hearings", // Stored in Redis, must be unique
      link: "https://foreignaffairs.house.gov/hearings", // Initial Link
      selectors: {
        // Scrapers used in the routine
        layerOne: {
          depth: 5, // Max number of rows checked
          rows: "table tbody tr",
          dateSelector: "td.recordListDate",
          dateFormat: "MM/DD/YYYY",
        },
        layerTwo: {
          title: ".title",
          date: "span.date",
          time: "span.time",
          location: "span.location strong",
          witnesses: "div.witnesses strong",
        },
      },
    },
    schedule: { type: "every", value: 2000 },
  },
  {
    data: {
      type: "puppeteerv1",
      collection: "hfac",
      name: "House Foreign Affairs Committee Markups",
      link: "https://foreignaffairs.house.gov/markups",
      selectors: {
        layerOne: {
          depth: 1,
          rows: "table tbody tr",
          dateSelector: "td.recordListDate",
          dateFormat: "MM/DD/YYYY",
        },
        layerTwo: {
          title: ".title",
          date: "span.date",
          time: "span.time",
          location: "span.location strong",
          witnesses: "div.witnesses strong",
        },
      },
    },
    schedule: { type: "every", value: 2000 },
  },
  {
    data: {
      type: "puppeteerv1",
      collection: "hasc",
      name: "House Armed Services Committee",
      link: "https://armedservices.house.gov/hearings",
      selectors: {
        layerOne: {
          depth: 5,
          rows: "table tbody tr",
          dateSelector: "td.recordListDate",
          dateFormat: "MM/DD/YYYY",
        },
        layerTwo: {
          title: ".title",
          date: "span.date:first-of-type",
        },
      },
    },
    schedule: { type: "every", value: 2000 },
  },
  {
    data: {
      type: "puppeteerv2", // This version is best when the second page is un-parseable due to shitty HTML
      collection: "hvac",
      name: "House Veterans Affairs Committee Hearings",
      link: "https://veterans.house.gov/events/hearings",
      selectors: {
        layerOne: {
          depth: 5,
          rows: "tr.vevent",
          date: "time.dtstart",
          time: { selector: "time.dtstart", instance: 1 },
          location: "span.location",
          dateFormat: "MMM D",
        },
      },
    },
    schedule: { type: "every", value: 2000 },
  },
  {
    data: {
      type: "puppeteerv2", // This version is best when the second page is un-parseable due to shitty HTML
      collection: "hvac",
      name: "House Veterans Affairs Committee Markups",
      link: "https://veterans.house.gov/events/markups",
      selectors: {
        layerOne: {
          depth: 5,
          rows: "tr.vevent",
          date: "time.dtstart",
          time: { selector: "time.dtstart", instance: 1 },
          location: "span.location",
          dateFormat: "MMM D",
        },
      },
    },
    schedule: { type: "every", value: 2000 },
  },
  {
    data: {
      type: "puppeteerv2", // This version is best when the second page is un-parseable due to shitty HTML
      collection: "hhsc",
      name: "House Homeland Security Committee Hearings",
      link: "http://homeland.house.gov/activities/hearings",
      selectors: {
        layerOne: {
          depth: 5,
          rows: "tr.vevent",
          date: "time.dtstart",
          time: { selector: "time.dtstart", instance: 1 },
          location: "span.location",
          dateFormat: "MMM DD YYYY",
        },
      },
    },
    schedule: { type: "every", value: 2000 },
  },
  {
    data: {
      type: "puppeteerv2", // This version is best when the second page is un-parseable due to shitty HTML
      collection: "hhsc",
      name: "House Homeland Security Committee Markups",
      link: "http://homeland.house.gov/activities/markups",
      selectors: {
        layerOne: {
          depth: 5,
          rows: "tr.vevent",
          date: "time.dtstart",
          time: { selector: "time.dtstart", instance: 1 },
          location: "span.location",
          dateFormat: "MMM DD YYYY",
        },
      },
    },
    schedule: { type: "every", value: 2000 },
  },
  {
    data: {
      type: "puppeteerv5",
      collection: "hagc",
      name: "House Agriculture Committee Hearings",
      link: "https://agriculture.house.gov/calendar/",
      selectors: {
        layerOne: {
          depth: 5,
          rows: "ul.calendar-listing li",
        },
        layerTwo: {
          title: "h3.news-titler",
          jquerySelector: ".topnewstext",
          locationIndex: null,
          dateIndex: 0,
          timeIndex: 1,
        },
      },
    },
    schedule: { type: "every", value: 2000 },
  },
  {
    data: {
      type: "puppeteerv4",
      collection: "hapc",
      name: "House Appropriations Committee Hearings",
      link: "https://appropriations.house.gov/events/hearings",
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
  {
    data: {
      type: "puppeteerv4",
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
  {
    data: {
      type: "puppeteerv4",
      collection: "hbuc",
      name: "House Budget Committee Hearings",
      link: "https://budget.house.gov/legislation/hearings",
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
  {
    data: {
      type: "puppeteerv4",
      collection: "hbuc",
      name: "House Budget Committee Markups",
      link: "https://budget.house.gov/legislation/markups",
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
  {
    data: {
      type: "puppeteerv1",
      collection: "help",
      name: "House Education and Labor Committee Hearings",
      link: "https://edlabor.house.gov/hearings-and-events",
      selectors: {
        layerOne: {
          depth: 5,
          rows: "tr.vevent",
        },
        layerTwo: {
          labels: true,
          title: "h1.main_page_title",
          date: "span.date",
          dateFormat: "dddd, MMMM D, YYYY",
          time: "span.time",
          location: "span.location",
        },
      },
    },
    schedule: { type: "every", value: 2000 },
  },
  {
    data: {
      type: "puppeteerv1",
      collection: "help",
      name: "House Education and Labor Committee Markups",
      link: "https://edlabor.house.gov/markups",
      selectors: {
        layerOne: {
          depth: 5,
          rows: "tr.vevent",
        },
        layerTwo: {
          labels: true,
          title: "h1.main_page_title",
          date: "span.date",
          dateFormat: "dddd, MMMM D, YYYY",
          time: "span.time",
          location: "span.location b", // Get next sibling (label)
        },
      },
    },
    schedule: { type: "every", value: 2000 },
  },
  {
    data: {
      type: "puppeteerv2",
      collection: "nrgy",
      name: "House Energy and Commerce Committee Hearings",
      link: "https://energycommerce.house.gov/committee-activity/hearings",
      selectors: {
        layerOne: {
          depth: 5,
          rows:
            ".pane-congress-hearings-panel-pane-hearings-upcoming .view-content",
          date: ".date-display-single",
          splitDate: "-",
          location: ".views-field-field-congress-meeting-location",
          dateFormat: "ddd, DD/MM/YYYY",
        },
      },
    },
    schedule: { type: "every", value: 2000 },
  },
  {
    data: {
      type: "puppeteerv2",
      collection: "nrgy",
      name: "House Energy and Commerce Committee Markups",
      link: "https://energycommerce.house.gov/committee-activity/markups",
      selectors: {
        layerOne: {
          depth: 5,
          rows:
            ".pane-congress-hearings-panel-pane-hearings-upcoming .view-content",
          date: ".date-display-single",
          splitDate: "-",
          location: ".views-field-field-congress-meeting-location",
          dateFormat: "ddd, DD/MM/YYYY",
        },
      },
    },
    schedule: { type: "every", value: 2000 },
  },
  {
    data: {
      type: "puppeteerv5",
      collection: "fisv",
      name: "House Financial Services Committee Hearings",
      link:
        "https://financialservices.house.gov/calendar/?EventTypeID=577&Congress=116",
      selectors: {
        layerOne: {
          depth: 8,
          rows: ".newsie-titler",
        },
        layerTwo: {
          title: "h3.news-titler",
          jquerySelector: ".topnewstext",
          locationIndex: 0,
          dateIndex: 1,
          timeIndex: 2,
        },
      },
    },
    schedule: { type: "every", value: 2000 },
  },
  {
    data: {
      type: "puppeteerv5",
      collection: "fisv",
      name: "House Financial Services Committee Markups",
      link:
        "https://financialservices.house.gov/calendar/?EventTypeID=575&Congress=116",
      selectors: {
        layerOne: {
          depth: 8,
          rows: ".newsie-titler",
        },
        layerTwo: {
          title: "h3.news-titler",
          jquerySelector: ".topnewstext",
          locationIndex: 0,
          dateIndex: 1,
          timeIndex: 2,
        },
      },
    },
    schedule: { type: "every", value: 2000 },
  },
  {
    data: {
      type: "puppeteerv2", // This version is best when the second page is un-parseable due to shitty HTML
      collection: "admn",
      name: "House Administration Committee Hearings",
      link: "https://cha.house.gov/committee-activity/hearings",
      selectors: {
        layerOne: {
          depth: 5,
          rows:
            ".pane-congress-hearings-panel-pane-hearings-upcoming .view-content",
          date: ".date-display-single",
          splitDate: "-",
          location: ".views-field-field-congress-meeting-location",
          dateFormat: "ddd, DD/MM/YYYY",
        },
      },
    },
    schedule: { type: "every", value: 2000 },
  },
  {
    data: {
      type: "puppeteerv2", // This version is best when the second page is un-parseable due to shitty HTML
      collection: "admn",
      name: "House Administration Committee Markups",
      link: "https://cha.house.gov/committee-activity/markups",
      selectors: {
        layerOne: {
          depth: 5,
          rows:
            ".pane-congress-markups-panel-pane-markups-upcoming .view-content",
          date: ".date-display-single",
          splitDate: "-",
          location: ".views-field-field-congress-meeting-location",
          dateFormat: "ddd, DD/MM/YYYY",
        },
      },
    },
    schedule: { type: "every", value: 2000 },
  },
  {
    data: {
      type: "puppeteerv2", // This version is best when the second page is un-parseable due to shitty HTML
      collection: "ntty",
      name: "House Natural Resources Committee Hearings",
      link: "https://naturalresources.house.gov/hearings",
      selectors: {
        layerOne: {
          depth: 5,
          rows: "tr.vevent",
          date: "time.dtstart",
          splitDate: " ",
          location: "span.location",
          dateFormat: "DD/MM/YY",
        },
      },
    },
    schedule: { type: "every", value: 2000 },
  },
  {
    data: {
      type: "puppeteerv2", // This version is best when the second page is un-parseable due to shitty HTML
      collection: "ovst",
      name: "House Oversight Committee Hearings",
      link: "https://oversight.house.gov/legislation/hearings",
      selectors: {
        layerOne: {
          depth: 5,
          rows:
            ".pane-congress-hearings-panel-pane-hearings-upcoming .views-row",
          date: "span.date-display-single",
          splitDate: "-",
          location:
            ".views-field-field-congress-meeting-location .field-content",
          dateFormat: "ddd, DD/MM/YYYY",
        },
      },
    },
    schedule: { type: "every", value: 2000 },
  },
  {
    data: {
      type: "puppeteerv2", // This version is best when the second page is un-parseable due to shitty HTML
      collection: "ovst",
      name: "House Oversight Committee Markups",
      link: "https://oversight.house.gov/legislation/business-meetings",
      selectors: {
        layerOne: {
          depth: 5,
          rows:
            ".pane-cng-meetings-panel-pane-business-meetings-upcoming .views-row",
          date: "span.date-display-single",
          splitDate: "-",
          location:
            ".views-field-field-congress-meeting-location .field-content",
          dateFormat: "ddd, DD/MM/YYYY",
        },
      },
    },
    schedule: { type: "every", value: 2000 },
  },
  {
    data: {
      type: "puppeteerv2",
      collection: "ovst",
      name: "House Oversight Committee Briefings",
      link: "https://oversight.house.gov/legislation/briefings",
      selectors: {
        layerOne: {
          depth: 5,
          rows: ".views-row",
          date: "span.date-display-single",
          splitDate: "-",
          location: null,
          dateFormat: "ddd, DD/MM/YYYY",
        },
      },
    },
    schedule: { type: "every", value: 2000 },
  },
  {
    data: {
      type: "puppeteerv2",
      collection: "scnc",
      name: "House Science Committee Hearings",
      link: "https://science.house.gov/hearings",
      selectors: {
        layerOne: {
          depth: 5,
          rows: "#hearings--upcoming div.hearing",
          date: ".hearing__date",
          time: { selector: ".hearing__time time", instance: 0 },
          location: ".hearing__location",
          dateFormat: "MMMM DD, YYYY",
        },
      },
    },
    schedule: { type: "every", value: 2000 },
  },
  {
    data: {
      type: "puppeteerv2",
      collection: "scnc",
      name: "House Science Committee Markups",
      link: "https://science.house.gov/markups",
      selectors: {
        layerOne: {
          depth: 5,
          rows: "#hearings--upcoming div.hearing",
          date: ".hearing__date",
          time: { selector: ".hearing__time time", instance: 0 },
          location: ".hearing__location",
          dateFormat: "MMMM DD, YYYY",
        },
      },
    },
    schedule: { type: "every", value: 2000 },
  },
  {
    data: {
      type: "puppeteerv5",
      collection: "smbs",
      name: "House Small Business Committee Hearings and Markups",
      link: "https://smallbusiness.house.gov/activity/",
      selectors: {
        layerOne: {
          depth: 3,
          rows: "ul.calendar-listing li",
        },
        layerTwo: {
          title: "h3.news-titler",
          jquerySelector: ".topnewstext",
          locationIndex: null,
          dateIndex: 0,
          timeIndex: 1,
        },
      },
    },
    schedule: { type: "every", value: 2000 },
  },
  {
    data: {
      type: "puppeteerv2",
      collection: "trns",
      name: "House Transportation Committee Hearings",
      link: "https://transportation.house.gov/committee-activity/hearings",
      selectors: {
        layerOne: {
          depth: 5,
          rows: "div.hearings-table table tr.vevent",
          date: "time.dtstart",
          time: { selector: "time.dtstart", instance: 1 }, // Zero indexed, second option
          location: "span.location",
          dateFormat: "MMM DD YYYY",
        },
      },
    },
    schedule: { type: "every", value: 2000 },
  },
  {
    data: {
      type: "puppeteerv2",
      collection: "trns",
      name: "House Transportation Committee Markups",
      link: "https://transportation.house.gov/committee-activity/markups",
      selectors: {
        layerOne: {
          depth: 5,
          rows: "div.hearings-table table tr.vevent",
          date: "time.dtstart",
          time: { selector: "time.dtstart", instance: 1 }, // Zero indexed, second option
          location: "span.location",
          dateFormat: "MMM DD YYYY",
        },
      },
    },
    schedule: { type: "every", value: 2000 },
  },
  {
    data: {
      type: "puppeteerv1",
      collection: "wymn",
      name: "House Ways and Means Committee Hearings",
      link: "https://waysandmeans.house.gov/legislation/hearings",
      selectors: {
        layerOne: {
          depth: 5,
          rows:
            ".pane-congress-hearings-panel-pane-hearings-upcoming .views-row",
        },
        layerTwo: {
          title: "h1.title",
          date: "span.date-display-single",
          splitDate: "-",
          dateFormat: "dddd, MMMM D, YYYY",
          location: ".field-name-field-congress-meeting-location .field-label",
        },
      },
    },
    schedule: { type: "every", value: 2000 },
  },
  {
    data: {
      type: "puppeteerv1",
      collection: "wymn",
      name: "House Ways and Means Committee Markups",
      link: "https://waysandmeans.house.gov/legislation/markups",
      selectors: {
        layerOne: {
          depth: 5,
          rows: ".pane-congress-markups-panel-pane-markups-upcoming .views-row",
        },
        layerTwo: {
          title: "h1.title",
          date: "span.date-display-single",
          splitDate: "-",
          dateFormat: "dddd, MMMM D, YYYY",
          location: ".field-name-field-congress-meeting-location .field-label",
        },
      },
    },
    schedule: { type: "every", value: 2000 },
  },
  {
    data: {
      type: "puppeteerv2",
      collection: "clmt",
      name: "House Climate Committee Hearings",
      link: "https://climatecrisis.house.gov/committee-activity/hearings",
      selectors: {
        layerOne: {
          depth: 5,
          rows: ".views-row",
          date: "span.date-display-single",
          splitDate: "-",
          location: null,
          dateFormat: "ddd, DD/MM/YYYY",
        },
      },
    },
    schedule: { type: "every", value: 2000 },
  },
];
