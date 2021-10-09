import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import { Grid, Typography, styled } from "@material-ui/core";

const StyledContainer = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(8),
}));

const StyledBoxItem = styled(Grid)(({ theme }) => {
  return {
    color: "#376EFF",
    border: `4px solid #376EFF`,
    textAlign: "center",
    padding: theme.spacing(4),
    "& > svg": {
      fontSize: "4rem",
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

const SytledGrid = styled(Grid)(({ theme }) => ({
  justifyContent: "space-between",
  [theme.breakpoints.down("sm")]: {
    justifyContent: "center",
  },
}));
interface Props {
  active?: boolean;
}

const TabBox = (props: Props) => {
  return (
    <StyledContainer>
      <SytledGrid container>
        <StyledBoxItem item xs={12} sm={5} md={2}>
          <PeopleOutlineIcon fontSize="large" />
          <StyledHeading variant="h6">Eligibility</StyledHeading>
        </StyledBoxItem>
        <StyledBoxItem item xs={12} sm={5} md={2}>
          <PeopleOutlineIcon fontSize="large" />
          <StyledHeading variant="h6">Service</StyledHeading>
        </StyledBoxItem>
        <StyledBoxItem item xs={12} sm={5} md={2}>
          <PeopleOutlineIcon fontSize="large" />
          <StyledHeading variant="h6">Provider</StyledHeading>
        </StyledBoxItem>
        <StyledBoxItem item xs={12} sm={5} md={2}>
          <PeopleOutlineIcon fontSize="large" />
          <StyledHeading variant="h6">Gaps</StyledHeading>
        </StyledBoxItem>
        <StyledBoxItem item xs={12} sm={5} md={2}>
          <PeopleOutlineIcon fontSize="large" />
          <StyledHeading variant="h6">Export</StyledHeading>
        </StyledBoxItem>
      </SytledGrid>
    </StyledContainer>
  );
};

export default TabBox;
