const schedule =
  process.env.NODE_ENV === "production"
    ? { type: "cron", value: "*/30 * * * *" }
    : { type: "every", value: 2000 };

const jobs = [
  {
    type: "puppeteerv1",
    committee: "sfrc",
    collection: "senateCommittee",
    name: "Senate Foreign Relations Committee Hearings",
    link: "https://www.foreign.senate.gov/hearings",
    selectors: {
      layerOne: {
        depth: 1,
        rows: "div.table-holder div.text-center",
      },
      layerTwo: {
        title: "h1.main_page_title",
        date: { label: true, value: "span.date b" },
        time: { label: true, value: "span.time b" },
        location: { label: true, value: "span.location b" },
      },
    },
  },
  {
    type: "puppeteerv1",
    committee: "sasc",
    collection: "senateCommittee",
    name: "Senate Armed Services Committee",
    link: "https://www.armed-services.senate.gov/hearings?c=all",
    selectors: {
      layerOne: {
        depth: 5,
        rows: "tbody tr.vevent",
      },
      layerTwo: {
        title: "div#main_column h1",
        date: { label: true, value: "span.date b" },
        time: { label: true, value: "span.time b" },
        location: { label: true, value: "span.location b" },
      },
    },
  },
  {
    type: "puppeteerv1",
    committee: "sagc",
    collection: "senateCommittee",
    name: "Senate Agriculture Committee",
    link: "https://www.agriculture.senate.gov/hearings?c=all",
    selectors: {
      layerOne: {
        depth: 5,
        rows: "tbody tr.vevent",
      },
      layerTwo: {
        title: "h1.main_page_title",
        date: { label: true, value: "span.date b" },
        time: { label: true, value: "span.time b" },
        location: { label: true, value: "span.location b" },
      },
    },
  },
  {
    type: "puppeteerv1",
    committee: "sapc",
    collection: "senateCommittee",
    name: "Senate Appropriations Committee",
    link: "https://www.appropriations.senate.gov/hearings?c=all&mode=list",
    selectors: {
      layerOne: {
        depth: 5,
        rows: "tbody tr.vevent",
      },
      layerTwo: {
        title: "h1.main_page_title",
        date: { label: true, value: "span.date b" },
        time: { label: true, value: "span.time b" },
        location: { label: true, value: "span.location b" },
      },
    },
  },
  //{
  //committee: "sapc",
  //},
  //{
  //committee: "sbnk",
  //},
  //{
  //committee: "sbdg",
  //},
  //{
  //committee: "sstr",
  //},
  //{
  //committee: "snat",
  //},
  //{
  //committee: "senv",
  //},
  //{
  //committee: "sfin",
  //},
  //{
  //committee: "shlp",
  //},
  //{
  //committee: "shsc",
  //},
  //{
  //committee: "sind",
  //},
  //{
  //committee: "sjud",
  //},
  //{
  //committee: "srle",
  //},
  //{
  //committee: "seth",
  //},
  //{
  //committee: "ssci",
  //},
  //{
  //committee: "ssbs",
  //},
  //{
  //committee: "svet",
  //},
].map((job) => ({ schedule, ...job }));

export default jobs;
