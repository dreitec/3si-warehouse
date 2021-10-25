import React, { useReducer, useEffect, useState } from "react";
import {
  ChartContainer,
  Choropleth,
  Table,
  FilterCheckboxes,
} from "../../components";
import { getProvidersChartData, getProvidersTableData } from "../../api";
import { ProvidersReducer } from "../../state";
import { ProvidersState } from "../../interfaces";
import {
  UPDATE_PROGRAM_FILTERS,
  UPDATE_BY_TYPE,
  UPDATE_FILTER_TYPE,
  UPDATE_OTHER_FILTERS,
  UPDATE_SITE_FILTERS,
} from "../../state/types";
import {
  StateObject as SelectedProgramsStateObject,
  ProgramOptionTree,
} from "../../Constants/ProgramChecks";
import {
  OtherStateObject as SelectedOtherStateObject,
  OtherOptionTree,
} from "../../Constants/OtherChecks";
import { SiteOptionTree, SitesStateObject } from "../../Constants/SiteChecks";

interface Props {}

const GeographicalELigibility = (props: Props) => {
  const [providersData, setProvidersData] = useState<{
    chart: any[];
    table: any[];
  }>({ chart: [], table: [] });

  const initialArg: ProvidersState = {
    programFilters: SelectedProgramsStateObject,
    otherFilters: SelectedOtherStateObject,
    siteFilers: SitesStateObject,
    selectedFilterType: "programFilters",
    selectedOption: "county",
  };
  const [state, dispatch] = useReducer(ProvidersReducer, initialArg);
  const populateProvidersData = async () => {
    const keys: string[] =
      getFilters(
        state.selectedFilterType === "programFilters"
          ? "programFilters"
          : "otherFilters"
      ) || [];
    const siteKeys: string[] = getFilters("siteFilers");
    try {
      getProvidersChartData(state.selectedOption, [...keys, ...siteKeys]).then(
        (chart: any[]) => {
          setProvidersData({ ...providersData, chart });
        }
      );

      await getProvidersTableData(state.selectedOption, [
        ...keys,
        ...siteKeys,
      ]).then((table: any[]) => {
        setProvidersData({ ...providersData, table });
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    populateProvidersData();
  }, []);

  useEffect(() => {
    populateProvidersData();
  }, [state.selectedOption]);

  const getFilters = (
    key: "programFilters" | "siteFilers" | "otherFilters"
  ) => {
    const notRequired = ["sp", "all"];
    return Object.keys(state[key]).filter(
      (elem: string) => state[key][elem] === true && !notRequired.includes(elem)
    );
  };

  const checkboxes = [
    <FilterCheckboxes
      data={SiteOptionTree}
      state={state.siteFilers}
      setState={(payload: any) =>
        dispatch({
          type: UPDATE_SITE_FILTERS,
          payload,
        })
      }
    />,
    <FilterCheckboxes
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
      title="Service Sites"
      selectFiltersType={(payload: string) =>
        dispatch({ type: UPDATE_FILTER_TYPE, payload })
      }
      selectedFilterType={state.selectedFilterType}
      checkboxes={checkboxes}
      getData={populateProvidersData}
    >
      <Choropleth
        dataFromProps={providersData.chart}
        selectedType={state.selectedOption}
        selectedRadioOption={state.selectedOption}
        selectRadioOption={(payload: string) =>
          dispatch({ type: UPDATE_BY_TYPE, payload })
        }
        options={{ name: "# Service sites", property: "PROVIDERS" }}
      />
      <Table data={providersData.table} />
    </ChartContainer>
  );
};

export default GeographicalELigibility;
