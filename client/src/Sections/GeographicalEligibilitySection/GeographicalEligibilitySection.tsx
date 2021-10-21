import React, { useReducer, useEffect, useState } from "react";
import { ChartContainer, Choropleth } from "../../components";
import { getGeographicalEligibilityData } from "../../api";
import { GeographicalEligibilityReducer } from "../../state";
import { GeographicalEligibilityState } from "../../types";
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

  const populateGeographicalEligibilityData = async (keys?: string[]) => {
    try {
      const response: any = await getGeographicalEligibilityData(keys);
      setGeographicalEligibilityData(response);
    } catch (error) {
      console.log(error);
    }
  };

  const initialArg: GeographicalEligibilityState = {
    geographicalEligibilityFilters: SelectedOptionsStateObject,
    selectedOption: "county",
  };

  const [state, dispatch] = useReducer(
    GeographicalEligibilityReducer,
    initialArg
  );
  console.log(state, "GeographicalEligibilityState");
  useEffect(() => {
    populateGeographicalEligibilityData();
  }, []);

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
        selectedRadioOption={state.selectedOption}
        selectRadioOption={(payload: string) =>
          dispatch({ type: UPDATE_GEOGRAPHICAL_ELIGIBILITY_BY_TYPE, payload })
        }
      />
    </ChartContainer>
  );
};

export default GeographicalELigibility;
