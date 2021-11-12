import { FiltersValueText } from "../Interfaces";
export const ProgramOptionTree = [
  {
    text: "Subsidized Programs",
    value: "sp",
    type: "label",
    children: [
      {
        text: "Early Head Start",
        value: "early_head_start",
      },
      {
        text: "Head Start",
        value: "head_start",
      },
      {
        text: "State Subsidy (0-5)",
        value: "ccfa",
      },
      {
        text: "State Subsidy (School Age)",
        value: "ccfasa",
      },
      {
        text: "Public Preschool",
        value: "dese_public_pk",
      },
      {
        text: "CPPI",
        value: "cppi",
      },
      {
        text: "Boston UPK",
        value: "bupk",
      },
    ],
  },

  {
    text: "Non-Subsidized",
    value: "usp",
    type: "label",
    children: [
      {
        text: "Private Pay",
        value: "private_pay",
      },
    ],
  },
];

export const ProgramStateObject = {
  bupk: true,
  ccfa: true,
  ccfasa: true,
  cppi: true,
  dese_public_pk: true,
  early_head_start: true,
  head_start: true,
  private_pay: true,
};

export const ProgramValueToTextObject: FiltersValueText = {
  early_head_start: "Early Head Start",
  head_start: "Head Start",
  ccfa: "State Subsidy (0-5)",
  ccfasa: "State Subsidy (School Age)",
  dese_public_pk: "Public Preschool",
  cppi: "CPPI",
  bupk: "Boston UPK",
  private_pay: "Private Pay",
};
