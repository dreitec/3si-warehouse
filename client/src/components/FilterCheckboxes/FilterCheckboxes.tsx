import React from "react";
import { Box, FormControlLabel, styled, Checkbox } from "@mui/material";

interface SelectValueProps {
  value: string;
  key: string;
  children?: any[];
}

const StyledContainer = styled("div")(({ theme }) => ({
  "& label": {
    width: "100%",
    color: `${theme.palette.secondary.main} !important`,
    backgroundColor: "transparent",
  },
}));

const data = [
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
            key: "ehs",
          },
          {
            value: "Head Start",
            key: "hs",
          },
          {
            value: "State Subsidy (0-5)",
            key: "ss",
          },
          {
            value: "State Subsidy (School Age)",
            key: "sssa",
          },
          {
            value: "Public Preschool",
            key: "pps",
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
        key: "pp",
      },
    ],
  },
];

interface child {
  value: string;
  key: string;
}

const makeState = (checkBoxData: any[]) => {
  const flattened: child[] = flat(checkBoxData);
  const stateData: any = {};
  flattened.forEach((elem: child) => {
    stateData[elem.key] = false;
  });
  return stateData;
};

function flat(array: any) {
  let result: child[] = [];
  array.forEach(function (a: any) {
    result.push(a);
    if (Array.isArray(a.children)) {
      result = result.concat(flat(a.children));
    }
  });
  return result;
}

export default function IndeterminateCheckbox() {
  const [checked, setChecked] = React.useState(makeState(data));

  const handleChange = (key: string) => {
    setChecked({ ...checked, [key]: !checked[key] });
  };

  const renderChilds = (child: any, indent: number) => {
    return (
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {child.map((elem: any) => {
          return (
            <div key={elem.value}>
              <FormControlLabel
                label={elem.value}
                control={
                  <Checkbox
                    checked={checked[elem.key]}
                    onChange={() => handleChange(elem.key)}
                  />
                }
                sx={{ pl: indent }}
              />
              {elem.children && renderChilds(elem.children, indent + 2)}
            </div>
          );
        })}
      </Box>
    );
  };

  const renderCheckBoxes = (
    parent: SelectValueProps,
    indent: number
  ): React.ReactElement => {
    // console.log(parent, "check 1");
    return (
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <FormControlLabel
          label={parent.value}
          sx={{ pl: indent }}
          control={
            <Checkbox
              //   indeterminate={checked[0] !== checked[1]}
              key={parent.value}
              checked={checked[parent.key]}
              onChange={() => handleChange(parent.key)}
            />
          }
        />
        {parent.children && renderChilds(parent.children, indent + 2)}
      </Box>
    );
  };

  return <StyledContainer>{renderCheckBoxes(data[0], 0)}</StyledContainer>;
}
