import React, { useReducer } from "react";
import { ChartContainer, LineChart } from "../../components";
import { getServedData } from "../../api";
import { ServedReducer } from "../../state";
import { FiltersBaseState } from "../../interfaces";
import { UPDATE_SERVED_FILTERS } from "../../state/types";
import {
  StateObject as SelectedProgramsStateObject,
  ProgramOptionTree,
} from "../../Constants/ProgramChecks";
import { OtherStateObject } from "src/Constants/OtherChecks";

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

  return (
    <ChartContainer
      checked={servedNotation}
      setChecked={setservedNotation}
      labels={["Percent", "Number"]}
      title="Eligibility Over Time"
      getData={populateServedData}
      checkBoxTree={ProgramOptionTree}
      checkBoxesState={state.programFilters}
      setCheckBoxState={(payload: any) =>
        dispatch({ type: UPDATE_SERVED_FILTERS, payload })
      }
    >
      <LineChart
        keyName={servedNotation ? "number" : "percentage"}
        dataFromProps={servedData}
      />
    </ChartContainer>
  );
};
export default EligibilityLineGraphSection;
