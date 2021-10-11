import React from "react";
import { Box, FormControlLabel, styled, Checkbox } from "@mui/material";

interface SelectValueProps {
  value: string;
  children?: any[];
}

const StyledContainer = styled("div")(({ theme }) => ({
  "& label": {
    width: "100%",
    color: `${theme.palette.secondary.main} !important`,
    backgroundColor: "transparent",
  },
}));

export default function IndeterminateCheckbox() {
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
              key: "pp",
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
  const [checked, setChecked] = React.useState([true, false]);

  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, event.target.checked]);
  };

  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, checked[1]]);
  };

  const handleChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([checked[0], event.target.checked]);
  };

  //   const children = (
  //     <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
  //       <FormControlLabel
  //         label="Child 1"
  //         control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
  //       />
  //       <FormControlLabel
  //         label="Child 2"
  //         control={<Checkbox checked={checked[1]} onChange={handleChange3} />}
  //       />
  //     </Box>
  //   );

  const renderChilds = (child: any, indent: number) => {
    console.log(child, "check 3");
    return (
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {child.map((elem: any) => {
          console.log(elem.value, elem.children, "'check 1'");
          return (
            <>
              <FormControlLabel
                label={elem.value}
                control={
                  <Checkbox checked={checked[1]} onChange={handleChange3} />
                }
                sx={{ pl: indent }}
              />
              {elem.children && renderChilds(elem.children, indent + 2)}
            </>
          );
        })}
      </Box>
    );
  };

  const renderCheckBoxes = (
    parent: SelectValueProps,
    indent: number
  ): React.ReactElement => {
    console.log(parent, "check 1");
    return (
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <FormControlLabel
          label={parent.value}
          sx={{ pl: indent }}
          control={
            <Checkbox
              checked={checked[0] && checked[1]}
              indeterminate={checked[0] !== checked[1]}
              onChange={handleChange1}
            />
          }
        />
        {parent.children && renderChilds(parent.children, indent + 2)}
      </Box>
    );
  };

  return <StyledContainer>{renderCheckBoxes(data[0], 0)}</StyledContainer>;
}
