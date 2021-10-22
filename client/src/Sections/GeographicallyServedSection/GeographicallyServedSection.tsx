import React, { useReducer, useEffect, useState } from "react";
import { ChartContainer, Choropleth } from "../../components";
import { getGeographicalServedData } from "../../api";
import { GeographicalServedReducer } from "../../state";
import { GeographicalFiltersBaseState } from "../../interfaces";
import { UPDATE_PROGRAM_FILTERS, UPDATE_BY_TYPE } from "../../state/types";
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
  const [geographicalServedData, setGeographicalServedData] = useState([]);
  const initialArg: GeographicalFiltersBaseState = {
    programFilters: SelectedProgramsStateObject,
    otherFilters: SelectedOtherStateObject,
    selectedFilterType: "programFilters",
    selectedOption: "county",
  };
  const [state, dispatch] = useReducer(GeographicalServedReducer, initialArg);
  const populateGeographicalServedData = async (keys?: string[]) => {
    try {
      const response: any = await getGeographicalServedData(
        state.selectedOption,
        keys
      );
      setGeographicalServedData(response);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(state, "GeographicalFiltersBaseState");
  useEffect(() => {
    populateGeographicalServedData();
  }, []);

  useEffect(() => {
    const getFilters = () => {
      const notRequired = ["sp", "all"];
      return Object.keys(state.programFilters).filter(
        (elem) =>
          state.programFilters[elem] === true && !notRequired.includes(elem)
      );
    };

    populateGeographicalServedData(getFilters());
  }, [state.selectedOption]);

  return (
    <ChartContainer
      showButton={false}
      title="Served Geographically"
      getData={populateGeographicalServedData}
      checkBoxTree={ProgramOptionTree}
      checkBoxesState={state.programFilters}
      setCheckBoxState={(payload: any) =>
        dispatch({ type: UPDATE_PROGRAM_FILTERS, payload })
      }
    >
      <Choropleth
        dataFromProps={geographicalServedData}
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
