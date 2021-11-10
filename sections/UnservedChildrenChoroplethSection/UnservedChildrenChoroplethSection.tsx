import React, { useReducer } from "react";
import {
  ChartContainer,
  FilterCheckboxes,
  RadioButton,
  Choropleth2D as Choropleth,
} from "../../components";
import { getGeographicalUnservedData } from "../../src/frontend/api";
import { GapsReducer } from "../../state";
import { GapsState } from "../../src/frontend/Interfaces";
import { UPDATE_FILTERS, UPDATE_BY_TYPE } from "../../state/types";
import {
  OtherOptionTree,
  OtherStateObject,
} from "../../src/frontend/Constants";

const UnservedChildrenChoroplethSection = () => {
  const [dataNotation, setDataNotation] = React.useState(false);

  const [gapsData, setGapsData] = React.useState([]);

  const populateGapsData = async () => {
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
      key="unserved-choropleth-options-radio"
      options={[
        { label: "Social Vulnerability Index", value: "svi" },
        { label: "Race", value: "race" },
      ]}
    />,
    <FilterCheckboxes
      key="unserved-choropleth-options-check-boxes"
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
      <ChartContainer
        title="Unserved Children by Risk Factor"
        checkboxes={checkboxes}
        getData={populateGapsData}
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