import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import styled from "@mui/system/styled";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { theme } from "../../../../mui";
interface Props {
  ranges: string[];
}

const ContainerStyled = styled(Container)(({ theme }) => ({
  position: "absolute",
  top: "430px",
  paddingLeft: `${theme.spacing(7)} !important`,
  maxWidth: `${theme.spacing(24)} !important`,
}));

const VerticalSpan = styled("span")(() => ({
  position: "absolute",
  transform: "rotate(270deg)",
  left: -40,
  bottom: 84,
  fontSize: "smaller",
}));

const StyledArrow = styled(ArrowRightAltIcon)(() => ({
  position: "relative",
  top: theme.spacing(1),
}));

const Legend = (props: Props) => {
  const { ranges } = props;
  const renderLegendKeys = (range: string) => {
    return (
      <span
        key={range}
        style={{
          backgroundColor: range,
          display: "inline-block",
          padding: 16,
        }}
      />
    );
  };

  React.useEffect(() => {}, [ranges]);

  return (
    <ContainerStyled>
      <VerticalSpan>
        Larger Service Gap <StyledArrow />
      </VerticalSpan>
      <Grid container>{ranges.slice(0, 3).map(renderLegendKeys)}</Grid>
      <Grid container>{ranges.slice(3, 6).map(renderLegendKeys)}</Grid>
      <Grid container>{ranges.slice(6, 9).map(renderLegendKeys)}</Grid>
      <span>
        Higher SVI <StyledArrow />
      </span>
    </ContainerStyled>
  );
};

export default Legend;
