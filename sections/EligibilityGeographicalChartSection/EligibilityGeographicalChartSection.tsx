import React, { useReducer, useEffect, useState } from "react";
import { CSVLink } from "react-csv";

import {
  ChartContainer,
  Choropleth,
  FilterSelect,
  Button,
} from "../../components";
import { getGeographicalEligibilityData } from "../../src/frontend/api";
import { GeographicalEligibilityReducer } from "../../state";
import { GeographicalEligibilityState } from "../../src/frontend/Interfaces";
import {
  UPDATE_PROGRAM_FILTERS,
  UPDATE_BY_TYPE,
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
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    const keys: string[] = [
      ...getFilters("programFilters"),
      ...getFilters("otherFilters"),
    ];
    try {
      const response: any = await getGeographicalEligibilityData(
        state.selectedOption,
        keys
      );
      setGeographicalEligibilityData(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
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
    <FilterSelect
      key="filter-program-check"
      name="Program Filters"
      data={ProgramOptionTree}
      selected={state.programFilters}
      setState={(payload: any) =>
        dispatch({
          type: UPDATE_PROGRAM_FILTERS,
          payload,
        })
      }
    />,
    ,
    <FilterSelect
      key="filter-other-check"
      name="Other Filters"
      data={OtherOptionTree}
      selected={state.otherFilters}
      setState={(payload: any) =>
        dispatch({ type: UPDATE_OTHER_FILTERS, payload })
      }
    />,
  ];
  return (
    <ChartContainer
      title="Eligibility Geographically"
      selectedFilters={{ ...state.programFilters, ...state.otherFilters }}
      programDelete={(filterValue: any) =>
        dispatch({
          type: UPDATE_PROGRAM_FILTERS,

          payload: { [filterValue]: false },
        })
      }
      otherDelete={(filterValue: any) =>
        dispatch({
          type: UPDATE_OTHER_FILTERS,
          payload: { [filterValue]: false },
        })
      }
      checkboxes={checkboxes}
      getData={populateGeographicalEligibilityData}
      loading={loading}
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
