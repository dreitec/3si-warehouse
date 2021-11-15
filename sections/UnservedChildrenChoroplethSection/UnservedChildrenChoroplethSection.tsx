import React, { useReducer } from "react";
import { CSVLink } from "react-csv";
import {
  ChartContainer,
  FilterSelect,
  RadioButton,
  Choropleth2D as Choropleth,
  Button,
} from "../../components";
import { getGeographicalUnservedData } from "../../src/frontend/api";
import { GapsReducer } from "../../state";
import { GapsState } from "../../src/frontend/Interfaces";
import { UPDATE_FILTERS } from "../../state/types";
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
    // <RadioButton
    //   key="unserved-choropleth-options-radio"
    //   options={[
    //     { label: "Social Vulnerability Index", value: "svi" },
    //     { label: "Race", value: "race" },
    //   ]}
    // />,
    <FilterSelect
      key="filter-other-check"
      name="Other Filters"
      data={OtherOptionTree}
      selected={state.filters}
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
        showOptionSelector={false}
        selectedFilters={{ ...state.filters }}
        programDelete={(filterValue: any) =>
          dispatch({
            type: UPDATE_FILTERS,

            payload: { [filterValue]: false },
          })
        }
        otherDelete={(filterValue: any) =>
          dispatch({
            type: UPDATE_FILTERS,
            payload: { [filterValue]: false },
          })
        }
        exportButton={
          <CSVLink
            data={Array.isArray(gapsData) ? gapsData : []}
            filename={"unserved-geographical-chart.csv"}
            target="_blank"
          >
            <Button variant="outlined" color="primary">
              Export
            </Button>
          </CSVLink>
        }
      >
        <Choropleth
          dataFromProps={gapsData}
          showRadio={false}
          options={{ name: "% Children Served", property: "percentage" }}
          toggle={{
            checked: dataNotation,
            onToggle: setDataNotation,
            labels: ["Percent", "Number"],
          }}
        />
      </ChartContainer>
    </>
  );
};
export default UnservedChildrenChoroplethSection;
