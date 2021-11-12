import React, { useReducer } from "react";
import type { NextPage } from "next";
import { CSVLink } from "react-csv";
import {
  Compact,
  ChartContainer,
  LineChart,
  Button,
  FilterSelect,
} from "../../components";

import { getEligibilityData } from "../../src/frontend/api";
import { EligibilityReducer } from "../../state";
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

const Home: NextPage = () => {
  const [eligibilityNotation, setEligibilityNotation] = React.useState(false);
  const [eligibilityData, setEligibilityData] = React.useState();
  const populateEligibilityData = async () => {
    const keys: string[] = [
      ...getFilters("programFilters"),
      ...getFilters("otherFilters"),
    ];

    try {
      const response: any = await getEligibilityData(keys);
      setEligibilityData(response);
    } catch (error) {
      console.log(error);
    }
  };

  const initialArg: FiltersBaseState = {
    programFilters: ProgramStateObject,
    otherFilters: OtherStateObject,
    selectedFilterType: "programFilters",
  };

  const [state, dispatch] = useReducer(EligibilityReducer, initialArg);
  React.useEffect(() => {
    populateEligibilityData();
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
    <main>
      <Compact>
        <ChartContainer
          checked={eligibilityNotation}
          setChecked={setEligibilityNotation}
          labels={["Percent", "Number"]}
          title="Eligibility Over Time"
          checkboxes={checkboxes}
          getData={populateEligibilityData}
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
              data={Array.isArray(eligibilityData) ? eligibilityData : []}
              filename={"eligibility-line-chart.csv"}
              target="_blank"
            >
              <Button variant="outlined" color="primary">
                Export
              </Button>
            </CSVLink>
          }
        >
          <LineChart
            keyName={eligibilityNotation ? "number" : "percentage"}
            dataFromProps={eligibilityData}
          />
        </ChartContainer>
      </Compact>
    </main>
  );
};

export default Home;
