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
  ])
);
