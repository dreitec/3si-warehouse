import * as React from "react";
import { styled } from "@mui/system";
import SwitchUnstyled, {
  switchUnstyledClasses,
} from "@mui/core/SwitchUnstyled";

import { Typography } from "@mui/material";

const Root = styled("span")(`
  font-size: 0;
  position: relative;
  display: inline-block;
  width: 48px;
  height: 25px;
  
  margin: 0px 8px 0px 8px;
  top: 5px;
  cursor: pointer;

  &.${switchUnstyledClasses.disabled} {
    opacity: 0.4;
    cursor: not-allowed;
  }

  & .${switchUnstyledClasses.track} {
    background: #FFF;
    border-radius: 15px;
    display: block;
    height: 100%;
    width: 100%;
    position: absolute;
	border: 3px solid #C3C7D5;
  }

  & .${switchUnstyledClasses.thumb} {
    display: block;
    width: 14px;
    height: 14px;
    top: 5px;
    left: 6px;
    border-radius: 16px;
    background-color:#376EFF;
    position: relative;
    transition: all 200ms ease;
  }

  &.${switchUnstyledClasses.focusVisible} .${switchUnstyledClasses.thumb} {
    background-color: rgba(255,255,255,1);
    box-shadow: 0 0 1px 8px rgba(0,0,0,0.25);
  }

  &.${switchUnstyledClasses.checked} { 
    .${switchUnstyledClasses.thumb} {
      left: 28px;
      top: 5px;
      background-color: #376EFF;
    }

    .${switchUnstyledClasses.track} {
        background: #fff;
    }
  }

  & .${switchUnstyledClasses.input} {
    cursor: inherit;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: 1;
    margin: 0;
  }`);
interface StyledLabelProps {
  isHighlight: boolean;
}
const StyledLabel = styled(Typography)((props: StyledLabelProps) => {
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

export default function UnstyledSwitches(props: SwitchProps) {
  const label = { componentsProps: { input: { "aria-label": "Demo switch" } } };
  const { labels, setChecked, checked } = props;

  return (
    <div>
      <StyledLabel variant="body1" isHighlight={!checked}>
        {labels[0]}
      </StyledLabel>
      <SwitchUnstyled
        component={Root}
        {...label}
        onChange={(e) => {
          setChecked(!checked);
        }}
        checked={checked}
      />
      <StyledLabel variant="body1" isHighlight={checked}>
        {labels[1]}
      </StyledLabel>
    </div>
  );
}
