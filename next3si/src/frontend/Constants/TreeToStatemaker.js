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
      text: "All Site Types",
      value: "allsites",
      children: [
        {
          text: "Large Group",
          value: "lg",
        },
        {
          text: "Large Group",
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
