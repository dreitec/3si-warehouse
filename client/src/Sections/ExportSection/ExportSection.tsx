import React, { useReducer, useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import Button from "@mui/material/Button";
import {
  ChartContainer,
  ExportTable,
  FilterCheckboxes,
  Select,
} from "../../components";
import { getTableData } from "../../api";
import { ExportTableReducer } from "../../state";
import { TableState } from "../../interfaces";
import {
  UPDATE_PROGRAM_FILTERS,
  UPDATE_VIEW_BY,
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
import "./ExportSection.css";

interface Props {}

const ExportSection = (props: Props) => {
  const [tableData, setTableData] = useState([]);
  const initialArg: TableState = {
    programFilters: SelectedProgramsStateObject,
    otherFilters: SelectedOtherStateObject,
    selectedViewBy: "children",
    siteFilters: SitesStateObject,
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

  const checkboxes = [
    <Select
      label="View"
      selectData={[
        { value: "children", text: "By Child" },
        { value: "providers", text: "By Provider" },
      ]}
      selected={state.selectedViewBy}
      action={(payload: string) =>
        dispatch({
          type: UPDATE_VIEW_BY,
          payload,
        })
      }
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
  return (
    <ChartContainer
      showButton={false}
      exportButton={
        <CSVLink
          data={tableData}
          className="csvlink"
          filename={`3si-export-${new Date().toLocaleTimeString()}.csv`}
        >
          <Button variant="contained"> Export </Button>
        </CSVLink>
      }
      title="Table Preview"
      selectFiltersType={(payload: string) =>
        dispatch({ type: UPDATE_FILTER_TYPE, payload })
      }
      checkboxes={checkboxes}
      getData={populateTableData}
      showOptionSelector={false}
    >
      <ExportTable dataFromProps={tableData} />
    </ChartContainer>
  );
};

export default ExportSection;
