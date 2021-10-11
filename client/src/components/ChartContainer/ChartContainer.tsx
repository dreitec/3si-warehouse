import { Grid, styled, GridProps, Typography } from "@mui/material";
import { Switch, FilterRadioGroup, FilterCheckboxes } from "../";

const StyledMainContainer = styled(Grid)(({ theme }) => ({
  margin: `${theme.spacing(6)} 0px`,
}));

const StyledChartItemContainer = styled(Grid)(({ theme }) => ({
  backgroundColor: "white",
  minHeight: "500px",
  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
}));

const StyledCheckBoxesContainer = styled(Grid)(({ theme }) => ({
  marginTop: "-60px",
  padding: `${theme.spacing(2)}  0px ${theme.spacing(2)}  ${theme.spacing(2)}`,
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
        <StyledHeadingContainer item xs={8}>
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
        <StyledChartItemContainer item xs={8}>
          {children}
        </StyledChartItemContainer>
        <StyledCheckBoxesContainer item xs={4}>
          <FilterRadioGroup />
          <FilterCheckboxes />
        </StyledCheckBoxesContainer>
      </Grid>
    </StyledMainContainer>
  );
};

export default ChartContainer;