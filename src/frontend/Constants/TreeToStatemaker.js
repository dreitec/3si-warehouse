const makeState = (checkBoxData) => {
  const flattened = flat(checkBoxData);
  let stateData = {};
  flattened.forEach((elem) => {
    if (elem.text !== "label" || elem.type !== "label") {
      stateData = { ...stateData, [elem.value]: elem.text };
    }
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
  ])
);
