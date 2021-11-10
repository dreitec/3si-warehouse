import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Grid from "@mui/material/Grid";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import MUILink from "@mui/material/Link";
import Box from "@mui/material/Box";
import styled from "@mui/system/styled";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "../";

const StyledBrand = styled(MUILink)(() => ({
  textDecoration: "none",
  letterSpacing: 1,
  fontSize: "1.75rem",
}));

const StyledBoldSpan = styled("span")(() => ({
  fontWeight: "bold",
  letterSpacing: 1,
}));
const StyledListItem = styled(ListItem)(({ theme }) => ({
  padding: `0px ${theme.spacing(1)}`,
  marginBottom: theme.spacing(2),
  "& > p": {
    width: "100%",
    "& > a": {
      width: "100%",
      display: "block",
      textAlign: "center",
      borderBottom: "3px solid white",
    },
  },
}));

export default function Navbar() {
  const [state, setState] = React.useState({
    drawerActivate: false,
    drawer: false,
  });

  React.useEffect(() => {
    if (window.innerWidth <= 980) {
      setState({ ...state, drawerActivate: true });
    }

    window.addEventListener("resize", () => {
      if (window.innerWidth <= 980) {
        setState({ ...state, drawerActivate: true });
      } else {
        setState({ ...state, drawerActivate: false });
      }
    });
  }, []);

  const handleToggle = (drawer: boolean) => {
    setState({ ...state, drawer });
  };

  //Small Screens
  function createDrawer() {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{
            background: "transparent",
            boxShadow: "none",
            padding: "40px 0px",
          }}
        >
          <Toolbar>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <MenuIcon
                sx={{
                  padding: 0,
                  color: "primary.main",
                  cursor: "pointer",
                }}
                onClick={() => {
                  handleToggle(true);
                }}
              />

              <StyledBrand href="#">
                Third <StyledBoldSpan> Sector Intelligence </StyledBoldSpan>
              </StyledBrand>
              <Typography color="inherit" variant="h6"></Typography>
            </Grid>
          </Toolbar>
        </AppBar>

        <SwipeableDrawer
          open={state.drawer}
          onClose={() => {
            handleToggle(false);
          }}
          onOpen={() => {
            handleToggle(true);
          }}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={() => {
              handleToggle(false);
            }}
            onKeyDown={() => {
              handleToggle(false);
            }}
          >
            <List
              sx={{
                width: 200,
              }}
            >
              <StyledListItem>
                <Link href="#" align="left">
                  Key insights
                </Link>
              </StyledListItem>
              <StyledListItem>
                <Link href="#" align="left">
                  Export
                </Link>
              </StyledListItem>
            </List>
          </div>
        </SwipeableDrawer>
      </Box>
    );
  }

  //Larger Screens
  function destroyDrawer() {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{
            background: "transparent",
            boxShadow: "none",
            padding: "40px 0px",
          }}
        >
          <Toolbar>
            <Grid container>
              <Grid item xs={6}>
                <Typography variant="h4" component="div">
                  <StyledBrand href="#">
                    Third <StyledBoldSpan> Sector Intelligence </StyledBoldSpan>
                  </StyledBrand>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Grid container direction="row" justifyContent="flex-end">
                  <Grid item xs={3}>
                    <Link href="#" align="right">
                      Key insights
                    </Link>
                  </Grid>
                  <Grid item xs={3}>
                    <Link href="#" align="right">
                      Export
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>{" "}
          </Toolbar>
        </AppBar>
      </Box>
    );
  }

  return <div>{state.drawerActivate ? createDrawer() : destroyDrawer()}</div>;
}
