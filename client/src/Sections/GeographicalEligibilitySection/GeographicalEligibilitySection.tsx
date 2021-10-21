import React, { useReducer, useEffect, useState } from "react";
import { ChartContainer, Choropleth } from "../../components";
import { getGeographicalEligibilityData } from "../../api";
import { GeographicalEligibilityReducer } from "../../state";
import { GeographicalEligibilityState } from "../../types";
import {
  CREATE_GEOGRAPHICAL_ELIGIBILITY_FILTERS,
  UPDATE_GEOGRAPHICAL_ELIGIBILITY_FILTERS,
  UPDATE_GEOGRAPHICAL_ELIGIBILITY_BY_TYPE,
} from "../../state/types";
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
    geographicalEligibilityFilters: {},
    selectedOption: "county",
  };

  const [state, dispatch] = useReducer(
    GeographicalEligibilityReducer,
    initialArg
  );

  useEffect(() => {
    populateGeographicalEligibilityData();
  }, []);

  return (
    <ChartContainer
      showButton={false}
      title="Eligibility Geographically"
      getData={populateGeographicalEligibilityData}
      createCheckData={(payload: any) =>
        dispatch({ type: CREATE_GEOGRAPHICAL_ELIGIBILITY_FILTERS, payload })
      }
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
