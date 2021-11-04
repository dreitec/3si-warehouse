import React, { useReducer } from "react";
import {
  ChartContainer,
  LineChart,
  FilterCheckboxes,
  Description,
} from "../../components";
import { getServedData } from "../../api";
import { ServedReducer } from "../../state";
import { FiltersBaseState } from "../../interfaces";
import {
  UPDATE_PROGRAM_FILTERS,
  UPDATE_FILTER_TYPE,
  UPDATE_OTHER_FILTERS,
} from "../../state/types";
import {
  StateObject as SelectedProgramsStateObject,
  ProgramOptionTree,
} from "../../Constants/ProgramChecks";
import { OtherStateObject, OtherOptionTree } from "src/Constants/OtherChecks";
import { Container } from "@mui/material";
import { PieChart as PieChartIcon } from "@mui/icons-material";

interface Props {}

const EligibilityLineGraphSection = (props: Props) => {
  const [servedNotation, setservedNotation] = React.useState(false);
  const [servedData, setServedData] = React.useState();
  const populateServedData = async (keys?: string[]) => {
    try {
      const response: any = await getServedData(keys);
      setServedData(response);
    } catch (error) {
      console.log(error);
    }
  };

  const initialArg: FiltersBaseState = {
    programFilters: SelectedProgramsStateObject,
    otherFilters: OtherStateObject,
    selectedFilterType: "programFilters",
  };

  const [state, dispatch] = useReducer(ServedReducer, initialArg);
  React.useEffect(() => {
    populateServedData();
  }, []);
  const checkboxes = [
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
    <>
      <Container maxWidth="md">
        <Description
          heading="Service"
          Icon={PieChartIcon}
          button={true}
          margin={20}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
          auctor consequat mauris. Vestibulum ornare vel odio ac hendrerit.
          Curabitur lacinia sem id pharetra hendrerit. Nam quis lacus sit amet
          sapien dapibus eleifend. Nunc quis augue nulla.Lorem ipsum dolor sit
          amet, consectetur adipiscing elit. Quisque auctor consequat mauris.
          Vestibulum ornare vel odio ac hendrerit. Curabitur lacinia sem id
          pharetra hendrerit. Nam quis lacus sit amet sapien dapibus eleifend.
          Nunc quis augue nulla.Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Quisque auctor consequat mauris. Vestibulum ornare
          vel odio ac hendrerit. Curabitur lacinia sem id pharetra hendrerit.
          Nam quis lacus sit amet sapien dapibus eleifend. Nunc quis augue
          nulla.
        </Description>
      </Container>
      <ChartContainer
        checked={servedNotation}
        setChecked={setservedNotation}
        labels={["Percent", "Number"]}
        title="Eligibility Over Time"
        selectFiltersType={(payload: string) =>
          dispatch({ type: UPDATE_FILTER_TYPE, payload })
        }
        selectedFilterType={state.selectedFilterType}
        checkboxes={checkboxes}
        getData={populateServedData}
      >
        <LineChart
          keyName={servedNotation ? "number" : "percentage"}
          dataFromProps={servedData}
        />
      </ChartContainer>
    </>
  );
};
export default EligibilityLineGraphSection;
