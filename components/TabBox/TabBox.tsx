import React from "react";

import {
  PieChart as PieChartIcon,
  Map as MapIcon,
  Height as HeightIcon,
} from "@mui/icons-material";
import PersonSearchOutlinedIcon from "@mui/icons-material/PersonSearchOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import { Typography, styled, Theme, Box, BoxProps } from "@mui/material";
import Link from "next/link";
import { Link as CommonLink } from "../";
import { useRouter } from "next/router";
import Container from "@mui/material/Container";

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

const StyledLink = styled(Link)(() => ({
  textDecoration: "none",
}));
const SubLinksContainer = styled(Container)(() => ({
  backgroundColor: "white",
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

const GetSubMenu = (path: string) => {
  if (path.includes("/eligibility")) {
    return (
      <SubLinksContainer>
        <CommonLink
          href="/eligibility"
          color="primary"
          active={path === "/eligibility"}
          variant="spaced"
        >
          Eligibility Over Time
        </CommonLink>
        <CommonLink
          href="/eligibility/geographically"
          color="primary"
          active={path === "/eligibility/geographically"}
          variant="spaced"
        >
          Eligibility Geographically
        </CommonLink>
      </SubLinksContainer>
    );
  } else if (path.includes("/providers")) {
    return (
      <SubLinksContainer>
        <CommonLink
          href="/providers"
          color="primary"
          active={path === "/providers"}
          variant="spaced"
        >
          Provider Capacity Over Time
        </CommonLink>
        <CommonLink
          href="/providers/sites"
          color="primary"
          active={path === "/providers/sites"}
          variant="spaced"
        >
          Provider Sites
        </CommonLink>
      </SubLinksContainer>
    );
  } else if (path.includes("/service")) {
    return (
      <SubLinksContainer>
        <CommonLink
          href="/service"
          color="primary"
          active={path === "/service"}
          variant="spaced"
        >
          Children Served Over Time
        </CommonLink>
        <CommonLink
          href="/service/geographically"
          color="primary"
          active={path === "/service/geographically"}
          variant="spaced"
        >
          Children Served by Geography
        </CommonLink>
      </SubLinksContainer>
    );
  } else if (path.includes("/gaps")) {
    return (
      <SubLinksContainer>
        <CommonLink
          href="/gaps"
          color="primary"
          active={path === "/gaps"}
          variant="spaced"
        >
          Children Unserved
        </CommonLink>
        <CommonLink
          href="/gaps/risk"
          color="primary"
          active={path === "/gaps/risk"}
          variant="spaced"
        >
          Unserved Children by Risk Factor
        </CommonLink>
        <CommonLink
          href="/gaps/unserved"
          color="primary"
          active={path === "/gaps/unserved"}
          variant="spaced"
        >
          Service Gaps Over Time
        </CommonLink>
        <CommonLink
          href="/gaps/geographically"
          color="primary"
          active={path === "/gaps/geographically"}
          variant="spaced"
        >
          Service Gaps Geographically
        </CommonLink>
      </SubLinksContainer>
    );
  }
};

const TabBox = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState("/");

  React.useEffect(() => {
    setActiveTab(router.pathname);
  }, [router.pathname]);

  return (
    <>
      <StyledContainer
        sx={{ display: "flex", bgcolor: "transparent", padding: 0 }}
      >
        <Item sx={{ width: "100%" }}>
          <StyledLink href="/population">
            <StyledDiv isActive={activeTab.includes("/population")}>
              <StyledHeading variant="h6">
                <GroupsOutlinedIcon />
                Population
              </StyledHeading>
            </StyledDiv>
          </StyledLink>
        </Item>
        <Item sx={{ width: "100%" }}>
          <StyledLink href="/eligibility">
            <StyledDiv isActive={activeTab.includes("/eligibility")}>
              <StyledHeading variant="h6">
                <PersonSearchOutlinedIcon />
                Eligibility
              </StyledHeading>
            </StyledDiv>
          </StyledLink>
        </Item>
        <Item sx={{ width: "100%" }}>
          <StyledLink href="/providers">
            <StyledDiv isActive={activeTab.includes("/providers")}>
              <StyledHeading variant="h6">
                <MapIcon />
                Providers
              </StyledHeading>
            </StyledDiv>
          </StyledLink>
        </Item>
        <Item sx={{ width: "100%" }}>
          <StyledLink href="/service">
            <StyledDiv isActive={activeTab.includes("/service")}>
              <StyledHeading variant="h6">
                <PieChartIcon />
                Service
              </StyledHeading>
            </StyledDiv>
          </StyledLink>
        </Item>
        <Item sx={{ width: "100%" }}>
          <StyledLink href="/gaps">
            <StyledDiv isActive={activeTab.includes("/gaps")}>
              <StyledHeading variant="h6">
                <HeightIcon style={{ transform: "rotate(90deg)" }} />
                Gaps
              </StyledHeading>
            </StyledDiv>
          </StyledLink>
        </Item>
      </StyledContainer>
      {GetSubMenu(activeTab)}
    </>
  );
};

export default TabBox;
