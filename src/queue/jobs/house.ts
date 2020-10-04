import { houseCommittees } from "../../statics";
import { HouseJob, V1, V2, V3, V4, V5, V6 } from "./types";

const hjud: HouseJob<V1> = {
  committee: "hjud",
  collection: "houseCommittee",
  name: "House Judiciary Committee Hearings and Markups",
  link:
    "https://judiciary.house.gov/calendar/eventslisting.aspx?EventTypeID=0&CategoryID=0&Congress=&Count=10",
  details: {
    version: "puppeteerv1",
    selectors: {
      layerOne: {
        depth: 10,
        rows: "li.calendar-item",
      },
      layerTwo: {
        title: "h3.news-titler",
        time: true,
        date: true,
        location: { label: true, value: "div.events-location strong" },
      },
    },
  },
};

const hrle: HouseJob<V6> = {
  committee: "hrle",
  collection: "houseCommittee",
  name: "House Rules Committee",
  link: "https://rules.house.gov/media",
  details: {
    version: "puppeteerv6",
    selectors: {
      layerOne: {
        depth: 10,
        filter: { keyword: "meeting", selector: "h3" },
        rows: "div.view-content .views-row",
      },
      layerTwo: {
        title: ".title",
        time: true,
        date: true,
      },
    },
  },
};

const hfac: HouseJob<V1> = {
  committee: "hfac",
  collection: "houseCommittee",
  name: "House Foreign Affairs Committee Markups",
  link: "https://foreignaffairs.house.gov/markups",
  details: {
    version: "puppeteerv1",
    selectors: {
      layerOne: {
        depth: 1,
        rows: "table tbody tr",
      },
      layerTwo: {
        title: ".title",
        date: { label: false, value: "span.date" },
        time: { label: false, value: "span.time" },
        location: { label: true, value: "span.location strong" },
        //witnesses: "div.witnesses strong",
      },
    },
  },
};

const hasc: HouseJob<V1> = {
  committee: "hasc",
  collection: "houseCommittee",
  name: "House Armed Services Committee",
  link: "https://armedservices.house.gov/hearings",
  details: {
    version: "puppeteerv1",
    selectors: {
      layerOne: {
        depth: 10,
        rows: "table tbody tr",
      },
      layerTwo: {
        title: ".title",
        date: { label: false, value: "span.date:first-of-type" },
        time: true,
      },
    },
  },
};

const hvac: HouseJob<V1>[] = [
  {
    committee: "hvac",
    collection: "houseCommittee",
    name: "House Veterans Affairs Committee Hearings",
    link: "https://veterans.house.gov/events/hearings",
    details: {
      version: "puppeteerv1",
      selectors: {
        layerOne: {
          depth: 10,
          rows: "tr.vevent",
        },
        layerTwo: {
          title: "h1.main_page_title",
          date: { label: false, value: "p.hearing__date date" },
          time: { label: true, value: "p.hearing__time time b" },
          location: { label: false, value: "p.hearing__location b" },
        },
      },
    },
  },
  {
    committee: "hvac",
    collection: "houseCommittee",
    name: "House Veterans Affairs Committee Markups",
    link: "https://veterans.house.gov/events/markups",
    details: {
      version: "puppeteerv1",
      selectors: {
        layerOne: {
          depth: 10,
          rows: "tr.vevent",
        },
        layerTwo: {
          title: "h1.main_page_title",
          date: { label: false, value: "p.hearing__date date" },
          time: { label: true, value: "p.hearing__time time b" },
          location: { label: false, value: "p.hearing__location b" },
        },
      },
    },
  },
];

const hhsc: HouseJob<V2>[] = [
  {
    committee: "hhsc",
    collection: "houseCommittee",
    name: "House Homeland Security Committee Hearings",
    link: "http://homeland.house.gov/activities/hearings",
    details: {
      version: "puppeteerv2",
      selectors: {
        layerOne: {
          depth: 10,
          rows: "tr.vevent",
          date: { selector: "time.dtstart", instance: 0 },
          time: { selector: "time.dtstart", instance: 1 },
          location: "span.location",
        },
      },
    },
  },
  {
    committee: "hhsc",
    collection: "houseCommittee",
    name: "House Homeland Security Committee Markups",
    link: "http://homeland.house.gov/activities/markups",
    details: {
      version: "puppeteerv2",
      selectors: {
        layerOne: {
          depth: 10,
          rows: "tr.vevent",
          date: { selector: "time.dtstart", instance: 0 },
          time: { selector: "time.dtstart", instance: 1 },
          location: "span.location",
        },
      },
    },
  },
];

