import React from "react";

import {
  PeopleOutline as PeopleOutlineIcon,
  PieChart as PieChartIcon,
  Map as MapIcon,
  Height as HeightIcon,
  SaveAlt as SaveAltIcon,
} from "@mui/icons-material";
import { Grid, Typography, styled, Theme, Box, BoxProps } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

interface StyledDivProps extends React.HTMLAttributes<HTMLDivElement> {
  isActive: boolean;
  theme?: Theme;
}

const StyledContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(8),
  maxWidth: "100%",
  overflowX: "auto",
}));

const StyledDiv = styled("div", {
  shouldForwardProp: (prop: string) => prop !== "isActive",
  name: "MyThemeComponent",
})((props: StyledDivProps) => {
  const { isActive, theme } = props;
  if (!theme) {
    return {};
  }
  return {
    color: isActive ? `#376EFF` : theme.palette.primary.dark,
    textAlign: "center",
    backgroundColor: isActive ? "white" : "transparent",
    padding: `${theme.spacing(3)}   ${theme.spacing(4)}`,
    "&  > h6": {
      "& > svg": {
        fontSize: "2rem",
        position: "relative",
        top: 6,
        left: `-${theme.spacing(2)}`,
      },
    },
    "&:hover": {
      color: "#376EFF",
      backgroundColor: "white",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "2rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "1rem",
    },
  };
});

const StyledHeading = styled(Typography)(() => ({
  width: "100%",
}));

const StyledGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    justifyContent: "center",
  },
}));
const StyledLink = styled(Link)(() => ({
  textDecoration: "none",
}));

function Item(props: BoxProps) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        borderRadius: 1,
        textAlign: "center",
        fontSize: "1rem",
        fontWeight: "700",
        ...sx,
      }}
      {...other}
    />
  );
}

const TabBox = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState("/");

  const changeTab = (path: string) => {
    setActiveTab(path);
  };

  React.useEffect(() => {
    setActiveTab(router.pathname);
  }, [router.pathname]);

  return (
    <StyledContainer sx={{ display: "flex", bgcolor: "transparent" }}>
      <Item sx={{ width: "100%" }}>
        <StyledLink href="/">
          <StyledDiv
            isActive={activeTab === "/"}
            onClick={() => changeTab("/")}
          >
            <StyledHeading variant="h6">
              <PeopleOutlineIcon />
              Eligibility
            </StyledHeading>
          </StyledDiv>
        </StyledLink>
      </Item>
      <Item sx={{ width: "100%" }}>
        <StyledLink href="/service">
          <StyledDiv
            isActive={activeTab === "/service"}
            onClick={() => changeTab("/service")}
          >
            <StyledHeading variant="h6">
              <PieChartIcon />
              Service
            </StyledHeading>
          </StyledDiv>
        </StyledLink>
      </Item>
      <Item sx={{ width: "100%" }}>
        <StyledLink href="/providers">
          <StyledDiv
            isActive={activeTab === "/providers"}
            onClick={() => changeTab("/providers")}
          >
            <StyledHeading variant="h6">
              <MapIcon />
              Provider
            </StyledHeading>
          </StyledDiv>
        </StyledLink>
      </Item>
      <Item sx={{ width: "100%" }}>
        <StyledLink href="/gaps">
          <StyledDiv
            isActive={activeTab === "/gaps"}
            onClick={() => changeTab("/gaps")}
          >
            <StyledHeading variant="h6">
              <HeightIcon style={{ transform: "rotate(90deg)" }} />
              Gaps
            </StyledHeading>
          </StyledDiv>
        </StyledLink>
      </Item>
      <Item sx={{ width: "100%" }}>
        <StyledLink href="/export">
          <StyledDiv
            isActive={activeTab === "/export"}
            onClick={() => changeTab("/export")}
          >
            <StyledHeading variant="h6">
              <SaveAltIcon />
              Export
            </StyledHeading>
          </StyledDiv>
        </StyledLink>
      </Item>
    </StyledContainer>
  );
};

export default TabBox;
