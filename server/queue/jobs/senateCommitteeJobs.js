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
    committee: "sasc",
  },
  //{
    //committee: "sagc",
  //},
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
