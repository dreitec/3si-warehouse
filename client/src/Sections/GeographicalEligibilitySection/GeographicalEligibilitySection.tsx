import React, { useReducer, useEffect, useState } from "react";
import { ChartContainer, Choropleth } from "../../components";
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
  const populateGeographicalEligibilityData = async (keys?: string[]) => {
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

  console.log(state, "GeographicalEligibilityState");
  useEffect(() => {
    populateGeographicalEligibilityData();
  }, []);

  useEffect(() => {
    const getFilters = () => {
      const notRequired = ["sp", "all"];
      return Object.keys(state.programFilters).filter(
        (elem) =>
          state.programFilters[elem] === true && !notRequired.includes(elem)
      );
    };

    populateGeographicalEligibilityData(getFilters());
  }, [state.selectedOption]);

  return (
    <ChartContainer
      showButton={false}
      title="Eligibility Geographically"
      getData={populateGeographicalEligibilityData}
      checkBoxTree={
        state.selectedFilterType === "programFilters"
          ? ProgramOptionTree
          : OtherOptionTree
      }
      checkBoxesState={
        state.selectedFilterType === "programFilters"
          ? state.programFilters
          : state.otherFilters
      }
      setCheckBoxState={(payload: any) =>
        dispatch({
          type:
            state.selectedFilterType === "programFilters"
              ? UPDATE_PROGRAM_FILTERS
              : UPDATE_OTHER_FILTERS,
          payload,
        })
      }
      selectFiltersType={(payload: string) =>
        dispatch({ type: UPDATE_FILTER_TYPE, payload })
      }
      selectedFilterType={state.selectedFilterType}
    >
      <Choropleth
        dataFromProps={geographicalEligibilityData}
        selectedType={state.selectedOption}
        selectedRadioOption={state.selectedOption}
        selectRadioOption={(payload: string) =>
          dispatch({ type: UPDATE_BY_TYPE, payload })
        }
      />
    </ChartContainer>
  );
};

export default GeographicalELigibility;
