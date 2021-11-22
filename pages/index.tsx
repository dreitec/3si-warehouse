import React from "react";
import { Description, ArrowLink } from "../components";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import PeopleOutlined from "@mui/icons-material/PeopleOutlined";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import PieChartOutlined from "@mui/icons-material/PieChartOutlined";

import styled from "@mui/system/styled";

const StyledMainContainer = styled("div")(({ theme }) => ({
  margin: `${theme.spacing(17)} 0px`,
}));

const SectionGrid = styled(Grid)(({ theme }) => ({
  backgroundColor: "white",
  padding: theme.spacing(4),
}));

const StyledPaddedGrid = styled(Grid)(({ theme }) => ({
  padding: `${theme.spacing(6)} 0px`,
}));

const BlueDiv = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  padding: `${theme.spacing(6)} 0px`,
}));

const index = () => {
  return (
    <StyledMainContainer>
      <Container>
        <StyledPaddedGrid container justifyContent="center" alignItems="center">
          <Grid item xs={6}>
            <Description
              Icon={PeopleOutlined}
              heading="POPULATION"
              justify="left"
              headingJustify="left"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel
              convallis odio, at interdum sem. Donec dapibus vel elit non
              imperdiet. Donec ornare egestas ex eget bibendum. Aliquam
              ullamcorper nisi a magna mattis, at pharetra ligula pulvinar.
            </Description>
          </Grid>
          <SectionGrid item xs={6}>
            <div
              style={{ width: "100%", height: 300, border: "1px solid black" }}
            ></div>
            <ArrowLink href="/population">Explore more</ArrowLink>
          </SectionGrid>
        </StyledPaddedGrid>
      </Container>
      <BlueDiv>
        <Container maxWidth="xs" sx={{ textAlign: "center" }}>
          <Description
            Icon={PersonAddAltIcon}
            heading="POPULATION"
            justify="center"
            headingJustify="center"
            color="white"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel
            convallis odio, at interdum sem. Donec dapibus vel elit non
            imperdiet. Donec ornare egestas ex eget bibendum. Aliquam
            ullamcorper nisi a magna mattis, at pharetra ligula pulvinar.
          </Description>
          <ArrowLink href="/population" color="white">
            Explore more
          </ArrowLink>
        </Container>
      </BlueDiv>
      <Container>
        <StyledPaddedGrid container justifyContent="center" alignItems="center">
          <Grid item xs={6}>
            <Description
              Icon={PieChartOutlined}
              heading="PROVIDER CAPACITY"
              justify="left"
              headingJustify="left"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel
              convallis odio, at interdum sem. Donec dapibus vel elit non
              imperdiet. Donec ornare egestas ex eget bibendum. Aliquam
              ullamcorper nisi a magna mattis, at pharetra ligula pulvinar.
            </Description>
          </Grid>
          <SectionGrid item xs={6}>
            <div
              style={{ width: "100%", height: 300, border: "1px solid black" }}
            ></div>
            <ArrowLink href="/providers">Explore more</ArrowLink>
          </SectionGrid>
        </StyledPaddedGrid>
      </Container>
    </StyledMainContainer>
  );
};

export default index;
