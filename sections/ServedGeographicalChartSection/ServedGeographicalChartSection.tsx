import React, { useReducer, useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import {
  ChartContainer,
  Choropleth,
  FilterSelect,
  Button,
} from "../../components";
import { getGeographicalServedData } from "../../src/frontend/api";
import { GeographicalServedReducer } from "../../state";
import { GeographicalFiltersBaseState } from "../../src/frontend/Interfaces";
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

const GeographicalELigibility = () => {
  const [geographicalServedData, setGeographicalServedData] = useState([]);
  const [loading, setLoading] = useState(false);

  const initialArg: GeographicalFiltersBaseState = {
    programFilters: ProgramStateObject,
    otherFilters: OtherStateObject,
    selectedFilterType: "programFilters",
    selectedOption: "county",
  };
  const [state, dispatch] = useReducer(GeographicalServedReducer, initialArg);
  const populateGeographicalServedData = async () => {
    setLoading(true);
    const keys: string[] = [
      ...getFilters("programFilters"),
      ...getFilters("otherFilters"),
    ];
    try {
      const response: any = await getGeographicalServedData(
        state.selectedOption,
        keys
      );
      setGeographicalServedData(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
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
    <FilterSelect
      key="filter-other-check"
      name="Other Filters"
      data={OtherOptionTree}
      selected={state.otherFilters}
      setState={(payload: any) =>
        dispatch({
          type: UPDATE_OTHER_FILTERS,
          payload,
        })
      }
    />,
  ];
  return (
    <ChartContainer
      title="Served Geographically"
      checkboxes={checkboxes}
      getData={populateGeographicalServedData}
      loading={loading}
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
