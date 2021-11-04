import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import styled from "@mui/system/styled";

interface Range {
  color: string;
  text: string;
}
interface Props {
  name?: string;
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
          {name && <Typography variant="h6">{name}</Typography>}
        </Grid>
        <Grid container>{ranges.map(renderLegendKeys)}</Grid>
      </Grid>
    </ContainerStyled>
  );
};

export default Legend;
