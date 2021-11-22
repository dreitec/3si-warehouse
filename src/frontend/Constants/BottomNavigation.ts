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
    nextLabel: "SERVICED OVERTIME",
    nextDisabled: false,
    prevLink: "/providers",
    prevLabel: "PROVIDERS CAPACITY OVER TIME",
    prevDisabled: false,
  },
  "/service": {
    nextLink: "/service/geographically",
    nextLabel: "SERVICED GEOGRAPHICALLY",
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
    prevLabel: "SERVICED OVERTIME",
    prevDisabled: false,
  },
  "/gaps": {
    nextLink: "/gaps/risk",
    nextLabel: "BY RISK FACTOR",
    nextDisabled: false,
    prevLink: "/service/geographically",
    prevLabel: "SERVICED GEOGRAPHICALLY",
    prevDisabled: false,
  },
  "/gaps/risk": {
    nextLink: "/",
    nextLabel: "",
    nextDisabled: true,
    prevLink: "/gaps",
    prevLabel: "CHILDREN UNSERVED",
    prevDisabled: false,
  },
};

export default data;
