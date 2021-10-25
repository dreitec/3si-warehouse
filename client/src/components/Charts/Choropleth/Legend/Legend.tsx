import React from "react";
import { Container, Grid, styled } from "@mui/material";
import { Typography } from "@material-ui/core";

interface Range {
  color: string;
  text: string;
}
interface Props {
  name: string;
  ranges: Range[];
}

const ContainerStyled = styled(Container)(() => ({
  position: "absolute",
  top: "470px",
}));
const Legend = (props: Props) => {
  const { name, ranges } = props;
  const renderLegendKeys = (range: Range) => {
    return (
      <div key={range.text}>
        <span
          style={{
            backgroundColor: range.color,
            display: "inline-block",
            padding: 8,
          }}
        >
          {range.text}
        </span>
      </div>
    );
  };

  React.useEffect(() => {}, [ranges]);

  return (
    <ContainerStyled>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h6">{name}</Typography>
        </Grid>
        <Grid container>{ranges.map(renderLegendKeys)}</Grid>
      </Grid>
    </ContainerStyled>
  );
};

export default Legend;
