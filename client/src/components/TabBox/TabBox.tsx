import React from "react";

import {
  PeopleOutline as PeopleOutlineIcon,
  PieChart as PieChartIcon,
  Map as MapIcon,
  Height as HeightIcon,
  SaveAlt as SaveAltIcon,
} from "@mui/icons-material";
import { Grid, Typography, styled, Theme } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

interface StyledDivProps extends React.HTMLAttributes<HTMLDivElement> {
  active: boolean;
  theme: Theme;
}

const StyledContainer = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(8),
}));

const StyledDiv = styled("div")((props: StyledDivProps) => {
  const { active, theme } = props;
  return {
    color: active ? `#376EFF` : theme.palette.primary.dark,
    border: active ? `4px solid #376EFF` : `1px solid #C3C7D5`,
    textAlign: "center",
    padding: theme.spacing(4),
    "& > svg": {
      fontSize: "3rem",
    },
    "&:hover": {
      color: "#376EFF",
      border: `4px solid #376EFF`,
    },
    backgroundColor: "white",
    [theme.breakpoints.down("sm")]: {
      border: `3px solid #376EFF`,
      fontSize: "2rem",
      margin: theme.spacing(2),
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "1rem",
      margin: theme.spacing(1),
    },
  };
});

const StyledHeading = styled(Typography)(() => ({
  width: "100%",
}));

const StyledGrid = styled(Grid)(({ theme }) => ({
  justifyContent: "space-between",
  [theme.breakpoints.down("sm")]: {
    justifyContent: "center",
  },
}));
const StyledLink = styled(Link)(() => ({
  textDecoration: "none",
}));
interface Props {
  active?: boolean;
}

const TabBox = (props: Props) => {
  const location = useLocation();
  const [activeTab, setActiveTab] = React.useState(location.pathname);

  const changeTab = (path: string) => {
    setActiveTab(path);
  };

  return (
    <StyledContainer>
      <StyledGrid container>
        <Grid item xs={12} sm={5} md={2}>
          <StyledLink to="/">
            <StyledDiv
              active={activeTab === "/"}
              onClick={() => changeTab("/")}
            >
              <PeopleOutlineIcon />
              <StyledHeading variant="h6">Eligibility</StyledHeading>
            </StyledDiv>
          </StyledLink>
        </Grid>
        <Grid item xs={12} sm={5} md={2}>
          <StyledLink to="/service">
            <StyledDiv
              active={activeTab === "/service"}
              onClick={() => changeTab("/service")}
            >
              <PieChartIcon />
              <StyledHeading variant="h6">Service</StyledHeading>
            </StyledDiv>
          </StyledLink>
        </Grid>
        <Grid item xs={12} sm={5} md={2}>
          <StyledLink to="/providers">
            <StyledDiv
              active={activeTab === "/providers"}
              onClick={() => changeTab("/providers")}
            >
              <MapIcon />
              <StyledHeading variant="h6">Provider</StyledHeading>
            </StyledDiv>
          </StyledLink>
        </Grid>
        <Grid item xs={12} sm={5} md={2}>
          <StyledLink to="/gaps">
            <StyledDiv
              active={activeTab === "/gaps"}
              onClick={() => changeTab("/gaps")}
            >
              <HeightIcon style={{ transform: "rotate(90deg)" }} />
              <StyledHeading variant="h6">Gaps</StyledHeading>
            </StyledDiv>
          </StyledLink>
        </Grid>
        <Grid item xs={12} sm={5} md={2}>
          <StyledLink to="/export">
            <StyledDiv
              active={activeTab === "/export"}
              onClick={() => changeTab("/export")}
            >
              <SaveAltIcon />
              <StyledHeading variant="h6">Export</StyledHeading>
            </StyledDiv>
          </StyledLink>
        </Grid>
      </StyledGrid>
    </StyledContainer>
  );
};

export default TabBox;
