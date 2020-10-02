import { senateCommittees } from "../../statics";

export const senate = [
  //{
  //committee: "sage",
  //collection: "senateCommittee",
  //name: "Senate Aging Committee",
  //link: "https://www.aging.senate.gov/hearings",
  //details: {
  //version: "puppeteerv1",
  //selectors: {
  //layerOne: {
  //depth: 10,
  //rows: "tr.vevent",
  //},
  //layerTwo: {
  //title: "div#content h1",
  //regexTime: true,
  //regexDate: true,
  //},
  //},
  //},
  //},
  //{
  //committee: "sfrc",
  //collection: "senateCommittee",
  //name: "Senate Foreign Relations Committee Hearings",
  //link: "https://www.foreign.senate.gov/hearings",
  //details: {
  //version: "puppeteerv1",
  //selectors: {
  //layerOne: {
  //depth: 10,
  //rows: "div.table-holder div.text-center",
  //},
  //layerTwo: {
  //title: "h1.main_page_title",
  //date: { label: true, value: "span.date b" },
  //time: { label: true, value: "span.time b" },
  //location: { label: true, value: "span.location b" },
  //},
  //},
  //},
  //},
  //{
  //committee: "sasc",
  //collection: "senateCommittee",
  //name: "Senate Armed Services Committee",
  //link: "https://www.armed-services.senate.gov/hearings?c=all",
  //details: {
  //version: "puppeteerv1",
  //selectors: {
  //layerOne: {
  //depth: 10,
  //rows: "tbody tr.vevent",
  //},
  //layerTwo: {
  //title: "div#main_column h1",
  //date: { label: true, value: "span.date b" },
  //time: { label: true, value: "span.time b" },
  //location: { label: true, value: "span.location b" },
  //},
  //},
  //},
  //},
  //{
  //committee: "sagc",
  //collection: "senateCommittee",
  //name: "Senate Agriculture Committee",
  //link: "https://www.agriculture.senate.gov/hearings?c=all",
  //details: {
  //version: "puppeteerv1",
  //selectors: {
  //layerOne: {
  //depth: 10,
  //rows: "tbody tr.vevent",
  //},
  //layerTwo: {
  //title: "h1.main_page_title",
  //date: { label: true, value: "span.date b" },
  //time: { label: true, value: "span.time b" },
  //location: { label: true, value: "span.location b" },
  //},
  //},
  //},
  //},
  //{
  //committee: "sapc",
  //collection: "senateCommittee",
  //name: "Senate Appropriations Committee",
  //link: "https://www.appropriations.senate.gov/hearings?c=all&mode=list",
  //details: {
  //version: "puppeteerv1",
  //selectors: {
  //layerOne: {
  //depth: 10,
  //rows: "tbody tr.vevent",
  //},
  //layerTwo: {
  //title: "h1.main_page_title",
  //date: { label: true, value: "span.date b" },
  //time: { label: true, value: "span.time b" },
  //location: { label: true, value: "span.location b" },
  //},
  //},
  //},
  //},
  //{
  //committee: "sbnk",
  //collection: "senateCommittee",
  //name: "Senate Banking Committee",
  //link: "https://www.banking.senate.gov/hearings?c=all&mode=list",
  //details: {
  //version: "puppeteerv1",
  //selectors: {
  //layerOne: {
  //depth: 10,
  //rows: "tbody tr.vevent",
  //},
  //layerTwo: {
  //title: "h1.main_page_title",
  //date: { label: true, value: "span.col-md-12 span" },
  //time: { label: true, value: "span.time span" },
  //location: { label: true, value: "span.location span" },
  //},
  //},
  //},
  //},
  //{
  //committee: "sbnk",
  //collection: "senateCommittee",
  //name: "Senate Banking Committee Markups",
  //link: "https://www.banking.senate.gov/markups?c=all&mode=list",
  //details: {
  //version: "puppeteerv1",
  //selectors: {
  //layerOne: {
  //depth: 10,
  //rows: "tbody tr.vevent",
  //},
  //layerTwo: {
  //title: "h1.main_page_title",
  //date: { label: true, value: "span.col-md-12 span" },
  //time: { label: true, value: "span.time span" },
  //location: { label: true, value: "span.location span" },
  //},
  //},
  //},
  //},
  //{
  //committee: "sbdg",
  //collection: "senateCommittee",
  //name: "Senate Budget Committee",
  //link: "https://www.budget.senate.gov/hearings?c=all&mode=list",
  //details: {
  //version: "puppeteerv1",
  //selectors: {
  //layerOne: {
  //depth: 10,
  //rows: "tbody tr.vevent",
  //},
  //layerTwo: {
  //title: "h1.main_page_title",
  //date: { label: true, value: "span.date b" },
  //time: { label: true, value: "span.time b" },
  //location: { label: true, value: "span.location b" },
  //},
  //},
  //},
  //},
  //{
  //committee: "sstr",
  //collection: "senateCommittee",
  //name: "Senate Transportation Committee Hearings",
  //link: "https://www.commerce.senate.gov/hearings?month=&year=&label_id=",
  //details: {
  //version: "puppeteerv1",
  //selectors: {
  //layerOne: {
  //depth: 10,
  //rows: "div.elements .element",
  //},
  //layerTwo: {
  //title: "h1.element-title",
  //regexTime: true,
  //regexDate: true,
  //},
  //},
  //},
  //},
  //{
  //committee: "sstr",
  //collection: "senateCommittee",
  //name: "Senate Transportation Committee Markups",
  //link: "https://www.commerce.senate.gov/markups?month=&year=",
  //details: {
  //version: "puppeteerv1",
  //selectors: {
  //layerOne: {
  //depth: 10,
  //rows: "div.elements .element",
  //},
  //layerTwo: {
  //title: "h1.element-title",
  //regexTime: true,
  //regexDate: true,
  //},
  //},
  //},
  //},
  //{
  //committee: "snat",
  //collection: "senateCommittee",
  //name: "Senate Natural Resources",
  //link:
  //"https://www.energy.senate.gov/public/index.cfm/hearings-and-business-meetings?MonthDisplay=0&YearDisplay=0",
  //details: {
  //version: "puppeteerv2",
  //selectors: {
  //layerOne: {
  //depth: 10,
  //rows: "div.recordsContainer tbody tr",
  //date: { selector: "td.recordListDate", instance: 0 },
  //time: { selector: "td.recordListTime", instance: 0 },
  //title: "td.recordListTitle a",
  //},
  //},
  //},
  //},
  //{
  //committee: "senv",
  //collection: "senateCommittee",
  //name: "Senate Environment and Public Works",
  //link:
  //"https://www.epw.senate.gov/public/index.cfm/hearings?MonthDisplay=0&YearDisplay=0&Label_id=&Label_id=",
  //details: {
  //version: "puppeteerv2",
  //selectors: {
  //layerOne: {
  //depth: 10,
  //rows: "div.recordsContainer tbody tr",
  //date: { selector: "td.recordListDate", instance: 0 },
  //time: { selector: "td.recordListTime", instance: 0 },
  //title: "td.recordListTitle a",
  //},
  //},
  //},
  //},
  //{
  //committee: "sfin",
  //collection: "senateCommittee",
  //name: "Senate Finance Committee",
  //link: "https://www.finance.senate.gov/hearings?c=all&maxrows=15",
  //details: {
  //version: "puppeteerv1",
  //selectors: {
  //layerOne: {
  //depth: 10,
  //rows: "#main_column tbody tr.vevent",
  //},
  //layerTwo: {
  //title: "h1.main_page_title",
  //date: { label: true, value: "span.date b" },
  //time: { label: true, value: "span.time b" },
  //location: { label: true, value: "span.location b" },
  //},
  //},
  //},
  //},
  //{
  //committee: "shlp",
  //collection: "senateCommittee",
  //name: "Senate Health Education and Labor Committee",
  //link: "https://www.help.senate.gov/hearings?c=all&mode=list",
  //details: {
  //version: "puppeteerv1",
  //selectors: {
  //layerOne: {
  //depth: 10,
  //rows: "div.table-holder tr.vevent",
  //},
  //layerTwo: {
  //title: "h1.main_page_title",
  //date: { label: true, value: "span.date b" },
  //time: { label: true, value: "span.time b" },
  //location: { label: true, value: "span.location b" },
  //},
  //},
  //},
  //},
  //{
  //committee: "shsc",
  //collection: "senateCommittee",
  //name: "Senate Homeland Security Committee",
  //link: "https://www.hsgac.senate.gov/hearings?c=all",
  //details: {
  //version: "puppeteerv1",
  //selectors: {
  //layerOne: {
  //depth: 10,
  //rows: "table tr.vevent",
  //},
  //layerTwo: {
  //title: "h1.summary",
  //regexTime: true,
  //regexDate: true,
  //},
  //},
  //},
  //},
  //{
  //committee: "sind",
  //collection: "senateCommittee",
  //name: "Senate Indian Affairs Committee",
  //link: "https://www.indian.senate.gov/hearings",
  //details: {
  //version: "puppeteerv2",
  //selectors: {
  //layerOne: {
  //depth: 10,
  //rows: "table.views-table tbody tr",
  //title: "a",
  //date: { selector: "td span", instance: 0 },
  //time: { selector: "td span", instance: 1 },
  //location: "td.views-field-field-hearing-new-office",
  //},
  //},
  //},
  //},
  //{
  //committee: "sjud",
  //collection: "senateCommittee",
  //name: "Senate Judiciary Committee",
  //link: "https://www.judiciary.senate.gov/hearings?month=0&year=0&mode=list",
  //details: {
  //version: "puppeteerv1",
  //selectors: {
  //layerOne: {
  //depth: 10,
  //rows: "table tr.vevent",
  //},
  //layerTwo: {
  //titleTrimRegex:
  //"(Oversight)$|(Full Committee Hearing)$|(Subcommittee Hearing)$|(Business Meeting)$|(Nomination Hearing)$",
  //title: "h1.main_page_title",
  //location: { value: "tr.location td:nth-of-type(2)", label: false },
  //date: { value: "tr.date td:nth-of-type(2)", label: false },
  //time: { value: "tr.time td:nth-of-type(2)", label: false },
  //},
  //},
  //},
  //},
  //{
  //committee: "srle",
  //collection: "senateCommittee",
  //name: "Senate Rules Committee",
  //link: "https://www.rules.senate.gov/hearings?c=all&mode=list",
  //details: {
  //version: "puppeteerv1",
  //selectors: {
  //layerOne: {
  //depth: 10,
  //rows: "div.table-holder tr.vevent",
  //},
  //layerTwo: {
  //title: "h1.main_page_title",
  //date: { label: true, value: "span.date b" },
  //time: { label: true, value: "span.time b" },
  //location: { label: true, value: "span.location b" },
  //},
  //},
  //},
  //},
  ////{
  ////committee: "ssci",
  ////version: "puppeteerv3",
  ////collection: "senateCommittee",
  ////name: "Senate Intelligence Committee Hearings",
  ////link: "https://www.intelligence.senate.gov/hearings",
  ////details: {
  ////layerOne: {
  ////depth: 10,
  ////rows: "div.view-content div.views-row",
  ////},
  ////},
  ////},
  //{
  //committee: "ssbs",
  //collection: "senateCommittee",
  //name: "Senate Small Business Committee",
  //link: "https://www.sbc.senate.gov/public/index.cfm/hearings?page=1",
  //details: {
  //version: "puppeteerv2",
  //selectors: {
  //layerOne: {
  //depth: 10,
  //rows: "div.recordsContainer tbody tr",
  //date: { selector: "td.recordListDate", instance: 0 },
  //time: { selector: "td.recordListTime", instance: 0 },
  //title: "td.recordListTitle a",
  //},
  //},
  //},
  //},
  //{
  //committee: "svac",
  //collection: "senateCommittee",
  //name: "Senate Veterans Affairs Committee",
  //link: "https://www.veterans.senate.gov/hearings?c=all",
  //details: {
  //version: "puppeteerv1",
  //selectors: {
  //layerOne: { depth: 10, rows: "div.table-holder tr.vevent" },
  //layerTwo: {
  //title: "div.row h1",
  //date: { label: true, value: "span.date b" },
  //time: { label: true, value: "span.time b" },
  //location: { label: true, value: "span.location b" },
  //},
  //},
  //},
  //},
];
