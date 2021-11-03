import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import styled from "@mui/material/styles/styled";

const StyledLabel = styled(InputLabel)(() => ({
  backgroundColor: "transparent",
  textAlign: "left",
}));

interface ISelectData {
  text: string;
  value: string;
}

interface IProps {
  label: string;
  selectData: ISelectData[];
  selected: string;
  action: Function;
}

export default function BasicSelect(props: IProps) {
  const { label, selectData, selected, action } = props;

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    action(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120, paddingTop: 10 }}>
      <FormControl fullWidth>
        <StyledLabel id="select-label" htmlFor="select">
          {label}
        </StyledLabel>
        <Select
          labelId="select-label"
          id="select"
          value={selected}
          label={label}
          onChange={handleChange}
          variant="outlined"
        >
          {selectData.map((elem: ISelectData) => (
            <MenuItem value={elem.value}>{elem.text}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
