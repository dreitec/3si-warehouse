import React, { useReducer, useEffect, useState } from "react";
import { CSVLink, CSVDownload } from "react-csv";
import Button from "@mui/material/Button";
import {
  ChartContainer,
  ExportTable,
  FilterCheckboxes,
} from "../../components";
import { getTableData } from "../../api";
import { TableReducer } from "../../state";
import { TableState } from "../../interfaces";
import {
  UPDATE_PROGRAM_FILTERS,
  UPDATE_BY_TYPE,
  UPDATE_FILTER_TYPE,
  UPDATE_OTHER_FILTERS,
} from "../../state/types";
import {
  StateObject as SelectedProgramsStateObject,
  ProgramOptionTree,
} from "../../Constants/ProgramChecks";
import {
  OtherStateObject as SelectedOtherStateObject,
  OtherOptionTree,
} from "../../Constants/OtherChecks";
import "./ExportSection.css";

interface Props {}

const ExportSection = (props: Props) => {
  const [tableData, setTableData] = useState([]);
  const initialArg: TableState = {
    programFilters: SelectedProgramsStateObject,
    otherFilters: SelectedOtherStateObject,
  };
  const [state, dispatch] = useReducer(TableReducer, initialArg);
  const populateTableData = async () => {
    const keys: string[] = [
      ...getFilters("programFilters"),
      ...getFilters("otherFilters"),
    ];
    try {
      const response: any = await getTableData(keys);
      setTableData(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    populateTableData();
  }, []);

  const getFilters = (key: "programFilters" | "otherFilters") => {
    const notRequired = ["sp", "all"];
    return Object.keys(state[key]).filter(
      (elem: string) => state[key][elem] === true && !notRequired.includes(elem)
    );
  };

  const checkboxes = [
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
    <FilterCheckboxes
      data={OtherOptionTree}
      state={state.otherFilters}
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
