import React from "react";
import { Box, FormControlLabel, styled, Checkbox } from "@mui/material";
import { Button } from "../";
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

interface child {
  value: string;
  key: string;
  children?: any;
}

const makeState = (checkBoxData: any[]) => {
  const flattened: child[] = flat(checkBoxData);
  const stateData: any = {};
  flattened.forEach((elem: child) => {
    stateData[elem.key] = true;
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

interface Props {
  getData: Function;
}

export default function IndeterminateCheckbox(props: Props) {
  const { getData } = props;
  const [state, setState] = React.useState(makeState(data));

  const handleChange = (obj: any) => {
    const { children }: any = obj || {};
    const allChildren: any = {};
    if (children) {
      children.forEach((elem: child) => {
        allChildren[elem.key] = !state[obj.key];
        if (elem.children) {
          elem.children.forEach((elem: child) => {
            allChildren[elem.key] = !state[obj.key];
            if (elem.children) {
            }
          });
        }
      });
    }
    setState({ ...state, [obj.key]: !state[obj.key], ...allChildren });
  };

  const checkIfChildrenChecked = (obj: any) => {
    const { children }: any = obj || {};
    let isChecked: boolean = true;
    if (children) {
      for (const child of children) {
        if (state[child.key] === false) {
          isChecked = false;
          break;
        }
      }
    } else {
      isChecked = state[obj.key];
    }
    return isChecked;
  };

  const intermediateCheck = (obj: any) => {
    const { children }: any = obj || {};
    const allChildConditions: boolean[] = [];
    if (children) {
      for (const child of children) {
        if (!allChildConditions.includes(state[child.key])) {
          allChildConditions.push(state[child.key]);
        }
      }
    }

    return allChildConditions.length === 2;
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
                    key={elem.value}
                    indeterminate={intermediateCheck(elem)}
                    checked={checkIfChildrenChecked(elem)}
                    onChange={() => handleChange(elem)}
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

  const getFilters = () => {
    const notRequired = ["sp", "all"];
    return Object.keys(state).filter(
      (elem) => state[elem] === true && !notRequired.includes(elem)
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
              key={parent.value}
              indeterminate={intermediateCheck(parent)}
              checked={checkIfChildrenChecked(parent)}
              onChange={() => handleChange(parent)}
            />
          }
        />
        {parent.children && renderChilds(parent.children, indent + 2)}
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            getData(getFilters());
          }}
        >
          Submit
        </Button>
      </Box>
    );
  };

  return <StyledContainer>{renderCheckBoxes(data[0], 0)}</StyledContainer>;
}
