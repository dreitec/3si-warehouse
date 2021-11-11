import React, { useReducer, useEffect, useState } from "react";
import { CSVLink } from "react-csv";

import {
  ChartContainer,
  Choropleth,
  FilterCheckboxes,
  Button,
} from "../../components";
import { getGeographicalEligibilityData } from "../../src/frontend/api";
import { GeographicalEligibilityReducer } from "../../state";
import { GeographicalEligibilityState } from "../../src/frontend/Interfaces";
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
interface Props {}

const GeographicalELigibility = (props: Props) => {
  const [
    geographicalEligibilityData,
    setGeographicalEligibilityData,
  ] = useState([]);
  const initialArg: GeographicalEligibilityState = {
    programFilters: ProgramStateObject,
    otherFilters: OtherStateObject,
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
      key="eligible-choropleth-program-filters"
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
      exportButton={
        <CSVLink
          data={
            Array.isArray(geographicalEligibilityData)
              ? geographicalEligibilityData
              : []
          }
          filename={"eligibility-choropleth-chart.csv"}
          target="_blank"
        >
          <Button variant="outlined" color="primary">
            Export
          </Button>
        </CSVLink>
      }
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
