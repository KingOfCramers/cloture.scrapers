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

const makeJobs = (max, start, chunk) => {
  let jobs = [];
  let jobTotal = Math.floor(max / chunk) + 1;
  [...Array(jobTotal)].map((x, i) => {
    let starting = i * chunk + 1;
    let range = [...Array(chunk)]
      .map((x, y) => starting + y)
      .filter((x) => x <= max); // Remove any values over the max size
    jobs.push(range);
  });
  return jobs;
};
const unlimited = makeJobs(118, 1, 5)
  .map((range, i) => ({
    type: "unlimited",
    committee: "hfac",
    collection: "houseCommittee",
    name: `House Foreign Affairs ${i}`,
    phaseOne: {
      baseLink: "https://foreignaffairs.house.gov/hearings?page=SUBSTITUTE",
      range, // [...Array(5)].map((x, i) => i + 1), // Should be 118
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
  }))
  .map((x) => ({ schedule, validFormats, ...x }));

export default unlimited;
