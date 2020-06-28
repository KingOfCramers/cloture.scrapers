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
  console.log(jobs);
  return jobs.filter((x) => x.length > 0);
};

const unlimited = [
  ...makeJobs(67, 18, 2).map((range, i) => ({
    type: "unlimitedv1",
    committee: "sfrc",
    collection: "senateCommittee",
    name: `Senate Foreign Relations Committee Hearings ${range[0]}`,
    phaseOne: {
      link: `https://www.foreign.senate.gov/hearings?PageNum_rs=SUBSTITUTE`,
      range,
    },
    phaseTwo: {
      depth: 100,
      rows: "table tbody tr.vevent",
    },
    phaseThree: {
      title: "h1.main_page_title",
      date: { label: true, value: "span.date b" },
      time: { label: true, value: "span.time b" },
      location: { label: true, value: "span.location b" },
    },
  })),
  ...makeJobs(50, 1, 3).map((range) => ({
    type: "unlimitedv1",
    committee: "sasc",
    collection: "senateCommittee",
    name: `Senate Armed Services Committee ${range[0]}`,
    phaseOne: {
      link: `https://www.armed-services.senate.gov/hearings?PageNum_rs=SUBSTITUTE&c=all`,
      range,
    },
    phaseTwo: {
      depth: 100,
      rows: "tbody tr.vevent",
    },
    phaseThree: {
      title: "div#main_column h1",
      date: { label: true, value: "span.date b" },
      time: { label: true, value: "span.time b" },
      location: { label: true, value: "span.location b" },
    },
  })),
  ...makeJobs(12, 1, 3).map((range) => ({
    type: "unlimitedv1",
    committee: "sagc",
    collection: "senateCommittee",
    name: `Senate Agriculture Committee ${range[0]}`,
    phaseOne: {
      range,
      link: `https://www.agriculture.senate.gov/hearings?PageNum_rs=SUBSTITUTE&c=all`,
    },
    phaseTwo: {
      depth: 100,
      rows: "tbody tr.vevent",
    },
    phaseThree: {
      title: "h1.main_page_title",
      date: { label: true, value: "span.date b" },
      time: { label: true, value: "span.time b" },
      location: { label: true, value: "span.location b" },
    },
  })),
  ...makeJobs(30, 1, 3).map((range) => ({
    type: "unlimitedv3",
    committee: "sapc",
    collection: "senateCommittee",
    name: `Senate Appropriations Committee ${range[0]}`,
    phaseOne: {
      range,
      link: `https://www.appropriations.senate.gov/hearings?PageNum_rs=SUBSTITUTE&c=all`,
      rows: "tbody tr.vevent",
      depth: 100,
    },
  })),
  ...makeJobs(30, 1, 3).map((range) => ({
    type: "unlimitedv1",
    committee: "sbnk",
    collection: "senateCommittee",
    name: `Senate Banking Committee ${range[0]}`,
    phaseOne: {
      range,
      link: `https://www.banking.senate.gov/hearings?PageNum_rs=SUBSTITUTE&c=all`,
    },
    phaseTwo: {
      depth: 100,
      rows: "div.table-holder tr.vevent",
    },
    phaseThree: {
      title: "h1.main_page_title",
      date: { label: true, value: "span.col-md-12 span" },
      time: { label: true, value: "span.time span" },
      location: { label: true, value: "span.location span" },
    },
  })),
  ...makeJobs(5, 1, 2).map((range) => ({
    type: "unlimitedv1",
    committee: "sbnk",
    collection: "senateCommittee",
    name: `Senate Banking Committee Markups ${range[0]}`,
    phaseOne: {
      range,
      link: `https://www.banking.senate.gov/markups?PageNum_rs=SUBSTITUTE`,
    },
    phaseTwo: {
      depth: 100,
      rows: "tbody tr.vevent",
    },
    phaseThree: {
      title: "h1.main_page_title",
      date: { label: true, value: "span.col-md-12 span" },
      time: { label: true, value: "span.time span" },
      location: { label: true, value: "span.location span" },
    },
  })),
  ...makeJobs(14, 1, 3).map((range) => ({
    type: "unlimitedv1",
    committee: "sbdg",
    collection: "senateCommittee",
    name: `Senate Budget Committee ${range[0]}`,
    phaseOne: {
      range,
      link: `https://www.budget.senate.gov/hearings?PageNum_rs=SUBSTITUTE&c=all&mode=list`,
    },
    phaseTwo: {
      depth: 100,
      rows: "tbody tr.vevent",
    },
    phaseThree: {
      title: "h1.main_page_title",
      date: { label: true, value: "span.date b" },
      time: { label: true, value: "span.time b" },
      location: { label: true, value: "span.location b" },
    },
  })),
  /// USE YEARS INSTEAD OF MAKEJOBS
  ...makeJobs(6, 1, 1).map((range) => ({
    committee: "sstr",
    type: "unlimitedv1",
    collection: "senateCommittee",
    name: `Senate Transportation Committee Hearings ${range[0]}`,
    phaseOne: {
      range,
      link: `https://www.commerce.senate.gov/Hearings?page=SUBSTITUTE`,
    },
    phaseTwo: {
      depth: 300,
      rows: "div.elements .element",
    },
    phaseThree: {
      title: "h1.element-title",
      regexTime: true,
      regexDate: true,
    },
  })),
  ...makeJobs(11, 1, 2).map((range) => ({
    committee: "sstr",
    type: "unlimitedv1",
    collection: "senateCommittee",
    name: `Senate Transportation Committee Markups ${range[0]}`,
    phaseOne: {
      range,
      link: `https://www.commerce.senate.gov/markups?page=SUBSTITUTE`,
    },
    phaseTwo: {
      depth: 300,
      rows: "div.elements .element",
    },
    phaseThree: {
      title: "h1.element-title",
      regexTime: true,
      regexDate: true,
    },
  })),
  /// USE YEARS INSTEAD OF MAKEJOBS
  ...makeJobs(50, 1, 3).map((range) => ({
    committee: "snat",
    type: "unlimitedv2",
    collection: "senateCommittee",
    name: `Senate Natural Resources ${range[0]}`,
    phaseOne: {
      range,
      link: `https://www.energy.senate.gov/public/index.cfm/hearings-and-business-meetings?MonthDisplay=0&YearDisplay=0`,
    },
    phaseTwo: {
      depth: 10000,
      rows: "div.recordsContainer tbody tr",
      date: { selector: "td.recordListDate", instance: 0 },
      time: { selector: "td.recordListTime", instance: 0 },
      title: "td.recordListTitle a",
    },
  })),
  ...makeJobs(67, 1, 3).map((range) => ({
    committee: "senv",
    type: "unlimitedv2",
    collection: "senateCommittee",
    name: `Senate Environment and Public Works ${range[0]}`,
    phaseOne: {
      range,
      link: `https://www.epw.senate.gov/public/index.cfm/hearings?YearDisplay=0&MonthDisplay=0&page=SUBSTITUTE`,
    },
    phaseTwo: {
      depth: 100,
      rows: "div.recordsContainer tbody tr",
      date: { selector: "td.recordListDate", instance: 0 },
      time: { selector: "td.recordListTime", instance: 0 },
      title: "td.recordListTitle a",
    },
  })),
  ...makeJobs(57, 1, 3).map((range) => ({
    type: "unlimitedv1",
    committee: "sfin",
    collection: "senateCommittee",
    name: `Senate Finance Committee ${range[0]}`,
    phaseOne: {
      range,
      link: `https://www.finance.senate.gov/hearings?PageNum_rs=SUBSTITUTE&c=all&maxrows=15`,
    },
    phaseTwo: {
      depth: 100,
      rows: "#main_column tbody tr.vevent",
    },
    phaseThree: {
      title: "h1.main_page_title",
      date: { label: true, value: "span.date b" },
      time: { label: true, value: "span.time b" },
      location: { label: true, value: "span.location b" },
    },
  })),
  ...makeJobs(32, 1, 3).map((range) => ({
    type: "unlimitedv1",
    committee: "shlp",
    collection: "senateCommittee",
    name: `Senate Health Education and Labor Committee ${range[0]}`,
    phaseOne: {
      range,
      link: `https://www.help.senate.gov/hearings?PageNum_rs=SUBSTITUTE&c=all`,
    },
    phaseTwo: {
      depth: 100,
      rows: "div.table-holder tr.vevent",
    },
    phaseThree: {
      title: "h1.main_page_title",
      date: { label: true, value: "span.date b" },
      time: { label: true, value: "span.time b" },
      location: { label: true, value: "span.location b" },
    },
  })),
  ...makeJobs(91, 1, 3).map((range) => ({
    type: "unlimitedv1",
    committee: "shsc",
    collection: "senateCommittee",
    name: `Senate Homeland Security Committee ${range[0]}`,
    phaseOne: {
      range,
      link: `https://www.hsgac.senate.gov/hearings?PageNum_rs=SUBSTITUTE&c=all `,
    },
    phaseTwo: {
      depth: 100,
      rows: "table tr.vevent",
    },
    phaseThree: {
      title: "h1.summary",
      regexTime: true,
      regexDate: true,
    },
  })),
  // WRITE CRAWLER THAT CLICKS AND HANDLES AJAX RESPONSES
  ...makeJobs(50, 1, 3).map((range) => ({
    type: "unlimitedv2",
    committee: "sind",
    collection: "senateCommittee",
    name: `Senate Indian Affairs Committee`,
    phaseOne: {
      range,
      link: `https://www.indian.senate.gov/hearings`,
    },
    phaseTwo: {
      depth: 100,
      rows: "table.views-table tbody tr",
      title: "a",
      date: { selector: "td span", instance: 0 },
      time: { selector: "td span", instance: 1 },
      location: "td.views-field-field-hearing-new-office",
    },
  })),
  /// TITLE SHOULD HAVE TEXT SELECTOR, ERRONEOUSLY INCLUDES OTHER INFORMATION
  ...makeJobs(75, 1, 3).map((range) => ({
    type: "unlimitedv1",
    committee: "sjud",
    collection: "senateCommittee",
    name: `Senate Judiciary Committee ${range[0]}`,
    phaseOne: {
      range,
      link: `https://www.judiciary.senate.gov/hearings?PageNum_rs=SUBSTITUTE&month=0&year=0`,
    },
    phaseTwo: {
      depth: 100,
      rows: "table tr.vevent",
    },
    phaseThree: {
      title: "h1.main_page_title",
      location: { value: "tr.location td:nth-of-type(2)", label: false },
      date: { value: "tr.date td:nth-of-type(2)", label: false },
      time: { value: "tr.time td:nth-of-type(2)", label: false },
    },
  })),
  ...makeJobs(6, 1, 2).map((range) => ({
    type: "unlimitedv1",
    committee: "srle",
    collection: "senateCommittee",
    name: `Senate Rules Committee ${range[0]}`,
    phaseOne: {
      range,
      link: `https://www.rules.senate.gov/hearings?PageNum_rs=SUBSTITUTE&c=all`,
    },
    phaseTwo: {
      depth: 100,
      rows: "div.table-holder tr.vevent",
    },
    phaseThree: {
      title: "h1.main_page_title",
      date: { label: true, value: "span.date b" },
      time: { label: true, value: "span.time b" },
      location: { label: true, value: "span.location b" },
    },
  })),
  ...makeJobs(9, 1, 2).map((range) => ({
    committee: "ssci",
    type: "unlimitedv3",
    collection: "senateCommittee",
    name: `Senate Intelligence Committee Hearings ${range[0]}`,
    phaseOne: {
      range,
      link: `https://www.intelligence.senate.gov/hearings?page=SUBSTITUTE`,
    },
    phaseTwo: {
      depth: 100,
      rows: "div.view-content div.views-row",
    },
  })),
  ...makeJobs(20, 1, 3).map((range) => ({
    committee: "ssbs",
    type: "unlimitedv2",
    collection: "senateCommittee",
    name: `Senate Small Business Committee ${range[0]}`,
    phaseOne: {
      range,
      link: `https://www.sbc.senate.gov/public/index.cfm/hearings?page=SUBSTITUTE`,
    },
    phaseTwo: {
      depth: 100,
      rows: "div.recordsContainer tbody tr",
      date: { selector: "td.recordListDate", instance: 0 },
      time: { selector: "td.recordListTime", instance: 0 },
      title: "td.recordListTitle a",
    },
  })),
  ...makeJobs(15, 1, 3).map((range) => ({
    type: "unlimitedv1",
    committee: "svac",
    collection: "senateCommittee",
    name: `Senate Veterans Affairs Committee ${range[0]}`,
    phaseOne: {
      range,
      link: `https://www.veterans.senate.gov/hearings?PageNum_rs=SUBSTITUTE&c=all`,
    },
    phaseTwo: {
      depth: 100,
      rows: "div.table-holder tr.vevent",
    },
    phaseThree: {
      title: "div.row h1",
      date: { label: true, value: "span.date b" },
      time: { label: true, value: "span.time b" },
      location: { label: true, value: "span.location b" },
    },
  })),
].map((job) => ({ schedule, ...job, nice: 1000 }));

export default unlimited;
