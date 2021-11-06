import React, { useReducer, useEffect, useState } from "react";
import {
  ChartContainer,
  Choropleth,
  Table,
  FilterCheckboxes,
} from "../../components";

import {
  getProvidersChartData,
  getProvidersTableData,
} from "../../src/frontend/api";
import { ProvidersReducer } from "../../state";
import { ProvidersState } from "../../src/frontend/Interfaces";
import {
  UPDATE_PROGRAM_FILTERS,
  UPDATE_BY_TYPE,
  UPDATE_FILTER_TYPE,
  UPDATE_OTHER_FILTERS,
  UPDATE_SITE_FILTERS,
} from "../../state/types";
import {
  ProgramStateObject,
  ProgramOptionTree,
  OtherStateObject,
  OtherOptionTree,
  SiteOptionTree,
  SitesStateObject,
} from "../../src/frontend/Constants";

const GeographicalELigibility = () => {
  const [providersData, setProvidersData] = useState<{
    chart: any[];
    table: any[];
  }>({ chart: [], table: [] });

  const [paginationProps, setPaginationProps] = useState({
    rowsPerPage: 10,
    page: 0,
    count: -1,
  });

  const initialArg: ProvidersState = {
    programFilters: ProgramStateObject,
    otherFilters: OtherStateObject,
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
          setProvidersData((prevState) => {
            return { ...prevState, chart };
          });
        }
      );

      getProvidersTableData(state.selectedOption, paginationProps.page, [
        ...keys,
        ...siteKeys,
      ]).then((table: any[]) => {
        setProvidersData((prevState) => {
          return { ...prevState, table };
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    populateProvidersData();
  }, []);

  useEffect(() => {
    if (providersData.chart.length === 0) return;
    const keys: string[] =
      getFilters(
        state.selectedFilterType === "programFilters"
          ? "programFilters"
          : "otherFilters"
      ) || [];
    const siteKeys: string[] = getFilters("siteFilers");
    getProvidersChartData(state.selectedOption, [...keys, ...siteKeys])
      .then((chart: any[]) => {
        setProvidersData({ ...providersData, chart });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [state.selectedOption]);

  const getFilters = (
    key: "programFilters" | "siteFilers" | "otherFilters"
  ) => {
    const notRequired = ["sp", "all"];
    return Object.keys(state[key]).filter(
      (elem: string) => state[key][elem] === true && !notRequired.includes(elem)
    );
  };

  const onPageChange = (_: unknown, page: number) => {
    setPaginationProps({ ...paginationProps, page });
  };

  React.useEffect(() => {
    if (providersData.table.length === 0) return;
    const keys: string[] =
      getFilters(
        state.selectedFilterType === "programFilters"
          ? "programFilters"
          : "otherFilters"
      ) || [];
    const siteKeys: string[] = getFilters("siteFilers");
    getProvidersTableData(state.selectedOption, paginationProps.page, [
      ...keys,
      ...siteKeys,
    ])
      .then((table: any[]) => {
        setProvidersData({ ...providersData, table });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [paginationProps.page]);

  const checkboxes = [
    <FilterCheckboxes
      key="providers-section-site-filters"
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
      key="providers-section-program-and-other-filters"
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
      <Table
        data={providersData.table}
        paginationProps={{ ...paginationProps, onPageChange }}
      />
    </ChartContainer>
  );
};

export default GeographicalELigibility;
