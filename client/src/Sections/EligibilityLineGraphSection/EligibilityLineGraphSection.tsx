import React, { useReducer } from "react";
import { ChartContainer, LineChart } from "../../components";
import { getEligibilityData } from "../../api";
import { EligibilityReducer } from "../../state";
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
import {
  OtherStateObject as SelectedOtherStateObject,
  OtherOptionTree,
} from "../../Constants/OtherChecks";

interface Props {}

const EligibilityLineGraphSection = (props: Props) => {
  const [eligibilityNotation, setEligibilityNotation] = React.useState(false);
  const [eligibilityData, setEligibilityData] = React.useState();
  const populateEligibilityData = async (keys?: string[]) => {
    try {
      const response: any = await getEligibilityData(keys);
      setEligibilityData(response);
    } catch (error) {
      console.log(error);
    }
  };

  const initialArg: FiltersBaseState = {
    programFilters: SelectedProgramsStateObject,
    otherFilters: SelectedOtherStateObject,
    selectedFilterType: "programFilters",
  };

  const [state, dispatch] = useReducer(EligibilityReducer, initialArg);
  console.log(state, "GeographicalEligibilityState");
  React.useEffect(() => {
    populateEligibilityData();
  }, []);

  return (
    <ChartContainer
      checked={eligibilityNotation}
      setChecked={setEligibilityNotation}
      labels={["Percent", "Number"]}
      title="Eligibility Over Time"
      getData={populateEligibilityData}
      checkBoxTree={
        state.selectedFilterType === "programFilters"
          ? ProgramOptionTree
          : OtherOptionTree
      }
      checkBoxesState={
        state.selectedFilterType === "programFilters"
          ? state.programFilters
          : state.otherFilters
      }
      setCheckBoxState={(payload: any) =>
        dispatch({
          type:
            state.selectedFilterType === "programFilters"
              ? UPDATE_PROGRAM_FILTERS
              : UPDATE_OTHER_FILTERS,
          payload,
        })
      }
      selectFiltersType={(payload: string) =>
        dispatch({ type: UPDATE_FILTER_TYPE, payload })
      }
      selectedFilterType={state.selectedFilterType}
    >
      <LineChart
        keyName={eligibilityNotation ? "number" : "percentage"}
        dataFromProps={eligibilityData}
      />
    </ChartContainer>
  );
};
export default EligibilityLineGraphSection;
