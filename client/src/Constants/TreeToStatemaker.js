const makeState = (checkBoxData) => {
  const flattened = flat(checkBoxData);
  const stateData = {};
  flattened.forEach((elem) => {
    stateData[elem.key] = true;
  });
  return stateData;
};

function flat(array) {
  let result = [];
  array.forEach(function (a) {
    result.push(a);
    if (Array.isArray(a.children)) {
      result = result.concat(flat(a.children));
    }
  });
  return result;
}

console.log(
  makeState([
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
  ])
);
