import React from "react";
import { Box, FormControlLabel, styled, Checkbox } from "@mui/material";
import { Button } from "../";
interface SelectValueProps {
  value: string;
  text: string;
  children?: any[];
}

const StyledContainer = styled("div")(({ theme }) => ({
  "& label": {
    width: "100%",
    color: `${theme.palette.secondary.main} !important`,
    backgroundColor: "transparent",
  },
}));

interface child {
  value: string;
  text: string;
  children?: any;
}

interface Props {
  getData: Function;
  state: any;
  setState: Function;
  data: any[];
}

export default function IndeterminateCheckbox(props: Props) {
  const { getData, state, setState, data } = props;

  const handleChange = (obj: any) => {
    const { children }: any = obj || {};
    const allChildren: any = {};
    if (children) {
      children.forEach((elem: child) => {
        allChildren[elem.value] = !state[obj.value];
        if (elem.children) {
          elem.children.forEach((elem: child) => {
            allChildren[elem.value] = !state[obj.value];
            if (elem.children) {
            }
          });
        }
      });
    }
    setState({ [obj.value]: !state[obj.value], ...allChildren });
  };

  const checkIfChildrenChecked = (obj: any) => {
    const { children }: any = obj || {};
    let isChecked: boolean = true;
    if (children) {
      for (const child of children) {
        if (state[child.value] === false) {
          isChecked = false;
          break;
        }
      }
    } else {
      isChecked = state[obj.value];
    }
    return isChecked;
  };

  const intermediateCheck = (obj: any) => {
    const { children }: any = obj || {};
    const allChildConditions: boolean[] = [];
    if (children) {
      for (const child of children) {
        if (!allChildConditions.includes(state[child.value])) {
          allChildConditions.push(state[child.value]);
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
                label={elem.text}
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
          label={parent.text}
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
