import React from "react";
import { Typography, styled, Grid } from "@mui/material";

const StyledHeading = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  paddingBottom: theme.spacing(2),
  width: "100%",
}));

interface Props {
  image?: any;
  heading: string;
  children: string;
}

const Description = (props: Props) => {
  //todo: handle image
  const { heading, children, image } = props;
  return (
    <Grid
      container
      alignItems="center"
      sx={{
        color: "palette.primary",
      }}
    >
      <StyledHeading textAlign="center" variant="h6">
        {heading}
      </StyledHeading>
      <Typography
        component="p"
        textAlign="center"
        justifyContent="center"
        variant="body1"
      >
        {children}
      </Typography>
    </Grid>
  );
};

export default Description;
