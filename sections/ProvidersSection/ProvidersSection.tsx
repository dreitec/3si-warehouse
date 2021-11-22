import React, { useReducer, useEffect, useState } from "react";
import { CSVLink } from "react-csv";

import {
  ChartContainer,
  Choropleth,
  Table,
  FilterSelect,
  Button,
} from "../../components";

import {
  getProvidersChartData,
  getProvidersTableData,
  exportProvidersSubCsv,
} from "../../src/frontend/api";
import { ProvidersReducer } from "../../state";
import { ProvidersState } from "../../src/frontend/Interfaces";
import {
  UPDATE_PROGRAM_FILTERS,
  UPDATE_BY_TYPE,
  UPDATE_OTHER_FILTERS,
  UPDATE_SITE_FILTERS,
  UPDATE_SEARCH_QUERY,
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
  const [graphLoading, setGraphLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [tableExportLoading, setTableExportLoading] = useState(false);

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
    search: "",
  };

  const [state, dispatch] = useReducer(ProvidersReducer, initialArg);

  useEffect(() => {
    loadGraphData();
    loadTablesData();
  }, []);

  const exportCsv = () => {
    setTableExportLoading(true);
    const keys: string[] =
      [
        ...getFilters("programFilters"),
        ...getFilters("otherFilters"),
        ...getFilters("siteFilers"),
      ] || [];

    exportProvidersSubCsv(
      state.selectedOption,
      paginationProps.page,
      keys,
      state.search
    )
      .then(() => {
        setTableExportLoading(false);
      })
      .catch((error) => {
        setTableExportLoading(false);
        console.log(error);
      });
  };

  const loadGraphData = () => {
    setGraphLoading(true);
    const keys: string[] =
      [
        ...getFilters("programFilters"),
        ...getFilters("otherFilters"),
        ...getFilters("siteFilers"),
      ] || [];
    loadTablesData();
    getProvidersChartData(state.selectedOption, keys)
      .then((chart: any[]) => {
        setProvidersData((prevState) => {
          return { ...prevState, chart };
        });
        setGraphLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setGraphLoading(false);
      });
  };

  const loadTablesData = () => {
    setTableLoading(true);
    const keys: string[] =
      [
        ...getFilters("programFilters"),
        ...getFilters("otherFilters"),
        ...getFilters("siteFilers"),
      ] || [];

    getProvidersTableData(
      state.selectedOption,
      paginationProps.page,
      keys,
      state.search
    )
      .then((table: any[]) => {
        setTableLoading(false);
        setProvidersData({ ...providersData, table });
      })
      .catch((error) => {
        setTableLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    if (providersData.chart.length === 0) return;
    loadTablesData();
  }, [state.selectedOption]);

  const getFilters = (
    key: "programFilters" | "siteFilers" | "otherFilters"
  ) => {
    const notRequired = ["sp", "all"];
    return Object.keys(state[key]).filter(
      (elem: string) => state[key][elem] === true && !notRequired.includes(elem)
    );
  };

  const onPageChange = (page: number) => {
    console.log(page, "page change");
    setPaginationProps({ ...paginationProps, page });
  };

  React.useEffect(() => {
    if (providersData.table.length === 0) return;
    loadTablesData();
  }, [paginationProps.page]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: UPDATE_SEARCH_QUERY,
      payload: e.target.value,
    });
  };

  const checkboxes = [
    <FilterSelect
      key="providers-section-site-filters"
      name="Site Filters"
      data={SiteOptionTree}
      selected={state.siteFilers}
      setState={(payload: any) =>
        dispatch({
          type: UPDATE_SITE_FILTERS,
          payload,
        })
      }
    />,
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
    <>
      <ChartContainer
        title="Service Sites"
        checkboxes={checkboxes}
        getData={loadGraphData}
        loading={graphLoading}
        selectedFilters={{
          ...state.programFilters,
          ...state.otherFilters,
          ...state.siteFilers,
        }}
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
        sitesDelete={(filterValue: any) =>
          dispatch({
            type: UPDATE_SITE_FILTERS,
            payload: { [filterValue]: false },
          })
        }
        exportButton={
          <CSVLink
            data={Array.isArray(providersData.chart) ? providersData.chart : []}
            filename={"service-sites-graph.csv"}
            target="_blank"
          >
            <Button variant="outlined" color="primary">
              Export
            </Button>
          </CSVLink>
        }
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
      </ChartContainer>

      <Table
        data={providersData.table}
        paginationProps={{ ...paginationProps, onPageChange }}
        inputValue={state.search}
        handleInputChange={handleInputChange}
        getData={loadTablesData}
        loading={tableLoading}
        exportData={exportCsv}
        exportLoading={tableExportLoading}
      />
    </>
  );
};

export default GeographicalELigibility;
