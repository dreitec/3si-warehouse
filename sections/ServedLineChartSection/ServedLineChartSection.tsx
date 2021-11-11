import React, { useReducer } from "react";
import { CSVLink } from "react-csv";
import {
  ChartContainer,
  LineChart,
  FilterCheckboxes,
  Button,
} from "../../components";
import { getServedData } from "../../src/frontend/api";
import { ServedReducer } from "../../state";
import { FiltersBaseState } from "../../src/frontend/Interfaces";
import {
  UPDATE_PROGRAM_FILTERS,
  UPDATE_FILTER_TYPE,
  UPDATE_OTHER_FILTERS,
} from "../../state/types";
import {
  ProgramStateObject,
  ProgramOptionTree,
  OtherStateObject,
  OtherOptionTree,
} from "../../src/frontend/Constants";

const EligibilityLineGraphSection = () => {
  const [servedNotation, setServedNotation] = React.useState(false);
  const [servedData, setServedData] = React.useState();
  const populateServedData = async (keys?: string[]) => {
    try {
      const response: any = await getServedData(keys);
      setServedData(response);
    } catch (error) {
      console.log(error);
    }
  };

  const initialArg: FiltersBaseState = {
    programFilters: ProgramStateObject,
    otherFilters: OtherStateObject,
    selectedFilterType: "programFilters",
  };

  const [state, dispatch] = useReducer(ServedReducer, initialArg);
  React.useEffect(() => {
    populateServedData();
  }, []);
  const checkboxes = [
    <FilterCheckboxes
      key="children-served-line-chart"
      data={
        state.selectedFilterType === "programFilters"
          ? ProgramOptionTree
          : OtherOptionTree
      }
      state={
        state.selectedFilterType === "programFilters"
          ? state.programFilters
          : state.otherFilters
      }
      setState={(payload: any) =>
        dispatch({
          type:
            state.selectedFilterType === "programFilters"
              ? UPDATE_PROGRAM_FILTERS
              : UPDATE_OTHER_FILTERS,
          payload,
        })
      }
    />,
  ];
  return (
    <ChartContainer
      checked={servedNotation}
      setChecked={setServedNotation}
      labels={["Percent", "Number"]}
      title="Served Over Time"
      selectFiltersType={(payload: string) =>
        dispatch({ type: UPDATE_FILTER_TYPE, payload })
      }
      selectedFilterType={state.selectedFilterType}
      checkboxes={checkboxes}
      getData={populateServedData}
      exportButton={
        <CSVLink
          data={Array.isArray(servedData) ? servedData : []}
          filename={"served-line-chart.csv"}
          target="_blank"
        >
          <Button variant="outlined" color="primary">
            Export
          </Button>
        </CSVLink>
      }
    >
      <LineChart
        keyName={servedNotation ? "number" : "percentage"}
        dataFromProps={servedData}
      />
    </ChartContainer>
  );
};
export default EligibilityLineGraphSection;
