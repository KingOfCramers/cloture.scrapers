// Run jobs every 30 minutes in production
const schedule =
  process.env.NODE_ENV === "production"
    ? { type: "cron", value: "*/30 * * * *" }
    : { type: "every", value: 2000 };

const validFormats = {
  date: [
    "MMM D, YYYY",
    "MM.DD.YY",
    "MMM D YYYY",
    "MMM D",
    "MMM DD YYYY",
    "MMMM DD, YYYY",
    "MMMM D, YYYY",
    "MM/DD/YYYY",
    "MM/DD/YY",
    "ddd, DD/MM/YYYY",
    "ddd, MM/DD/YYYY",
    "dddd, MMMM DD, YYYY",
    "dddd, MMMM D, YYYY",
    "DD/MM/YY",
  ],
  time: [
    "LT",
    "hh:mm A",
    "h:mm A",
    "hh:mm a",
    "h:mm a",
    "hh:mmA",
    "h:mmA",
    "hh:mma",
    "h:mma",
    "hh:mm",
  ],
};

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
  //...makeJobs(118, 1, 5).map((range, i) => ({
  //type: "unlimited",
  //committee: "hfac",
  //collection: "houseCommittee",
  //name: `House Foreign Affairs ${i}`,
  //phaseOne: {
  //baseLink: "https://foreignaffairs.house.gov/hearings?page=SUBSTITUTE",
  //range,
  //},
  //phaseTwo: {
  //depth: 100,
  //rows: "table tbody tr",
  //},
  //phaseThree: {
  //title: ".title",
  //date: { label: false, value: "span.date" },
  //time: { label: false, value: "span.time" },
  //location: "span.location strong",
  //},
  //})),
  //...makeJobs(22, 1, 5).map((range, i) => ({
  //type: "unlimited",
  //committee: "hfac",
  //collection: "houseCommittee",
  //name: `House Foreign Affairs Markups ${i}`,
  //phaseOne: {
  //baseLink: "https://foreignaffairs.house.gov/markups?page=SUBSTITUTE",
  //range,
  //},
  //phaseTwo: {
  //depth: 100,
  //rows: "table tbody tr",
  //},
  //phaseThree: {
  //title: ".title",
  //date: { label: false, value: "span.date" },
  //time: { label: false, value: "span.time" },
  //location: "span.location strong",
  //},
  //})),
  //...makeJobs(22, 1, 5).map((range, i) => ({
  //type: "unlimitedv1",
  //committee: "hasc",
  //collection: "houseCommittee",
  //name: `House Armed Services ${i}`,
  //phaseOne: {
  //baseLink: "https://armedservices.house.gov/hearings?page=SUBSTITUTE",
  //range,
  //},
  //phaseTwo: {
  //depth: 100,
  //rows: "table tbody tr",
  //},
  //phaseThree: {
  //title: ".title",
  //date: { label: false, value: "span.date:first-of-type" },
  //},
  //})),
  //...makeJobs(11, 7, 3).map((range, i) => ({
  //type: "unlimitedv1",
  //committee: "hvac",
  //collection: "houseCommittee",
  //name: `House Veterans Affairs ${i}`,
  //phaseOne: {
  //baseLink:
  //"https://veterans.house.gov/events/hearings?PageNum_rs=SUBSTITUTE",
  //range,
  //},
  //phaseTwo: {
  //depth: 100,
  //rows: "tr.vevent",
  //},
  //phaseThree: {
  //title: "h1.main_page_title",
  //date: { label: false, value: "p.hearing__date date" },
  //time: { label: true, value: "p.hearing__time time b" },
  //location: "p.hearing__location b",
  //},
  //})),
  ...makeJobs(1, 1, 1).map((range, i) => ({
    type: "unlimitedv2",
    committee: "hvac",
    collection: "houseCommittee",
    name: `House Veterans Affairs Markups ${i}`,
    phaseOne: {
      baseLink: "https://veterans.house.gov/events/markups?page=SUBSTITUTE",
      range,
    },
    phaseTwo: {
      rows: "tr.vevent",
      depth: 100,
      date: "time.dtstart",
      time: { selector: "time.dtstart", instance: 1 },
      location: "span.location",
    },
  })),
].map((x) => ({ schedule, validFormats, ...x }));

export default unlimited;
