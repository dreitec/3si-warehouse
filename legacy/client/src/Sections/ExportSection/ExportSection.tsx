import React, { useReducer, useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { Button } from "../../components";
import {
  ChartContainer,
  ExportTable,
  FilterCheckboxes,
  Select,
} from "../../components";
import { getTableData, exportCsv } from "../../api";
import { ExportTableReducer } from "../../state";
import { TableState } from "../../interfaces";
import {
  UPDATE_PROGRAM_FILTERS,
  UPDATE_VIEW_BY,
  UPDATE_FILTER_TYPE,
  UPDATE_OTHER_FILTERS,
  UPDATE_SITE_FILTERS,
  UPDATE_EXPORTING,
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
import "./ExportSection.css";

interface Props {}

const ExportSection = (props: Props) => {
  const [tableData, setTableData] = useState([]);
  const initialArg: TableState = {
    programFilters: SelectedProgramsStateObject,
    otherFilters: SelectedOtherStateObject,
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
      label="View"
      selectData={[
        { value: "children", text: "By Child" },
        { value: "providers", text: "By Provider" },
      ]}
      selected={state.selectedViewBy}
      action={handleFilterChange}
    />,
    <FilterCheckboxes
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
          isLight={false}
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
