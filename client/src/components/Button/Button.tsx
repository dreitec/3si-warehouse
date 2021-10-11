import React from "react";
import { Button, ButtonProps, styled } from "@mui/material";

interface Props {
  children: React.ReactNode;
}

const StyledPrimaryLightButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.light,
  borderColor: theme.palette.border,
  paddingLeft: ` ${theme.spacing(6)} !important`,
  paddingRight: ` ${theme.spacing(6)} !important`,
}));

const CustomButton = (props: ButtonProps) => {
  const { children, ...otherProps } = props;
  return (
    <StyledPrimaryLightButton {...otherProps}>
      {children}
    </StyledPrimaryLightButton>
  );
};

export default CustomButton;
