import React from "react";
import { Container, Grid, styled } from "@mui/material";
import { Typography } from "@material-ui/core";
interface Props {
  name: string;
  stops: any[][];
  lastValue: number;
}

const ContainerStyled = styled(Container)(() => ({
  position: "absolute",
  top: "470px",
}));
const Legend = (props: Props) => {
  const { name, stops, lastValue } = props;
  console.log(stops);
  const ranges = [
    `${stops[0][0]} -${stops[1][0] - 1}`,
    `${stops[1][0]}-${stops[2][0] - 1}`,
    `${stops[2][0]}-${lastValue}`,
  ];

  const renderLegendKeys = (stop: any[], i: number) => {
    return (
      <div key={i}>
        <span
          style={{
            backgroundColor: stop[1],
            display: "inline-block",
            padding: 8,
          }}
        >
          {ranges[i]}
        </span>
      </div>
    );
  };

  return (
    <ContainerStyled>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h6">{name}</Typography>
        </Grid>
        <Grid container>{stops.map(renderLegendKeys)}</Grid>
      </Grid>
    </ContainerStyled>
  );
};

export default Legend;
