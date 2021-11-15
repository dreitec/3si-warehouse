import React, { useReducer } from "react";
import { CSVLink } from "react-csv";
import {
  ChartContainer,
  LineChart,
  FilterSelect,
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
  const populateServedData = async () => {
    const keys: string[] = [
      ...getFilters("programFilters"),
      ...getFilters("otherFilters"),
    ];
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

  const getFilters = (key: "programFilters" | "otherFilters") => {
    const notRequired = ["sp", "all"];
    return Object.keys(state[key]).filter(
      (elem: string) => state[key][elem] === true && !notRequired.includes(elem)
    );
  };

  const checkboxes = [
    <FilterSelect
      key="filter-program-check"
      name="Program Filters"
      data={ProgramOptionTree}
      selected={state.programFilters}
      setState={(payload: any) =>
        dispatch({
          type: UPDATE_PROGRAM_FILTERS,
          payload,
        })
      }
    />,
    <FilterSelect
      key="filter-other-check"
      name="Other Filters"
      data={OtherOptionTree}
      selected={state.otherFilters}
      setState={(payload: any) =>
        dispatch({
          type: UPDATE_OTHER_FILTERS,
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
      checkboxes={checkboxes}
      getData={populateServedData}
      selectedFilters={{ ...state.programFilters, ...state.otherFilters }}
      programDelete={(filterValue: any) =>
        dispatch({
          type: UPDATE_PROGRAM_FILTERS,

          payload: { [filterValue]: false },
        })
      }
      otherDelete={(filterValue: any) =>
        dispatch({
          type: UPDATE_OTHER_FILTERS,
          payload: { [filterValue]: false },
        })
      }
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
