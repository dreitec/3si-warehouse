import React, { useReducer } from "react";
import {
  ChartContainer,
  ScatterPlot,
  FilterCheckboxes,
  Description,
  RadioButton,
} from "../../components";
import { getScatterData } from "../../src/frontend/api";
import { GapsReducer } from "../../state";
import { GapsState } from "../../src/frontend/Interfaces";
import { UPDATE_FILTERS } from "../../state/types";
import {
  OtherOptionTree,
  OtherStateObject,
} from "../../src/frontend/Constants";
import { Container } from "@material-ui/core";
import { Height as HeightIcon } from "@mui/icons-material";

interface Props {}
const UnservedChildrenScatterGraphSection = (props: Props) => {
  const [gapsData, setGapsData] = React.useState();

  const populateGapsData = async () => {
    const keys: string[] = getFilters() || [];
    try {
      const response: any = await getScatterData(keys);
      setGapsData(response);
    } catch (error) {
      console.log(error);
    }
  };

  const initialArg: GapsState = {
    filters: OtherStateObject,
  };

  const [state, dispatch] = useReducer(GapsReducer, initialArg);
  React.useEffect(() => {
    populateGapsData();
  }, []);

  const getFilters = () => {
    const notRequired = ["sp", "all"];
    return Object.keys(state.filters).filter(
      (elem: string) =>
        state.filters[elem] === true && !notRequired.includes(elem)
    );
  };
  const checkboxes = [
    <RadioButton
      key="unserved-scatter-radio"
      options={[
        { label: "Social Vulnerability Index", value: "svi" },
        { label: "Race", value: "race" },
      ]}
    />,
    <FilterCheckboxes
      key="unserved-scatter-checks"
      data={OtherOptionTree}
      state={state.filters}
      setState={(payload: any) =>
        dispatch({
          type: UPDATE_FILTERS,
          payload,
        })
      }
    />,
  ];
  return (
    <>
      <Container>
        <Description heading="Gaps" Icon={HeightIcon} button={true} margin={20}>
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
        title="Unserved Children by Risk Factor"
        checkboxes={checkboxes}
        getData={populateGapsData}
        showButton={false}
        showOptionSelector={false}
      >
        <ScatterPlot
          //   keyName={eligibilityNotation ? "number" : "percentage"}
          dataFromProps={gapsData}
        />
      </ChartContainer>
    </>
  );
};
export default UnservedChildrenScatterGraphSection;
