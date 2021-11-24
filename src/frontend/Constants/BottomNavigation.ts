interface INavigationObject {
  nextLink: string;
  nextLabel: string;
  nextDisabled: boolean;
  prevLink: string;
  prevLabel: string;
  prevDisabled: boolean;
}
interface IData {
  [key: string]: INavigationObject;
}

const data: IData = {
  "/population": {
    nextLink: "/eligibility",
    nextLabel: "ELIGIBILITY",
    nextDisabled: false,
    prevDisabled: true,
    prevLink: "/",
    prevLabel: "/",
  },
  "/eligibility": {
    nextLink: "/eligibility/geographically",
    nextLabel: "ELIGIBILITY GEOGRAPHICALLY",
    nextDisabled: false,
    prevLink: "/",
    prevLabel: "POPULATION",
    prevDisabled: false,
  },
  "/eligibility/geographically": {
    nextLink: "/providers",
    nextLabel: "PROVIDER CAPACITY OVER TIME",
    nextDisabled: false,
    prevLink: "/eligibility",
    prevLabel: "ELIGIBILITY OVER TIME",
    prevDisabled: false,
  },
  "/providers": {
    nextLink: "/providers/sites",
    nextLabel: "PROVIDER SITES",
    nextDisabled: false,
    prevLink: "/eligibility/geographically",
    prevLabel: "ELIGIBILITY GEOGRAPHICALLY",
    prevDisabled: false,
  },
  "/providers/sites": {
    nextLink: "/service",
    nextLabel: "Children Served Over Time",
    nextDisabled: false,
    prevLink: "/providers",
    prevLabel: "PROVIDERS CAPACITY OVER TIME",
    prevDisabled: false,
  },
  "/service": {
    nextLink: "/service/geographically",
    nextLabel: "Children Served by Geography",
    nextDisabled: false,
    prevLink: "/providers/sites",
    prevLabel: "PROVIDERS CAPACITY GEOGRAPHICALLY",
    prevDisabled: false,
  },
  "/service/geographically": {
    nextLink: "/gaps",
    nextLabel: "CHILDREN UNSERVED",
    nextDisabled: false,
    prevLink: "/service",
    prevLabel: "Children Served Over Time",
    prevDisabled: false,
  },
  "/gaps": {
    nextLink: "/gaps/risk",
    nextLabel: "BY RISK FACTOR",
    nextDisabled: false,
    prevLink: "/service/geographically",
    prevLabel: "Children Served by Geography",
    prevDisabled: false,
  },
  "/gaps/risk": {
    nextLink: "/gaps/unserved",
    nextLabel: "Service Gaps Over Time",
    nextDisabled: false,
    prevLink: "/gaps",
    prevLabel: "CHILDREN UNSERVED",
    prevDisabled: false,
  },
  "/gaps/unserved": {
    nextLink: "/",
    nextLabel: "",
    nextDisabled: true,
    prevLink: "/gaps/risk",
    prevLabel: "BY RISK FACTOR",
    prevDisabled: false,
  },
};

export default data;
