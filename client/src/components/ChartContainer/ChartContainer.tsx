import { Grid, styled, GridProps, Typography } from "@mui/material";
import { Switch } from "../";

const StyledMainContainer = styled(Grid)(({ theme }) => ({
  margin: `${theme.spacing(6)} 0px`,
}));

const StyledChartItemContainer = styled(Grid)(({ theme }) => ({
  backgroundColor: "white",
  minHeight: "500px",
  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
}));

const StyledHeadingContainer = styled(Grid)(({ theme }) => ({
  backgroundColor: "white",
  padding: theme.spacing(4),
  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
}));

const SwitchContainer = styled(Grid)(() => ({
  textAlign: "right",
}));

interface ContainerProps extends GridProps {
  labels: string[];
  checked: boolean;
  setChecked: Function;
}

const ChartContainer = (props: ContainerProps) => {
  const { children, labels, checked, setChecked } = props;
  return (
    <StyledMainContainer container>
      <Grid container>
        <StyledHeadingContainer item xs={9}>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="h4">Eligibility Over Time</Typography>
            </Grid>
            <SwitchContainer item xs={6}>
              <Switch
                labels={labels}
                checked={checked}
                setChecked={setChecked}
              />
            </SwitchContainer>
          </Grid>
        </StyledHeadingContainer>
      </Grid>
      <Grid container>
        <StyledChartItemContainer item xs={9}>
          {children}
        </StyledChartItemContainer>
        <Grid item xs={3}></Grid>
      </Grid>
    </StyledMainContainer>
  );
};

export default ChartContainer;