const hagc: HouseJob<V1> = {
  committee: "hagc",
  collection: "houseCommittee",
  name: "House Agriculture Committee Hearings",
  link: "https://agriculture.house.gov/calendar/",
  details: {
    version: "puppeteerv1",
    selectors: {
      layerOne: {
        depth: 10,
        rows: "ul.calendar-listing li",
      },
      layerTwo: {
        title: "h3.news-titler",
        time: true,
        date: true,
      },
    },
  },
};

const hapc: HouseJob<V4>[] = [
  {
    committee: "hapc",
    collection: "houseCommittee",
    name: "House Appropriations Committee Hearings",
    link: "https://appropriations.house.gov/events/hearings",
    details: {
      version: "puppeteerv4",
      selectors: {
        layerOne: {
          depth: 10,
          upcomingHearings: ".pane-content",
          hearings: ".views-row",
          dateTime: ".views-field-field-congress-meeting-date",
          time: "div.newsie-details span:nth-child(2)",
          location: ".views-field-field-congress-meeting-location",
        },
      },
    },
  },
  {
    committee: "hapc",
    collection: "houseCommittee",
    name: "House Appropriations Committee Markups",
    link: "https://appropriations.house.gov/events/markups",
    details: {
      version: "puppeteerv4",
      selectors: {
        layerOne: {
          depth: 10,
          upcomingHearings: ".pane-content",
          hearings: ".views-row",
          dateTime: ".views-field-field-congress-meeting-date",
          time: "div.newsie-details span:nth-child(2)",
          location: ".views-field-field-congress-meeting-location",
        },
      },
    },
  },
];

const hbuc: HouseJob<V4>[] = [
  {
    committee: "hbuc",
    collection: "houseCommittee",
    name: "House Budget Committee Hearings",
    link: "https://budget.house.gov/legislation/hearings",
    details: {
      version: "puppeteerv4",
      selectors: {
        layerOne: {
          depth: 10,
          upcomingHearings: ".pane-content",
          hearings: ".views-row",
          dateTime: ".views-field-field-congress-meeting-date",
          time: "div.newsie-details span:nth-child(2)",
        },
      },
    },
  },
  {
    committee: "hbuc",
    collection: "houseCommittee",
    name: "House Budget Committee Markups",
    link: "https://budget.house.gov/legislation/markups",
    details: {
      version: "puppeteerv4",
      selectors: {
        layerOne: {
          depth: 10,
          upcomingHearings: ".pane-content",
          hearings: ".views-row",
          dateTime: ".views-field-field-congress-meeting-date",
          time: "div.newsie-details span:nth-child(2)",
        },
      },
    },
  },
];

const help: HouseJob<V1>[] = [
  {
    committee: "help",
    collection: "houseCommittee",
    name: "House Education and Labor Committee Hearings",
    link: "https://edlabor.house.gov/hearings-and-events",
    details: {
      version: "puppeteerv1",
      selectors: {
        layerOne: {
          depth: 10,
          rows: "tr.vevent",
        },
        layerTwo: {
          title: "h1.main_page_title",
          date: { label: true, value: "span.date b" },
          time: { label: true, value: "span.time b" },
          location: { label: true, value: "span.location" },
        },
      },
    },
  },
  {
    committee: "help",
    collection: "houseCommittee",
    name: "House Education and Labor Committee Markups",
    link: "https://edlabor.house.gov/markups",
    details: {
      version: "puppeteerv1",
      selectors: {
        layerOne: {
          depth: 10,
          rows: "tr.vevent",
        },
        layerTwo: {
          title: "h1.main_page_title",
          date: { label: true, value: "span.date b" },
          time: { label: true, value: "span.time b" },
          location: { label: true, value: "span.location b" },
        },
      },
    },
  },
];

