export const CheckBoxTree = [
  {
    value: "All programs",
    key: "all",
    children: [
      {
        value: "Subsidized Programs",
        key: "sp",
        children: [
          {
            value: "Early Head Start",
            key: "early_head_start",
          },
          {
            value: "Head Start",
            key: "head_start",
          },
          {
            value: "State Subsidy (0-5)",
            key: "ccfa",
          },
          {
            value: "State Subsidy (School Age)",
            key: "ccfasa",
          },
          {
            value: "Public Preschool",
            key: "dese_public_pk",
          },
          {
            value: "CPPI",
            key: "cppi",
          },
          {
            value: "Boston UPK",
            key: "bupk",
          },
        ],
      },
      {
        value: "Private Pay",
        key: "private_pay",
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
