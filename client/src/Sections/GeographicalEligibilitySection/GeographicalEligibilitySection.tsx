import React, { useReducer, useEffect, useState } from "react";
import { ChartContainer, Choropleth } from "../../components";
import { getGeographicalEligibilityData } from "../../api";
import { GeographicalEligibilityReducer } from "../../state";
import { GeographicalEligibilityState } from "../../interfaces";
import {
  UPDATE_GEOGRAPHICAL_ELIGIBILITY_FILTERS,
  UPDATE_GEOGRAPHICAL_ELIGIBILITY_BY_TYPE,
} from "../../state/types";
import {
  StateObject as SelectedOptionsStateObject,
  CheckBoxTree,
} from "../../Constants/ProgramAndOtherChecks";
interface Props {}

const GeographicalELigibility = (props: Props) => {
  const [
    geographicalEligibilityData,
    setGeographicalEligibilityData,
  ] = useState([]);
  const initialArg: GeographicalEligibilityState = {
    geographicalEligibilityFilters: SelectedOptionsStateObject,
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
      return Object.keys(state.geographicalEligibilityFilters).filter(
        (elem) =>
          state.geographicalEligibilityFilters[elem] === true &&
          !notRequired.includes(elem)
      );
    };

    populateGeographicalEligibilityData(getFilters());
  }, [state.selectedOption]);

  return (
    <ChartContainer
      showButton={false}
      title="Eligibility Geographically"
      getData={populateGeographicalEligibilityData}
      checkBoxTree={CheckBoxTree}
      checkBoxesState={state.geographicalEligibilityFilters}
      setCheckBoxState={(payload: any) =>
        dispatch({ type: UPDATE_GEOGRAPHICAL_ELIGIBILITY_FILTERS, payload })
      }
    >
      <Choropleth
        dataFromProps={geographicalEligibilityData}
        selectedType={state.selectedOption}
        selectedRadioOption={state.selectedOption}
        selectRadioOption={(payload: string) =>
          dispatch({ type: UPDATE_GEOGRAPHICAL_ELIGIBILITY_BY_TYPE, payload })
        }
      />
    </ChartContainer>
  );
};

export default GeographicalELigibility;
