import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import { Grid, Typography, styled } from "@material-ui/core";

const StyledContainer = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(8),
}));

const StyledBoxItem = styled(Grid)(({ theme }) => {
  return {
    color: theme.palette.primary.main,
    border: `4px solid ${theme.palette.primary.main}`,
    textAlign: "center",
    padding: theme.spacing(4),
    "& > svg": {
      fontSize: "4rem",
    },
    backgroundColor: "white",
  };
});

const StyledHeading = styled(Typography)(() => ({
  width: "100%",
}));

interface Props {
  active?: boolean;
}

const TabBox = (props: Props) => {
  return (
    <StyledContainer>
      <Grid container justifyContent="space-between">
        <StyledBoxItem item xs={4} md={2}>
          <PeopleOutlineIcon fontSize="large" />
          <StyledHeading variant="h6">Eligibility</StyledHeading>
        </StyledBoxItem>
        <StyledBoxItem item xs={4} md={2}>
          <PeopleOutlineIcon fontSize="large" />
          <StyledHeading variant="h6">Service</StyledHeading>
        </StyledBoxItem>
        <StyledBoxItem item xs={4} md={2}>
          <PeopleOutlineIcon fontSize="large" />
          <StyledHeading variant="h6">Provider</StyledHeading>
        </StyledBoxItem>
        <StyledBoxItem item xs={4} md={2}>
          <PeopleOutlineIcon fontSize="large" />
          <StyledHeading variant="h6">Gaps</StyledHeading>
        </StyledBoxItem>
        <StyledBoxItem item xs={4} md={2}>
          <PeopleOutlineIcon fontSize="large" />
          <StyledHeading variant="h6">Export</StyledHeading>
        </StyledBoxItem>
      </Grid>
    </StyledContainer>
  );
};

export default TabBox;
