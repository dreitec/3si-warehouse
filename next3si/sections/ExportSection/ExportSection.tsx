import React, { useReducer, useEffect, useState } from "react";
import { Button } from "../../components";
import {
  ChartContainer,
  ExportTable,
  FilterCheckboxes,
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

interface Props {}

const ExportSection = (props: Props) => {
  const [tableData, setTableData] = useState([]);
  const initialArg: ITableState = {
    programFilters: ProgramStateObject,
    otherFilters: OtherStateObject,
    selectedViewBy: "children",
    siteFilters: SitesStateObject,
    exporting: false,
  };
  const [state, dispatch] = useReducer(ExportTableReducer, initialArg);
  const populateTableData = async () => {
    const keys: string[] = getFilters("programFilters");
    if (state.selectedViewBy === "providers") {
      keys.push(...getFilters("siteFilters"));
    } else {
      keys.push(...getFilters("otherFilters"));
    }

    try {
      const response: any = await getTableData(state.selectedViewBy, keys);
      setTableData(response);
    } catch (error) {
      console.log(error);
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
    <FilterCheckboxes
      key="export-program-filters"
      data={ProgramOptionTree}
      state={state.programFilters}
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
      <FilterCheckboxes
        key="export-site-filters"
        data={SiteOptionTree}
        state={state.siteFilters}
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
      <FilterCheckboxes
        key="export-other-filters"
        data={OtherOptionTree}
        state={state.otherFilters}
        setState={(payload: any) =>
          dispatch({
            type: UPDATE_OTHER_FILTERS,
            payload,
          })
        }
      />
    );
  }

  console.log(state.exporting);

  return (
    <ChartContainer
      showButton={false}
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
      selectFiltersType={handleFilterChange}
      checkboxes={checkboxes}
      getData={populateTableData}
      showOptionSelector={false}
    >
      <ExportTable dataFromProps={tableData} />
    </ChartContainer>
  );
};

export default ExportSection;
