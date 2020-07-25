// Run jobs every 30 minutes in production
const schedule =
  process.env.NODE_ENV === "production"
    ? { type: "cron", value: "*/30 * * * *" }
    : { type: "every", value: 2000 };

// Creates an array of arrays, with the range of page numbers in each
// The max represents the final page
// The chunk is the number of pages to process before sending the results
// The start is the page number to start at
const makeJobs = (max, start, chunk) => {
  let jobs = [];
  let jobTotal = Math.floor(max / chunk) + 1;
  [...Array(jobTotal)].map((x, i) => {
    let starting = i * chunk + start;
    let range = [...Array(chunk)]
      .map((x, y) => starting + y)
      .filter((x) => x <= max); // Remove any values over the max size
    jobs.push(range);
  });
  return jobs.filter((x) => x.length > 0);
};

const unlimited = [
  ...makeJobs(34, 0, 1).map((range, i) => ({
    type: "unlimitedv1",
    committee: "hjud",
    collection: "houseCommittee",
    name: `House Judiciary ${i}`,
    phaseOne: {
      link: `https://judiciary.house.gov/calendar/eventslisting.aspx?EventTypeID=0&CategoryID=0&Congress=&Count=10&Page=SUBSTITUTE`,
      range,
    },
    phaseTwo: {
      depth: 100,
      rows: "li.calendar-item",
    },
    phaseThree: {
      title: "h3.news-titler",
      regexTime: true,
      regexDate: true,
      location: { label: true, value: "div.events-location strong" },
    },
  })),
  ...makeJobs(97, 1, 4).map((range, i) => ({
    type: "unlimitedv6",
    committee: "hrle",
    collection: "houseCommittee",
    name: `House Rules ${i}`,
    phaseOne: {
      link: `https://rules.house.gov/media/announcements?page=SUBSTITUTE`,
      range,
    },
    phaseTwo: {
      depth: 100,
      rows: ".view-content .views-row",
      filter: { selector: "h3.field-content a", keyword: "meeting" },
    },
    phaseThree: {
      title: ".title",
      regexTime: true,
      regexDate: true,
    },
  })),
  ...makeJobs(118, 1, 5).map((range, i) => ({
    type: "unlimitedv1",
    committee: "hfac",
    collection: "houseCommittee",
    name: `House Foreign Affairs ${i}`,
    phaseOne: {
      link: "https://foreignaffairs.house.gov/hearings?page=SUBSTITUTE",
      range,
    },
    phaseTwo: {
      depth: 100,
      rows: "table tbody tr",
    },
    phaseThree: {
      title: ".title",
      date: { label: false, value: "span.date" },
      time: { label: false, value: "span.time" },
      location: "span.location strong",
    },
  })),
  ...makeJobs(22, 1, 5).map((range, i) => ({
    type: "unlimitedv1",
    committee: "hfac",
    collection: "houseCommittee",
    name: `House Foreign Affairs Markups ${i}`,
    phaseOne: {
      link: "https://foreignaffairs.house.gov/markups?page=SUBSTITUTE",
      range,
    },
    phaseTwo: {
      depth: 100,
      rows: "table tbody tr",
    },
    phaseThree: {
      title: ".title",
      date: { label: false, value: "span.date" },
      time: { label: false, value: "span.time" },
      location: "span.location strong",
    },
  })),
  ...makeJobs(22, 1, 5).map((range, i) => ({
    type: "unlimitedv1",
    committee: "hasc",
    collection: "houseCommittee",
    name: `House Armed Services ${i}`,
    phaseOne: {
      link: "https://armedservices.house.gov/hearings?page=SUBSTITUTE",
      range,
    },
    phaseTwo: {
      depth: 100,
      rows: "table tbody tr",
    },
    phaseThree: {
      title: ".title",
      date: { label: false, value: "span.date:first-of-type" },
      regexTime: true,
    },
  })),
  ...makeJobs(11, 1, 3).map((range, i) => ({
    type: "unlimitedv1",
    committee: "hvac",
    collection: "houseCommittee",
    name: `House Veterans Affairs ${i}`,
    phaseOne: {
      link: "https://veterans.house.gov/events/hearings?PageNum_rs=SUBSTITUTE",
      range,
    },
    phaseTwo: {
      depth: 100,
      rows: "tr.vevent",
    },
    phaseThree: {
      title: "h1.main_page_title",
      date: { label: false, value: "p.hearing__date date" },
      time: { label: true, value: "p.hearing__time time b" },
      location: { label: true, value: "p.hearing__location b" },
    },
  })),
  ...makeJobs(1, 1, 1).map((range, i) => ({
    type: "unlimitedv1",
    committee: "hvac",
    collection: "houseCommittee",
    name: `House Veterans Affairs ${i}`,
    phaseOne: {
      link: "https://veterans.house.gov/events/markups?PageNum_rs=SUBSTITUTE",
      range,
    },
    phaseTwo: {
      depth: 100,
      rows: "tr.vevent",
    },
    phaseThree: {
      title: "h1.main_page_title",
      date: { label: false, value: "p.hearing__date date" },
      time: { label: true, value: "p.hearing__time time b" },
      location: { label: false, value: "p.hearing__location b" },
    },
  })),
  ...makeJobs(19, 1, 5).map((range, i) => ({
    type: "unlimitedv2",
    committee: "hhsc",
    collection: "houseCommittee",
    name: `House Homeland Security ${i}`,
    phaseOne: {
      range,
      link:
        "https://homeland.house.gov/activities/hearings?PageNum_rs=SUBSTITUTE",
    },
    phaseTwo: {
      depth: 100,
      rows: "tr.vevent",
      date: "time.dtstart",
      time: { selector: "time.dtstart", instance: 1 },
      location: "span.location",
    },
  })),
  ...makeJobs(3, 1, 3).map((range, i) => ({
    type: "unlimitedv2",
    committee: "hhsc",
    collection: "houseCommittee",
    name: `House Homeland Security Markups ${i}`,
    phaseOne: {
      range,
      link:
        "https://homeland.house.gov/activities/markups?PageNum_rs=SUBSTITUTE",
    },
    phaseTwo: {
      depth: 100,
      rows: "tr.vevent",
      date: "time.dtstart",
      time: { selector: "time.dtstart", instance: 1 },
      location: "span.location",
    },
  })),
  ...makeJobs(18, 1, 3).map((range, i) => ({
    type: "unlimitedv1",
    committee: "hagc",
    collection: "houseCommittee",
    name: `House Agriculture Committee ${i}`,
    phaseOne: {
      range,
      link:
        "https://agriculture.house.gov/calendar/default.aspx?Page=SUBSTITUTE",
    },
    phaseTwo: {
      depth: 100,
      rows: "ul.calendar-listing li",
    },
    phaseThree: {
      title: "h3.news-titler",
      regexTime: true,
      regexDate: true,
    },
  })),
  {
    type: "unlimitedv4",
    committee: "hapc",
    collection: "houseCommittee",
    name: `House Appropriations Committee`,
    phaseOne: {
      range: [null],
      link:
        "https://appropriations.house.gov/events/hearings?subcommittee=All&congress_number=752&__ncforminfo=wpeKKQCEbvD-XvJbu_uHk-hv2D29ftMt58-8zKF6BdxniFRAouHN6NELw4ysPpbbvfsC1mnVQ1ncqm_NkItsufcGZgtVv2Tr",
    },
    phaseTwo: {
      depth: 200,
      hearings: ".views-row",
      dateTime: ".views-field-field-congress-meeting-date",
      location: ".views-field-field-congress-meeting-location",
      time: "div.newsie-details span:nth-child(2)",
    },
  },
  {
    // Weird system
    type: "unlimitedv4",
    committee: "hapc",
    collection: "houseCommittee",
    name: `House Appropriations Committee Markup`,
    phaseOne: {
      range: [null],
      link:
        "https://appropriations.house.gov/events/markups?subcommittee=All&congress_number=752",
    },
    phaseTwo: {
      depth: 200,
      hearings: ".views-row",
      dateTime: ".views-field-field-congress-meeting-date",
      location: ".views-field-field-congress-meeting-location",
      time: "div.newsie-details span:nth-child(2)",
    },
  },
  {
    type: "unlimitedv4",
    committee: "hbuc",
    collection: "houseCommittee",
    name: `House Budget Committee`,
    phaseOne: {
      range: [839, 818, 672, 180, 799, 800, 823, 824],
      link:
        "https://budget.house.gov/legislation/hearings?congress_number=SUBSTITUTE",
    },
    phaseTwo: {
      depth: 200,
      hearings: ".views-row",
      dateTime: ".views-field-field-congress-meeting-date",
      time: "div.newsie-details span:nth-child(2)",
    },
  },
  {
    type: "unlimitedv4",
    committee: "hbuc",
    collection: "houseCommittee",
    name: `House Budget Committee Markups`,
    phaseOne: {
      range: [839, 818, 672, 180, 799, 800, 823, 824],
      link:
        "https://budget.house.gov/legislation/markups?congress_number=SUBSTITUTE",
    },
    phaseTwo: {
      depth: 200,
      hearings: ".views-row",
      dateTime: ".views-field-field-congress-meeting-date",
      time: "div.newsie-details span:nth-child(2)",
    },
  },
  ...makeJobs(17, 1, 3).map((range, i) => ({
    type: "unlimitedv1",
    committee: "help",
    collection: "houseCommittee",
    name: `House Education and Labor ${i}`,
    phaseOne: {
      link:
        "https://edlabor.house.gov/full-committee-hearings?PageNum_rs=SUBSTITUTE",
      range,
    },
    phaseTwo: {
      depth: 100,
      rows: "tr.vevent",
    },
    phaseThree: {
      title: "h1.main_page_title",
      date: { label: true, value: "span.date b" },
      time: { label: true, value: "span.time b" },
      location: "span.location", // Next location (b)
    },
  })),
  ...makeJobs(5, 1, 2).map((range, i) => ({
    type: "unlimitedv1",
    committee: "help",
    collection: "houseCommittee",
    name: `House Education and Labor Markups ${i}`,
    phaseOne: {
      link: "https://edlabor.house.gov/markups?PageNum_rs=SUBSTITUTE",
      range,
    },
    phaseTwo: {
      depth: 100,
      rows: "tr.vevent",
    },
    phaseThree: {
      title: "h1.main_page_title",
      date: { label: true, value: "span.date b" },
      time: { label: true, value: "span.time b" },
      location: "span.location", // Next location (b)
    },
  })),
  ...makeJobs(48, 1, 5).map((range, i) => ({
    type: "unlimitedv2",
    committee: "nrgy",
    collection: "houseCommittee",
    name: `House Energy Committee ${i}`,
    phaseOne: {
      range,
      link:
        "https://energycommerce.house.gov/committee-activity/hearings?page=SUBSTITUTE",
    },
    phaseTwo: {
      depth: 100,
      rows: ".views-row",
      date: ".date-display-single",
      splitDate: "-",
      location: ".views-field-field-congress-meeting-location",
    },
  })),
  ...makeJobs(10, 0, 3).map((range, i) => ({
    type: "unlimitedv2",
    committee: "nrgy",
    collection: "houseCommittee",
    name: `House Energy Committee ${i}`,
    phaseOne: {
      range,
      link:
        "https://energycommerce.house.gov/committee-activity/markups?page=SUBSTITUTE",
    },
    phaseTwo: {
      depth: 100,
      rows: ".views-row",
      date: ".date-display-single",
      splitDate: "-",
      location: ".views-field-field-congress-meeting-location",
    },
  })),
  ...makeJobs(10, 1, 3).map((range, i) => ({
    type: "unlimitedv5",
    committee: "fisv",
    collection: "houseCommittee",
    name: `House Financial Services Committee ${i}`,
    phaseOne: {
      range,
      link:
        "https://financialservices.house.gov/calendar/default.aspx?EventTypeID=577&Congress=116&Page=SUBSTITUTE",
    },
    phaseTwo: {
      depth: 100,
      rows: ".newsie-titler",
    },
    phaseThree: {
      title: "h3.news-titler",
      jquerySelector: ".topnewstext",
      locationIndex: 0,
      dateIndex: 1,
      timeIndex: 2,
    },
  })),
  ...makeJobs(2, 1, 1).map((range, i) => ({
    type: "unlimitedv5",
    committee: "fisv",
    collection: "houseCommittee",
    name: `House Financial Services Committee Markups ${i}`,
    phaseOne: {
      range,
      link:
        "https://financialservices.house.gov/calendar/default.aspx?EventTypeID=575&Congress=116&Page=SUBSTITUTE",
    },
    phaseTwo: {
      depth: 100,
      rows: ".newsie-titler",
    },
    phaseThree: {
      title: "h3.news-titler",
      jquerySelector: ".topnewstext",
      locationIndex: 0,
      dateIndex: 1,
      timeIndex: 2,
    },
  })),
  ...makeJobs(7, 0, 3).map((range, i) => ({
    type: "unlimitedv2",
    committee: "admn",
    collection: "houseCommittee",
    name: `House Administration Committee ${i}`,
    phaseOne: {
      range,
      link: "https://cha.house.gov/committee-activity/hearings?page=SUBSTITUTE",
    },
    phaseTwo: {
      depth: 100,
      rows: ".views-row",
      date: ".date-display-single",
      splitDate: "-",
      location: ".views-field-field-congress-meeting-location",
    },
  })),
  {
    type: "unlimitedv2",
    committee: "admn",
    collection: "houseCommittee",
    name: `House Administration Committee Markups`,
    phaseOne: {
      range: [796, 803],
      link:
        "https://cha.house.gov/committee-activity/markups?subcommittee=All&congress_number=SUBSTITUTE",
    },
    phaseTwo: {
      depth: 100,
      rows: ".views-row",
      date: ".date-display-single",
      splitDate: "-",
      location: ".views-field-field-congress-meeting-location",
    },
  },
  {
    type: "unlimitedv2",
    committee: "admn",
    collection: "houseCommittee",
    name: `House Administration Committee Business Meetings`,
    phaseOne: {
      range: [796, 803],
      link:
        "https://cha.house.gov/committee-activity/business-meetings?subcommittee=All&congress_number=SUBSTITUTE",
    },
    phaseTwo: {
      depth: 100,
      rows: ".views-row",
      date: ".date-display-single",
      splitDate: "-",
      location: ".views-field-field-congress-meeting-location",
    },
  },
  ...makeJobs(21, 1, 5).map((range, i) => ({
    type: "unlimitedv2",
    committee: "ntty",
    collection: "houseCommittee",
    name: `House Natural Resources ${i}`,
    phaseOne: {
      range,
      link: "https://naturalresources.house.gov/hearings?PageNum_rs=SUBSTITUTE",
    },
    phaseTwo: {
      depth: 100,
      rows: "tr.vevent",
      date: "time.dtstart",
      splitDate: " ",
      location: "span.location",
    },
  })),
  ...makeJobs(44, 1, 5).map((range, i) => ({
    type: "unlimitedv2",
    committee: "ovst",
    collection: "houseCommittee",
    name: `House Oversight ${i}`,
    phaseOne: {
      range,
      link: "https://oversight.house.gov/legislation/hearings?page=SUBSTITUTE",
    },
    phaseTwo: {
      depth: 100,
      rows: ".views-row",
      date: "span.date-display-single",
      splitDate: "-",
      location: ".views-field-field-congress-meeting-location .field-content",
    },
  })),
  {
    type: "unlimitedv2",
    committee: "ovst",
    collection: "houseCommittee",
    name: `House Oversight Business`,
    phaseOne: {
      range: [null],
      link: "https://oversight.house.gov/legislation/business-meetings",
    },
    phaseTwo: {
      depth: 100,
      rows: ".views-row",
      date: "span.date-display-single",
      splitDate: "-",
      location: ".views-field-field-congress-meeting-location .field-content",
    },
  },
  ...makeJobs(34, 1, 5).map((range, i) => ({
    type: "unlimitedv2",
    committee: "scnc",
    collection: "houseCommittee",
    name: `House Science Committee ${i}`,
    phaseOne: {
      range,
      link: "https://science.house.gov/hearings?PageNum_rs=SUBSTITUTE",
    },
    phaseTwo: {
      depth: 100,
      rows: "div.hearing",
      date: ".hearing__date",
      time: { selector: ".hearing__time time", instance: 0 },
      location: ".hearing__location",
    },
  })),
  ...makeJobs(8, 1, 3).map((range, i) => ({
    type: "unlimitedv2",
    committee: "scnc",
    collection: "houseCommittee",
    name: `House Science Committee Markups ${i}`,
    phaseOne: {
      range,
      link: "https://science.house.gov/markups?PageNum_rs=SUBSTITUTE",
    },
    phaseTwo: {
      depth: 100,
      rows: "div.hearing",
      date: ".hearing__date",
      time: { selector: ".hearing__time time", instance: 0 },
      location: ".hearing__location",
    },
  })),
  ...makeJobs(9, 1, 3).map((range, i) => ({
    type: "unlimitedv5",
    committee: "smbs",
    collection: "houseCommittee",
    name: `House Small Business Committee${i}`,
    phaseOne: {
      range,
      link:
        "https://smallbusiness.house.gov/activity/default.aspx?Page=SUBSTITUTE",
    },
    phaseTwo: {
      depth: 100,
      rows: "ul.calendar-listing li",
    },
    phaseThree: {
      title: "h3.news-titler",
      jquerySelector: ".topnewstext",
      locationIndex: null,
      dateIndex: 0,
      timeIndex: 1,
    },
  })),
  ...makeJobs(17, 1, 5).map((range, i) => ({
    type: "unlimitedv2",
    committee: "trns",
    collection: "houseCommittee",
    name: `House Transportation Committee Hearings ${i}`,
    phaseOne: {
      range,
      link:
        "https://transportation.house.gov/committee-activity/hearings?PageNum_rs=SUBSTITUTE",
    },
    phaseTwo: {
      depth: 100,
      rows: "div.hearings-table table tr.vevent",
      date: "time.dtstart",
      time: { selector: "time.dtstart", instance: 1 }, // Zero indexed, second option
      location: "span.location",
    },
  })),
  ...makeJobs(17, 1, 3).map((range, i) => ({
    type: "unlimitedv1",
    committee: "wymn",
    collection: "houseCommittee",
    name: `House Ways and Means ${i}`,
    phaseOne: {
      link:
        "https://waysandmeans.house.gov/legislation/hearings?page=SUBSTITUTE",
      range,
    },
    phaseTwo: {
      depth: 100,
      rows: ".views-row",
    },
    phaseThree: {
      date: { label: false, value: "span.date-display-single" },
      title: "h1.title",
      splitDate: "-",
      location: ".field-name-field-congress-meeting-location .field-label",
    },
  })),
  ...makeJobs(16, 1, 3).map((range, i) => ({
    type: "unlimitedv1",
    committee: "wymn",
    collection: "houseCommittee",
    name: `House Ways and Means Markups ${i}`,
    phaseOne: {
      link:
        "https://waysandmeans.house.gov/legislation/markups?page=SUBSTITUTE",
      range,
    },
    phaseTwo: {
      depth: 100,
      rows: ".views-row",
    },
    phaseThree: {
      date: { label: false, value: "span.date-display-single" },
      title: "h1.title",
      splitDate: "-",
      location: ".field-name-field-congress-meeting-location .field-label",
    },
  })),
  {
    type: "unlimitedv2",
    committee: "clmt",
    collection: "houseCommittee",
    name: `House Climate Committee Hearings `,
    phaseOne: {
      range: [180],
      link:
        "https://climatecrisis.house.gov/committee-activity/hearings?congress_number=SUBSTITUTE",
    },
    phaseTwo: {
      depth: 100,
      rows: ".views-row",
      date: "span.date-display-single",
      splitDate: "-",
      location: null,
    },
  },
  {
    type: "puppeteerv5",
    committee: "hagc",
    collection: "houseCommittee",
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
].map((x) => ({ schedule, ...x }));

export default unlimited;
