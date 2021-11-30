import React, { useReducer, useEffect, useState } from "react";
import { Button } from "../../components";
import {
  ChartContainer,
  ExportTable,
  FilterSelect,
  Select,
} from "../../components";
import { getTableData, exportCsv } from "../../src/frontend/api";
import { ExportTableReducer } from "../../state";
import { ITableState } from "../../src/frontend/Interfaces";
import {
  UPDATE_PROGRAM_FILTERS,
  UPDATE_VIEW_BY,
  UPDATE_FILTER_TYPE,
  UPDATE_OTHER_FILTERS,
  UPDATE_SITE_FILTERS,
  UPDATE_EXPORTING,
} from "../../state/types";
import {
  ProgramStateObject,
  ProgramOptionTree,
  OtherOptionTree,
  OtherStateObject,
  SiteOptionTree,
  SitesStateObject,
} from "../../src/frontend/Constants";

const ExportSection = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  const initialArg: ITableState = {
    programFilters: ProgramStateObject,
    otherFilters: OtherStateObject,
    selectedViewBy: "children",
    siteFilters: SitesStateObject,
    exporting: false,
  };
  const [state, dispatch] = useReducer(ExportTableReducer, initialArg);
  const populateTableData = async () => {
    setLoading(true);
    const keys: string[] =
      [
        ...getFilters("programFilters"),
        ...getFilters("siteFilters"),
        ...getFilters("otherFilters"),
      ] || [];

    try {
      const response: any = await getTableData(state.selectedViewBy, keys);
      setTableData(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    populateTableData();
  }, []);

  const getFilters = (
    key: "programFilters" | "otherFilters" | "siteFilters"
  ) => {
    const notRequired = ["sp", "all"];
    return Object.keys(state[key]).filter(
      (elem: string) => state[key][elem] === true && !notRequired.includes(elem)
    );
  };

  const handleCsvExport = async () => {
    dispatch({
      type: UPDATE_EXPORTING,
      payload: true,
    });
    await exportCsv(state.selectedViewBy);
    dispatch({
      type: UPDATE_EXPORTING,
      payload: false,
    });
  };

  const handleFilterChange = (payload: string) => {
    console.log("changing filter", payload);
    dispatch({
      type: UPDATE_VIEW_BY,
      payload,
    });
    setTableData([]);
  };

  const checkboxes = [
    <Select
      key="export-table-view-select"
      label="View"
      selectData={[
        { value: "children", text: "By Child" },
        { value: "providers", text: "By Provider" },
      ]}
      selected={state.selectedViewBy}
      action={handleFilterChange}
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
  ];

  if (state.selectedViewBy === "providers") {
    checkboxes.splice(
      1,
      0,
      <FilterSelect
        key="export-site-filters"
        name="Site Filters"
        data={SiteOptionTree}
        selected={state.siteFilters}
        setState={(payload: any) =>
          dispatch({
            type: UPDATE_SITE_FILTERS,
            payload,
          })
        }
      />
    );
  } else {
    checkboxes.push(
      <FilterSelect
        key="export-other-filters"
        name="Other Filters"
        data={OtherOptionTree}
        selected={state.otherFilters}
        setState={(payload: any) =>
          dispatch({
            type: UPDATE_OTHER_FILTERS,
            payload,
          })
        }
      />
    );
  }

  return (
    <ChartContainer
      exportButton={
        <Button
          variant="contained"
          loading={state.exporting}
          onClick={handleCsvExport}
        >
          Export
        </Button>
      }
      title="Table Preview"
      selectedFilters={{
        ...state.programFilters,
        ...state.otherFilters,
        ...state.siteFilters,
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
      checkboxes={checkboxes}
      getData={populateTableData}
      loading={loading}
      showOptionSelector={false}
    >
      <ExportTable dataFromProps={tableData} />
    </ChartContainer>
  );
};

export default ExportSection;
