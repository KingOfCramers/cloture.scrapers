// Reusable types
type LabelSelector = { label: boolean; value: string };
type InstanceSelector = { selector: string; instance: number };

// Import committee union types
import { houseCommittees, senateCommittees } from "../../statics";

// Used to get links
export interface RowsAndDepth {
  rows: string;
  depth: number;
}

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
      date: LabelSelector | boolean;
      time: LabelSelector | boolean;
      location?: LabelSelector;
    };
  };
}

export interface V2 {
  version: "puppeteerv2";
  selectors: {
    layerOne: {
      depth: number;
      rows: string;
      date: InstanceSelector;
      time: InstanceSelector;
      title: string;
      location?: string;
    };
  };
}
export interface V3 {
  version: "puppeteerv3";
  selectors: {
    layerOne: {
      depth: number;
      rows: string;
    };
  };
}

export interface V4 {
  version: "puppeteerv4";
  selectors: {
    layerOne: {
      depth: number;
      upcomingHearings: string;
      hearings: string;
      dateTime: string;
      time: string;
      location?: string;
    };
  };
}

export interface V5 {
  version: "puppeteerv5";
  selectors: {
    layerOne: {
      depth: number;
      rows: string;
    };
    layerTwo: {
      title: string;
      jquerySelector: string;
      locationIndex: number | null;
      dateIndex: number;
      timeIndex: number;
    };
  };
}
export interface V6 {
  version: "puppeteerv6";
  selectors: {
    layerOne: {
      depth: number;
      rows: string;
      date: InstanceSelector;
      time: InstanceSelector;
      title: string;
      location?: string;
    };
    layerTwo: {
      selectors: {
        title: string;
        date: LabelSelector | boolean;
        time: LabelSelector | boolean;
        location?: LabelSelector;
      };
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
