import React from "react";
import Grid from "@mui/material/Grid";
import { Button, Link } from "..";
import NavigationData from "../../src/frontend/Constants/BottomNavigation";
import { useRouter } from "next/router";

const BottomNavigation = () => {
  const router = useRouter();
  const {
    prevDisabled,
    prevLabel,
    prevLink,
    nextDisabled,
    nextLabel,
    nextLink,
  } = NavigationData[router.pathname];
  return (
    <Grid container justifyContent="space-between" sx={{ paddingTop: 5 }}>
      <Grid item xs={4}>
        {!prevDisabled && (
          <Link
            href={prevLink}
            color="primary"
            active={false}
            variant="buttoned"
          >
            <Button
              disabled={prevDisabled}
              fullWidth
              variant="contained"
            >{`PREVIOUS: ${prevLabel}`}</Button>
          </Link>
        )}
      </Grid>
      <Grid item xs={4}>
        {!nextDisabled && (
          <Link
            href={nextLink}
            color="primary"
            active={false}
            variant="buttoned"
            textAlign="right"
          >
            <Button
              disabled={nextDisabled}
              fullWidth
              variant="contained"
            >{`NEXT: ${nextLabel}`}</Button>
          </Link>
        )}
      </Grid>
    </Grid>
  );
};

export default BottomNavigation;
