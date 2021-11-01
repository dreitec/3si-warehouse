import React from "react";
import { Container, Grid, styled } from "@mui/material";

interface Props {
  ranges: string[];
}

const ContainerStyled = styled(Container)(() => ({
  position: "absolute",
  top: "470px",
}));
const Legend = (props: Props) => {
  const { ranges } = props;
  const renderLegendKeys = (range: string) => {
    return (
      <div key={range}>
        <span
          style={{
            backgroundColor: range,
            display: "inline-block",
            padding: 8,
          }}
        >
          {" "}
        </span>
      </div>
    );
  };

  React.useEffect(() => {}, [ranges]);

  return (
    <ContainerStyled>
      <Grid container>
        <Grid container>{ranges.map(renderLegendKeys)}</Grid>
      </Grid>
    </ContainerStyled>
  );
};

export default Legend;
