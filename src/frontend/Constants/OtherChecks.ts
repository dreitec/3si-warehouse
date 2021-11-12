import { FiltersValueText } from "../Interfaces";

export const OtherOptionTree = [
  {
    text: "Income brackets",
    value: "All income brackets",
    type: "label",
    children: [
      {
        text: "<100% FPL",
        value: "cnt_under_100_perc_fpl",
      },
      {
        text: "100-199% FPL",
        value: "cnt_100_199_perc_fpl",
      },
      {
        text: "200-299% FPL",
        value: "cnt_200_299_perc_fpl",
      },
      {
        text: "300-399% FPL",
        value: "cnt_300_399_perc_fpl",
      },
      {
        text: "400-499% FPL",
        value: "cnt_400_499_perc_fpl",
      },
      {
        text: ">500% FPL",
        value: "cnt_gte_500_perc_fpl",
      },
    ],
  },

  {
    text: "Age",
    value: "Age",
    type: "label",
    children: [
      {
        text: "Infant",
        value: "infant",
      },
      {
        text: "Toddler",
        value: "toddler",
      },
      {
        text: "Preschool",
        value: "preschool",
      },
      {
        text: "School age",
        value: "school_age",
      },
    ],
  },

  {
    text: "Labor Force Participation",
    value: "Labor Force Participation",
    type: "label",
    children: [
      {
        text: "All adults in the labor force",
        value: "adilf",
      },
      {
        text: "Not all adults in the labor force",
        value: "nadilf",
      },
    ],
  },
];

export const OtherStateObject = {
  cnt_under_100_perc_fpl: true,
  cnt_100_199_perc_fpl: true,
  cnt_200_299_perc_fpl: true,
  cnt_300_399_perc_fpl: true,
  cnt_400_499_perc_fpl: true,
  cnt_gte_500_perc_fpl: true,
  infant: true,
  toddler: true,
  preschool: true,
  school_age: true,
  adilf: true,
  nadilf: true,
};

export const OtherValueToText: FiltersValueText = {
  cnt_under_100_perc_fpl: "<100% FPL",
  cnt_100_199_perc_fpl: "100-199% FPL",
  cnt_200_299_perc_fpl: "200-299% FPL",
  cnt_300_399_perc_fpl: "300-399% FPL",
  cnt_400_499_perc_fpl: "400-499% FPL",
  cnt_gte_500_perc_fpl: ">500% FPL",
  Age: "Age",
  infant: "Infant",
  toddler: "Toddler",
  preschool: "Preschool",
  school_age: "School age",
  adilf: "All adults in the labor force",
  nadilf: "Not all adults in the labor force",
};
