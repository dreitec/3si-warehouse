import React from "react";
import { Button, ButtonProps, styled } from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { colors } from "../../mui/colors";

const StyledPrimaryLightButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.light,
  borderColor: colors.border.main,
  paddingLeft: ` ${theme.spacing(6)} !important`,
  paddingRight: ` ${theme.spacing(6)} !important`,
}));

interface IButtonProps {
  loading?: boolean;
  isLight?: boolean;
}

const CustomButton = (props: IButtonProps & ButtonProps) => {
  const { children, loading = false, isLight = true, ...otherProps } = props;
  if (isLight) {
    return (
      <StyledPrimaryLightButton {...otherProps}>
        {children}
      </StyledPrimaryLightButton>
    );
  }

  return (
    <Box
      sx={{
        m: 1,
        position: "relative",
        width: "fit-content",
        display: "inline-block",
      }}
    >
      <Button variant="contained" disabled={loading} {...otherProps}>
        {children}
      </Button>
      {loading && (
        <CircularProgress
          size={24}
          sx={{
            color: colors.primary.main,
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: "-12px",
            marginLeft: "-12px",
          }}
        />
      )}
    </Box>
  );
};

export default CustomButton;
