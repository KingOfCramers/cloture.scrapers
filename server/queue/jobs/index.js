export default [
  {
    data: {
      name: "House Foreign Affairs Committee Hearings",
      collection: "hfac",
      link: "https://foreignaffairs.house.gov/hearings",
      selectors: {
        layerOne: {
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
];
