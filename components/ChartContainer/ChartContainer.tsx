import Grid, { GridProps } from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import styled from "@mui/system/styled";
import { Switch, Button } from "../";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import {
  ProgramValueToTextObject,
  OtherValueToText,
  SitesValueToTextObject,
} from "../../src/frontend/Constants";
import { Filters } from "../../src/frontend/Interfaces";

const StyledMainContainer = styled(Grid)(({ theme }) => ({
  margin: `${theme.spacing(6)} 0px `,
}));

const StyledChartItemContainer = styled(Grid)(({ theme }) => ({
  backgroundColor: "white",
  minHeight: "500px",
  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
  maxHeight: "600px",
}));

const StyledHeadingContainer = styled(Grid)(({ theme }) => ({
  backgroundColor: "white",
  padding: theme.spacing(4),
  boxShadow:
    "12px 0 15px -4px rgba(149, 157, 165, 0.2), -12px 0 8px -4px rgba(149, 157, 165, 0.2)",
}));
const WhiteBgGrid = styled(Grid)(({ theme }) => ({
  backgroundColor: "white",
  boxShadow:
    "12px 0 15px -4px rgba(149, 157, 165, 0.2), -12px 0 8px -4px rgba(149, 157, 165, 0.2)",
}));

const SwitchContainer = styled(Grid)(() => ({
  textAlign: "right",
}));

interface ContainerProps extends GridProps {
  title: string;
  checkboxes: React.ReactNode;
  getData: Function;
  showOptionSelector?: boolean;
  exportButton?: React.ReactNode;
  selectedFilters: Filters;
  programDelete?: Function;
  otherDelete?: Function;
}

const StyledStack = styled(Stack)(() => ({
  flexWrap: "wrap",
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const ChartContainer = (props: ContainerProps) => {
  const {
    children,
    title,
    checkboxes,
    getData,
    exportButton,
    selectedFilters,
    programDelete,
    otherDelete,
  } = props;

  const selectedKeys = Object.keys(selectedFilters).filter(
    (elem: string) => selectedFilters[elem]
  );

  return (
    <StyledMainContainer container>
      <Grid container>
        <StyledHeadingContainer item xs={12}>
          <Grid container>
            <Grid item xs={exportButton ? 6 : 12}>
              <Typography variant="h4">{title}</Typography>
            </Grid>
            <SwitchContainer item xs={4} />
            {exportButton && (
              <SwitchContainer item xs={2}>
                {exportButton}
              </SwitchContainer>
            )}
          </Grid>
        </StyledHeadingContainer>
        <WhiteBgGrid item xs={12}>
          {checkboxes}
          <Button
            variant="outlined"
            sx={{ margin: "15%" }}
            onClick={() => getData()}
          >
            Update
          </Button>
        </WhiteBgGrid>
        <WhiteBgGrid item xs={12}>
          <StyledStack direction="row">
            {selectedKeys.map((elem: any) => {
              if (ProgramValueToTextObject[elem]) {
                return (
                  <StyledChip
                    key={elem}
                    label={`Programs: ${ProgramValueToTextObject[elem]}`}
                    variant="outlined"
                    onDelete={() => programDelete && programDelete(elem)}
                    color="primary"
                  />
                );
              } else if (OtherValueToText[elem]) {
                return (
                  <StyledChip
                    key={elem}
                    label={`Others: ${OtherValueToText[elem]}`}
                    variant="outlined"
                    onDelete={() => otherDelete && otherDelete(elem)}
                    color="primary"
                  />
                );
              } else if (SitesValueToTextObject[elem]) {
                return (
                  <StyledChip
                    key={elem}
                    label={`Sites: ${SitesValueToTextObject[elem]}`}
                    variant="outlined"
                    onDelete={() => otherDelete && otherDelete(elem)}
                    color="primary"
                  />
                );
              }
            })}
          </StyledStack>
        </WhiteBgGrid>
      </Grid>
      <Grid container>
        <StyledChartItemContainer item xs={12}>
          {children}
        </StyledChartItemContainer>
      </Grid>
    </StyledMainContainer>
  );
};

export default ChartContainer;
