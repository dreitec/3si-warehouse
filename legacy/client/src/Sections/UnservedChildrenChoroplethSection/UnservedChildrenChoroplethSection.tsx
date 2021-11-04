import React, { useReducer } from "react";
import {
  ChartContainer,
  ScatterChart,
  FilterCheckboxes,
  Description,
  RadioButton,
  Choropleth2D as Choropleth,
} from "../../components";
import { getGeographicalUnservedData } from "../../api";
import { GapsReducer } from "../../state";
import { GapsState } from "../../interfaces";
import { UPDATE_FILTERS, UPDATE_BY_TYPE } from "../../state/types";
import {
  OtherOptionTree,
  OtherStateObject,
} from "../../Constants/OtherChecksWithouEmployment";
import { Container } from "@material-ui/core";
import { Height as HeightIcon } from "@mui/icons-material";

interface Props {}
const UnservedChildrenChoroplethSection = (props: Props) => {
  const [dataNotation, setDataNotation] = React.useState(false);

  const [gapsData, setGapsData] = React.useState([]);

  const populategapsData = async () => {
    const keys: string[] = getFilters() || [];
    try {
      const response: any = await getGeographicalUnservedData(keys);
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
    populategapsData();
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
      options={[
        { label: "Social Vulnerability Index", value: "svi" },
        { label: "Race", value: "race" },
      ]}
    />,
    <FilterCheckboxes
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
        getData={populategapsData}
        showButton={true}
        showOptionSelector={false}
        labels={["Percent", "Number"]}
        checked={dataNotation}
        setChecked={setDataNotation}
      >
        <Choropleth
          dataFromProps={gapsData}
          showRadio={false}
          options={{ name: "% Children Served", property: "percentage" }}
        />
      </ChartContainer>
    </>
  );
};
export default UnservedChildrenChoroplethSection;
