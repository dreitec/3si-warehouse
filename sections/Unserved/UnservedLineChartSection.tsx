import React, { useReducer } from "react";
import { CSVLink } from "react-csv";
import {
  ChartContainer,
  LineChart,
  FilterSelect,
  Button,
} from "../../components";
import { getUnservedDataOverTime } from "../../src/frontend/api";
import { ServedReducer } from "../../state";
import { FiltersBaseState } from "../../src/frontend/Interfaces";
import {
  UPDATE_PROGRAM_FILTERS,
  UPDATE_OTHER_FILTERS,
} from "../../state/types";
import {
  ProgramOptionTree,
  ProgramStateObject,
  AgeStateObject,
  AgeOptionTree,
} from "../../src/frontend/Constants";

const headers = [
  {
    label: "Number",
    key: "number",
  },
  {
    label: "Percentage",
    key: "percentage",
  },
  {
    label: "Date",
    key: "group",
  },
];

const EligibilityLineGraphSection = () => {
  const [servedNotation, setServedNotation] = React.useState(false);
  const [servedData, setServedData] = React.useState();
  const [loading, setLoading] = React.useState(false);

  const populateServedData = async () => {
    setLoading(true);
    const keys: string[] = [
      ...getFilters("programFilters"),
      ...getFilters("otherFilters"),
    ];
    try {
      const response: any = await getUnservedDataOverTime(keys);
      setServedData(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const initialArg: FiltersBaseState = {
    programFilters: ProgramStateObject,
    otherFilters: AgeStateObject,
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
      name="Age Filters"
      data={AgeOptionTree}
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
      title="Children Served Over Time"
      checkboxes={checkboxes}
      getData={populateServedData}
      loading={loading}
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
          headers={headers}
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
        toggle={{
          checked: servedNotation,
          onToggle: setServedNotation,
          labels: ["Percent", "Number"],
        }}
      />
    </ChartContainer>
  );
};
export default EligibilityLineGraphSection;
