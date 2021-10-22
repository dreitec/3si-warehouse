export const ProgramOptionTree = [
  {
    text: "All programs",
    value: "all",
    children: [
      {
        text: "Subsidized Programs",
        value: "sp",
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
        text: "Private Pay",
        value: "private_pay",
      },
    ],
  },
];

export const StateObject = {
  all: true,
  bupk: true,
  ccfa: true,
  ccfasa: true,
  cppi: true,
  dese_public_pk: true,
  early_head_start: true,
  head_start: true,
  private_pay: true,
};
