import { Grid, styled, GridProps, Typography } from "@mui/material";
import { Switch, FilterRadioGroup, Button } from "../";

const StyledMainContainer = styled(Grid)(({ theme }) => ({
  margin: `${theme.spacing(6)} 0px `,
}));

const StyledChartItemContainer = styled(Grid)(({ theme }) => ({
  backgroundColor: "white",
  minHeight: "500px",
  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
}));

const StyledCheckBoxesContainer = styled(Grid)(({ theme }) => ({
  marginTop: "-60px",
  padding: `${theme.spacing(0)}  0px ${theme.spacing(2)}  ${theme.spacing(2)}`,
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
  labels?: string[];
  checked?: boolean;
  setChecked?: Function;
  title: string;
  showButton?: boolean;
  selectFiltersType: Function;
  selectedFilterType: string;
  checkboxes: React.ReactNode;
  getData: Function;
}

const renderSwitch = (
  labels: string[],
  checked: boolean,
  setChecked: Function
) => {
  return <Switch labels={labels} checked={checked} setChecked={setChecked} />;
};

const ChartContainer = (props: ContainerProps) => {
  const {
    children,
    labels = [],
    checked = false,
    setChecked = () => {},
    title,
    showButton = true,
    selectFiltersType,
    selectedFilterType,
    checkboxes,
    getData,
  } = props;

  return (
    <StyledMainContainer container>
      <Grid container>
        <StyledHeadingContainer item xs={8}>
          <Grid container>
            <Grid item xs={showButton ? 6 : 12}>
              <Typography variant="h4">{title}</Typography>
            </Grid>
            <SwitchContainer item xs={6}>
              {showButton && renderSwitch(labels, checked, setChecked)}
            </SwitchContainer>
          </Grid>
        </StyledHeadingContainer>
      </Grid>
      <Grid container>
        <StyledChartItemContainer item xs={8}>
          {children}
        </StyledChartItemContainer>
        <StyledCheckBoxesContainer item xs={4}>
          <FilterRadioGroup
            name={`filtertype-${title.replace(/ /g, "")}`}
            options={[
              { value: "programFilters", text: "Program Types" },
              { value: "otherFilters", text: "Other Types" },
            ]}
            selected={selectedFilterType}
            setSelected={selectFiltersType}
          />
          {checkboxes}
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              getData();
            }}
          >
            Submit
          </Button>
        </StyledCheckBoxesContainer>
      </Grid>
    </StyledMainContainer>
  );
};

export default ChartContainer;
