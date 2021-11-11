import React, { useReducer, useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import {
  ChartContainer,
  Choropleth,
  FilterCheckboxes,
  Button,
} from "../../components";
import { getGeographicalServedData } from "../../src/frontend/api";
import { GeographicalServedReducer } from "../../state";
import { GeographicalFiltersBaseState } from "../../src/frontend/Interfaces";
import {
  UPDATE_PROGRAM_FILTERS,
  UPDATE_BY_TYPE,
  UPDATE_FILTER_TYPE,
  UPDATE_OTHER_FILTERS,
} from "../../state/types";
import {
  ProgramStateObject,
  ProgramOptionTree,
  OtherStateObject,
  OtherOptionTree,
} from "../../src/frontend/Constants";

const GeographicalELigibility = () => {
  const [geographicalServedData, setGeographicalServedData] = useState([]);
  const initialArg: GeographicalFiltersBaseState = {
    programFilters: ProgramStateObject,
    otherFilters: OtherStateObject,
    selectedFilterType: "programFilters",
    selectedOption: "county",
  };
  const [state, dispatch] = useReducer(GeographicalServedReducer, initialArg);
  const populateGeographicalServedData = async () => {
    const keys: string[] =
      getFilters(
        state.selectedFilterType === "programFilters"
          ? "programFilters"
          : "otherFilters"
      ) || [];
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

  useEffect(() => {
    populateGeographicalServedData();
  }, []);

  useEffect(() => {
    populateGeographicalServedData();
  }, [state.selectedOption]);

  const getFilters = (key: "programFilters" | "otherFilters") => {
    const notRequired = ["sp", "all"];
    return Object.keys(state[key]).filter(
      (elem: string) => state[key][elem] === true && !notRequired.includes(elem)
    );
  };
  const checkboxes = [
    <FilterCheckboxes
      key="served-children-geographical-section-filters"
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
      title="Served Geographically"
      selectFiltersType={(payload: string) =>
        dispatch({ type: UPDATE_FILTER_TYPE, payload })
      }
      selectedFilterType={state.selectedFilterType}
      checkboxes={checkboxes}
      getData={populateGeographicalServedData}
      exportButton={
        <CSVLink
          data={
            Array.isArray(geographicalServedData) ? geographicalServedData : []
          }
          filename={"served-geographical-chart.csv"}
          target="_blank"
        >
          <Button variant="outlined" color="primary">
            Export
          </Button>
        </CSVLink>
      }
    >
      <Choropleth
        dataFromProps={geographicalServedData}
        selectedType={state.selectedOption}
        selectedRadioOption={state.selectedOption}
        selectRadioOption={(payload: string) =>
          dispatch({ type: UPDATE_BY_TYPE, payload })
        }
        options={{ name: "% Children Served", property: "percentage" }}
      />
    </ChartContainer>
  );
};

export default GeographicalELigibility;
