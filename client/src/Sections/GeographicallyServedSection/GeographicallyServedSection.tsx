import React, { useReducer, useEffect, useState } from "react";
import { ChartContainer, Choropleth } from "../../components";
import { getGeographicalServedData } from "../../api";
import { GeographicalServedReducer } from "../../state";
import { GeographicalServedState } from "../../interfaces";
import {
  UPDATE_GEOGRAPHICAL_SERVED_FILTERS,
  UPDATE_GEOGRAPHICAL_SERVED_BY_TYPE,
} from "../../state/types";
import {
  StateObject as SelectedOptionsStateObject,
  CheckBoxTree,
} from "../../Constants/ProgramAndOtherChecks";
interface Props {}

const GeographicalELigibility = (props: Props) => {
  const [geographicalServedData, setGeographicalServedData] = useState([]);
  const initialArg: GeographicalServedState = {
    geographicalServedFilters: SelectedOptionsStateObject,
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

  console.log(state, "GeographicalServedState");
  useEffect(() => {
    populateGeographicalServedData();
  }, []);

  useEffect(() => {
    const getFilters = () => {
      const notRequired = ["sp", "all"];
      return Object.keys(state.geographicalServedFilters).filter(
        (elem) =>
          state.geographicalServedFilters[elem] === true &&
          !notRequired.includes(elem)
      );
    };

    populateGeographicalServedData(getFilters());
  }, [state.selectedOption]);

  return (
    <ChartContainer
      showButton={false}
      title="Served Geographically"
      getData={populateGeographicalServedData}
      checkBoxTree={CheckBoxTree}
      checkBoxesState={state.geographicalServedFilters}
      setCheckBoxState={(payload: any) =>
        dispatch({ type: UPDATE_GEOGRAPHICAL_SERVED_FILTERS, payload })
      }
    >
      <Choropleth
        dataFromProps={geographicalServedData}
        selectedType={state.selectedOption}
        selectedRadioOption={state.selectedOption}
        selectRadioOption={(payload: string) =>
          dispatch({ type: UPDATE_GEOGRAPHICAL_SERVED_BY_TYPE, payload })
        }
      />
    </ChartContainer>
  );
};

export default GeographicalELigibility;
