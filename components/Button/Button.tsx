import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { colors } from "../../mui/colors";

interface IButtonProps {
  loading?: boolean;
}

const CustomButton = (props: IButtonProps & ButtonProps) => {
  const {
    children,
    loading = false,
    variant = "outlined",
    ...otherProps
  } = props;

  return (
    <Box
      sx={{
        position: "relative",
        width: "fit-content",
        display: "inline-block",
      }}
    >
      <Button disabled={loading} variant={variant} {...otherProps}>
        {children}
      </Button>
      {loading && (
        <CircularProgress
          size={24}
          sx={{
            color: colors.primary.main,
            position: "absolute",
            top: "50%",
            left: variant === "outlined" ? "65%" : "50%",
            marginTop: "-12px",
            marginLeft: "-12px",
          }}
        />
      )}
    </Box>
  );
};

export default CustomButton;
