import * as React from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  styled,
} from "@mui/material";

interface Options {
  label: string;
  value: string;
}

const StyledLabel = styled(FormControlLabel)(() => ({
  backgroundColor: "transparent !important",
}));
interface Props {
  options: Options[];
}
export default function ControlledRadioButtonsGroup(props: Props) {
  const { options } = props;
  const [value, setValue] = React.useState(options[0].value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Other Factors of Interest</FormLabel>

      <RadioGroup
        aria-label="Other Factors of Interest"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        {options.map((option: Options) => (
          <StyledLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
