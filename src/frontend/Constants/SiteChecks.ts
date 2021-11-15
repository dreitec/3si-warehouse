import { FiltersValueText } from "../Interfaces";

export const SiteOptionTree = [
  {
    text: "All Site Types",
    value: "allsites",
    type: "label",
    children: [
      {
        text: "Large Group",
        value: "lg",
      },
      {
        text: "Small Group",
        value: "sg",
      },
      {
        text: "Family Child Care",
        value: "fcc",
      },
      {
        text: "Public School",
        value: "pubs",
      },
      {
        text: "Private School",
        value: "privs",
      },
      {
        text: "Other",
        value: "other",
      },
    ],
  },
];

export const SitesStateObject = {
  lg: true,
  sg: true,
  fcc: true,
  pubs: true,
  privs: true,
  other: true,
};

export const SitesValueToTextObject: FiltersValueText = {
  lg: "Large Group",
  sg: "Small Group",
  fcc: "Family Child Care",
  pubs: "Public School",
  privs: "Private School",
  other: "Other",
};
