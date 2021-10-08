import {
  AppBar,
  Box,
  Toolbar,
  Grid,
  Typography,
  styled,
  Link as MUILink,
} from "@mui/material";
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

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        style={{
          background: "transparent",
          boxShadow: "none",
          padding: "40px 0px",
        }}
      >
        <Toolbar>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                <StyledBrand href="#">
                  Third <StyledBoldSpan> Sector Intelligence </StyledBoldSpan>
                </StyledBrand>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Grid container direction="row" justifyContent="flex-end">
                <Grid item xs={3}>
                  <Typography variant="h6" component="p" align="right">
                    <Link href="#">Key insights </Link>
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="h6" component="p" align="right">
                    <Link href="#">Export</Link>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
