import React, { useReducer } from "react";
import { ChartContainer, LineChart } from "../../components";
import { getEligibilityData } from "../../api";
import { EligibilityReducer } from "../../state";
import { EligibilityState } from "../../types";
import { UPDATE_ELIGIBILITY_FILTERS } from "../../state/types";
import {
  StateObject as SelectedOptionsStateObject,
  CheckBoxTree,
} from "../../Constants/ProgramAndOtherChecks";

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

  const initialArg: EligibilityState = {
    eligibilityFilters: SelectedOptionsStateObject,
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
      checkBoxTree={CheckBoxTree}
      checkBoxesState={state.eligibilityFilters}
      setCheckBoxState={(payload: any) =>
        dispatch({ type: UPDATE_ELIGIBILITY_FILTERS, payload })
      }
    >
      <LineChart
        keyName={eligibilityNotation ? "number" : "percentage"}
        dataFromProps={eligibilityData}
      />
    </ChartContainer>
  );
};
export default EligibilityLineGraphSection;
