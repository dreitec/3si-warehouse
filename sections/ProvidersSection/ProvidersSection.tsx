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
} from "../../src/frontend/api";
import { ProvidersReducer } from "../../state";
import { ProvidersState } from "../../src/frontend/Interfaces";
import {
  UPDATE_PROGRAM_FILTERS,
  UPDATE_BY_TYPE,
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
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    const keys: string[] =
      [...getFilters("programFilters"), ...getFilters("otherFilters")] || [];
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
        setLoading(false);
        setProvidersData((prevState) => {
          return { ...prevState, table };
        });
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
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
    <FilterSelect
      key="providers-section-site-filtersk"
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
        getData={populateProvidersData}
        loading={loading}
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
      />
    </>
  );
};

export default GeographicalELigibility;
