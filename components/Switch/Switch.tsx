import * as React from "react";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/system";
import Typography from "@mui/material/Typography";

interface StyledLabelProps {
  isHighlight: boolean;
}

const StyledLabel = styled(Typography, {
  shouldForwardProp: (prop: string) => prop !== "isHighlight",
})((props: StyledLabelProps) => {
  const { isHighlight } = props;
  return {
    display: "inline",
    color: isHighlight ? "#080808" : "#C3C7D5",
  };
});
interface SwitchProps {
  labels: string[];
  checked: boolean;
  setChecked: Function;
}

export default function ControlledSwitches(props: SwitchProps) {
  const { labels, setChecked, checked } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <div>
      <StyledLabel variant="body1" isHighlight={!checked}>
        {labels[0]}
      </StyledLabel>

      <Switch
        checked={checked}
        onChange={handleChange}
        inputProps={{ "aria-label": "controlled" }}
      />
      <StyledLabel variant="body1" isHighlight={checked}>
        {labels[1]}
      </StyledLabel>
    </div>
  );
}
