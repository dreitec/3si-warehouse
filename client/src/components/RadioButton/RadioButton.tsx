import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

interface Options {
  label: string;
  value: string;
}
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
          <FormControlLabel
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
