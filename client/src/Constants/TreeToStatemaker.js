const makeState = (checkBoxData) => {
  const flattened = flat(checkBoxData);
  const stateData = {};
  flattened.forEach((elem) => {
    if (elem.text !== "label") {
      stateData[elem.value] = true;
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
      text: "label",
      value: "Age",
    },
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
    {
      text: "label",
      value: "Age",
    },
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
    {
      text: "label",
      value: "Labor Force Participation",
    },
    {
      text: "All adults in the labor force",
      value: "adilf",
    },
    {
      text: "Not all adults in the labor force",
      value: "nadilf",
    },
  ])
);