const nrgy: HouseJob<V2>[] = [
  {
    committee: "nrgy",
    collection: "houseCommittee",
    name: "House Energy and Commerce Committee Hearings",
    link: "https://energycommerce.house.gov/committee-activity/hearings",
    details: {
      version: "puppeteerv2",
      selectors: {
        layerOne: {
          depth: 10,
          rows: ".views-row",
          date: { selector: ".date-display-single", instance: 0 },
          splitDate: "-",
          location: ".views-field-field-congress-meeting-location",
        },
      },
    },
  },
  {
    committee: "nrgy",
    collection: "houseCommittee",
    name: "House Energy and Commerce Committee Markups",
    link: "https://energycommerce.house.gov/committee-activity/markups",
    details: {
      version: "puppeteerv2",
      selectors: {
        layerOne: {
          depth: 10,
          rows: ".views-row",
          date: { selector: ".date-display-single", instance: 0 },
          splitDate: "-",
          location: ".views-field-field-congress-meeting-location",
        },
      },
    },
  },
];

const fisv: HouseJob<V5>[] = [
  {
    committee: "fisv",
    collection: "houseCommittee",
    name: "House Financial Services Committee Hearings",
    link:
      "https://financialservices.house.gov/calendar/?EventTypeID=577&Congress=116",
    details: {
      version: "puppeteerv5",
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
  },
  {
    committee: "fisv",
    collection: "houseCommittee",
    name: "House Financial Services Committee Markups",
    link:
      "https://financialservices.house.gov/calendar/?EventTypeID=575&Congress=116",
    details: {
      version: "puppeteerv5",
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
  },
];

const admn: HouseJob<V2>[] = [
  {
    committee: "admn",
    collection: "houseCommittee",
    name: "House Administration Committee Hearings",
    link: "https://cha.house.gov/committee-activity/hearings",
    details: {
      version: "puppeteerv2",
      selectors: {
        layerOne: {
          depth: 10,
          rows: ".view-content",
          date: { selector: ".date-display-single", instance: 0 },
          splitDate: "-",
          location: ".views-field-field-congress-meeting-location",
        },
      },
    },
  },
  // EDIT -- MUST ADD BUSINESS MEETINGS
  {
    committee: "admn",
    collection: "houseCommittee",
    name: "House Administration Committee Markups",
    link: "https://cha.house.gov/committee-activity/markups",
    details: {
      version: "puppeteerv2",
      selectors: {
        layerOne: {
          depth: 10,
          rows: ".views-row",
          date: { selector: ".date-display-single", instance: 0 },
          splitDate: "-",
          location: ".views-field-field-congress-meeting-location",
        },
      },
    },
  },
];

const ntty: HouseJob<V2> = {
  committee: "ntty",
  collection: "houseCommittee",
  name: "House Natural Resources Committee Hearings",
  link: "https://naturalresources.house.gov/hearings",
  details: {
    version: "puppeteerv2",
    selectors: {
      layerOne: {
        depth: 10,
        rows: "tr.vevent",
        date: { selector: "time.dtstart", instance: 0 },
        splitDate: " ",
        location: "span.location",
      },
    },
  },
};

const ovst: HouseJob<V2>[] = [
  {
    committee: "ovst",
    collection: "houseCommittee",
    name: "House Oversight Committee Hearings",
    link: "https://oversight.house.gov/legislation/hearings",
    details: {
      version: "puppeteerv2",
      selectors: {
        layerOne: {
          depth: 10,
          rows: ".views-row",
          date: { selector: "span.date-display-single", instance: 0 },
          splitDate: "-",
          location:
            ".views-field-field-congress-meeting-location .field-content",
        },
      },
    },
  },
  {
    committee: "ovst",
    collection: "houseCommittee",
    name: "House Oversight Committee Markups",
    link: "https://oversight.house.gov/legislation/business-meetings",
    details: {
      version: "puppeteerv2",
      selectors: {
        layerOne: {
          depth: 10,
          rows:
            ".pane-cng-meetings-panel-pane-business-meetings-upcoming .views-row",
          date: { selector: "span.date-display-single", instance: 0 },
          splitDate: "-",
          location:
            ".views-field-field-congress-meeting-location .field-content",
        },
      },
    },
  },
  {
    committee: "ovst",
    collection: "houseCommittee",
    name: "House Oversight Committee Briefings",
    link: "https://oversight.house.gov/legislation/briefings",
    details: {
      version: "puppeteerv2",
      selectors: {
        layerOne: {
          depth: 10,
          rows: ".views-row",
          splitDate: "-",
          date: { selector: "span.date-display-single", instance: 0 },
        },
      },
    },
  },
];

const scnc: HouseJob<V2>[] = [
  {
    committee: "scnc",
    collection: "houseCommittee",
    name: "House Science Committee Hearings",
    link: "https://science.house.gov/hearings",
    details: {
      version: "puppeteerv2",
      selectors: {
        layerOne: {
          depth: 10,
          rows: "#hearings--upcoming div.hearing",
          date: { selector: ".hearing__date", instance: 0 },
          time: { selector: ".hearing__time time", instance: 0 },
          location: ".hearing__location",
        },
      },
    },
  },
  {
    committee: "scnc",
    collection: "houseCommittee",
    name: "House Science Committee Markups",
    link: "https://science.house.gov/markups",
    details: {
      version: "puppeteerv2",
      selectors: {
        layerOne: {
          depth: 10,
          rows: "#hearings--upcoming div.hearing",
          date: { selector: ".hearing__date", instance: 0 },
          time: { selector: ".hearing__time time", instance: 0 },
          location: ".hearing__location",
        },
      },
    },
  },
];

const smbs: HouseJob<V5> = {
  committee: "smbs",
  collection: "houseCommittee",
  name: "House Small Business Committee Hearings and Markups",
  link: "https://smallbusiness.house.gov/activity/",
  details: {
    version: "puppeteerv5",
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
};

const trns: HouseJob<V2>[] = [
  {
    committee: "trns",
    collection: "houseCommittee",
    name: "House Transportation Committee Hearings",
    link: "https://transportation.house.gov/committee-activity/hearings",
    details: {
      version: "puppeteerv2",
      selectors: {
        layerOne: {
          depth: 10,
          rows: "div.hearings-table table tr.vevent",
          date: { selector: "time.dtstart", instance: 0 },
          time: { selector: "time.dtstart", instance: 1 }, // Zero indexed, second option
          location: "span.location",
        },
      },
    },
  },
  {
    committee: "trns",
    collection: "houseCommittee",
    name: "House Transportation Committee Markups",
    link: "https://transportation.house.gov/committee-activity/markups",
    details: {
      version: "puppeteerv2",
      selectors: {
        layerOne: {
          depth: 10,
          rows: "div.hearings-table table tr.vevent",
          date: { selector: "time.dtstart", instance: 0 },
          time: { selector: "time.dtstart", instance: 1 }, // Zero indexed, second option
        },
      },
    },
  },
];

const wymn: HouseJob<V1>[] = [
  {
    committee: "wymn",
    collection: "houseCommittee",
    name: "House Ways and Means Committee Hearings",
    link: "https://waysandmeans.house.gov/legislation/hearings",
    details: {
      version: "puppeteerv1",
      selectors: {
        layerOne: {
          depth: 10,
          rows:
            ".pane-congress-hearings-panel-pane-hearings-upcoming .views-row",
        },
        layerTwo: {
          date: { label: false, value: "span.date-display-single" },
          title: "h1.title",
          splitDate: "-",
          location: {
            label: false,
            value: ".field-name-field-congress-meeting-location .field-label",
          },
        },
      },
    },
  },
  {
    committee: "wymn",
    collection: "houseCommittee",
    name: "House Ways and Means Committee Markups",
    link: "https://waysandmeans.house.gov/legislation/markups",
    details: {
      version: "puppeteerv1",
      selectors: {
        layerOne: {
          depth: 10,
          rows: ".pane-congress-markups-panel-pane-markups-upcoming .views-row",
        },
        layerTwo: {
          title: "h1.title",
          date: { label: false, value: "span.date-display-single" },
          splitDate: "-",
          location: {
            label: false,
            value: ".field-name-field-congress-meeting-location .field-label",
          },
        },
      },
    },
  },
];

const clmt: HouseJob<V2> = {
  committee: "clmt",
  collection: "houseCommittee",
  name: "House Climate Committee Hearings",
  link: "https://climatecrisis.house.gov/committee-activity/hearings",
  details: {
    version: "puppeteerv2",
    selectors: {
      layerOne: {
        depth: 10,
        rows: ".views-row",
        date: { selector: "span.date-display-single", instance: 0 },
        splitDate: "-",
      },
    },
  },
};

export const house: (HouseJob<V1> | HouseJob<V2>)[] = [
  //hjud,
  //hasc,
  //...hvac,
  //hagc,
  //clmt,
  //...trns,
  clmt,
];
