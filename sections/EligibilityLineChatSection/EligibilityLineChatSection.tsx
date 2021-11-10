import React, { useReducer } from "react";
import type { NextPage } from "next";
import {
  Compact,
  ChartContainer,
  LineChart,
  FilterCheckboxes,
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
    const keys: string[] =
      getFilters(
        state.selectedFilterType === "programFilters"
          ? "programFilters"
          : "otherFilters"
      ) || [];
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
    <FilterCheckboxes
      key="program-filters-line"
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
    <main>
      <Compact>
        <ChartContainer
          checked={eligibilityNotation}
          setChecked={setEligibilityNotation}
          labels={["Percent", "Number"]}
          title="Eligibility Over Time"
          selectFiltersType={(payload: string) =>
            dispatch({ type: UPDATE_FILTER_TYPE, payload })
          }
          selectedFilterType={state.selectedFilterType}
          checkboxes={checkboxes}
          getData={populateEligibilityData}
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
