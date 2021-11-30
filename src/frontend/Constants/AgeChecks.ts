import { FiltersValueText } from "../Interfaces";

export const AgeOptionTree = [
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
];

export const AgeStateObject = {
  infant: true,
  toddler: true,
  preschool: true,
  school_age: true,
};

export const AgeValueText: FiltersValueText = {
  Age: "Age",
  infant: "Infant",
  toddler: "Toddler",
  preschool: "Preschool",
  school_age: "School age",
};
