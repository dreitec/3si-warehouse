import React, { useReducer, useEffect, useState } from "react";
import { ChartContainer, Choropleth, FilterCheckboxes } from "../../components";
import { getGeographicalEligibilityData } from "../../api";
import { GeographicalEligibilityReducer } from "../../state";
import { GeographicalEligibilityState } from "../../interfaces";
import {
  UPDATE_PROGRAM_FILTERS,
  UPDATE_BY_TYPE,
  UPDATE_FILTER_TYPE,
  UPDATE_OTHER_FILTERS,
} from "../../state/types";
import {
  StateObject as SelectedProgramsStateObject,
  ProgramOptionTree,
} from "../../Constants/ProgramChecks";
import {
  OtherStateObject as SelectedOtherStateObject,
  OtherOptionTree,
} from "../../Constants/OtherChecks";
interface Props {}

const GeographicalELigibility = (props: Props) => {
  const [
    geographicalEligibilityData,
    setGeographicalEligibilityData,
  ] = useState([]);
  const initialArg: GeographicalEligibilityState = {
    programFilters: SelectedProgramsStateObject,
    otherFilters: SelectedOtherStateObject,
    selectedFilterType: "programFilters",
    selectedOption: "county",
  };
  const [state, dispatch] = useReducer(
    GeographicalEligibilityReducer,
    initialArg
  );
  const populateGeographicalEligibilityData = async () => {
    const keys: string[] =
      getFilters(
        state.selectedFilterType === "programFilters"
          ? "programFilters"
          : "otherFilters"
      ) || [];
    try {
      const response: any = await getGeographicalEligibilityData(
        state.selectedOption,
        keys
      );
      setGeographicalEligibilityData(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    populateGeographicalEligibilityData();
  }, []);

  useEffect(() => {
    populateGeographicalEligibilityData();
  }, [state.selectedOption]);

  const getFilters = (key: "programFilters" | "otherFilters") => {
    const notRequired = ["sp", "all"];
    return Object.keys(state[key]).filter(
      (elem: string) => state[key][elem] === true && !notRequired.includes(elem)
    );
  };

  const checkboxes = [
    <FilterCheckboxes
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
      showButton={false}
      title="Eligibility Geographically"
      selectFiltersType={(payload: string) =>
        dispatch({ type: UPDATE_FILTER_TYPE, payload })
      }
      selectedFilterType={state.selectedFilterType}
      checkboxes={checkboxes}
      getData={populateGeographicalEligibilityData}
    >
      <Choropleth
        dataFromProps={geographicalEligibilityData}
        selectedType={state.selectedOption}
        selectedRadioOption={state.selectedOption}
        selectRadioOption={(payload: string) =>
          dispatch({ type: UPDATE_BY_TYPE, payload })
        }
        options={{ name: "% Children Eligible", property: "percentage" }}
      />
    </ChartContainer>
  );
};

export default GeographicalELigibility;
