// Reusable types
type labelSelector = { label: boolean; value: string };
type instanceSelector = { selector: string; instance: number };

// Import committee union types
import { houseCommittees, senateCommittees } from "../../statics";

// Details for scrapers
export interface V1 {
  version: "puppeteerv1";
  selectors: {
    layerOne: {
      depth: number;
      rows: string;
    };
    layerTwo: {
      title: string;
      date: labelSelector | boolean;
      time: labelSelector | boolean;
      location?: labelSelector;
    };
  };
}

export interface V2 {
  version: "puppeteerv2";
  selectors: {
    layerOne: {
      depth: number;
      rows: string;
      date: instanceSelector;
      time: instanceSelector;
      title: string;
      location?: string;
    };
  };
}

interface Job {
  name: string;
  link: string;
}

export interface HouseJob<Details> extends Job {
  collection: "houseCommittee";
  committee: houseCommittees;
  name: string;
  link: string;
  details: Details;
}

export interface SenateJob<Details> {
  collection: "senateCommittee";
  committee: senateCommittees;
  name: string;
  link: string;
  details: Details;
}
