import React, { useReducer } from "react";
import type { NextPage } from "next";
import { CSVLink } from "react-csv";
import {
  Compact,
  ChartContainer,
  LineChart,
  Button,
  FilterSelect,
} from "../../components";

import { getPopulationData } from "../../src/frontend/api";
import { PopulationReducer } from "../../state";
import { PopulationState } from "../../src/frontend/Interfaces";
import { UPDATE_FILTERS } from "../../state/types";
import {
  OtherStateObject,
  OtherOptionTree,
} from "../../src/frontend/Constants";

const Home: NextPage = () => {
  const [populationData, setPopulationData] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const populatePopulationData = async () => {
    setLoading(true);
    const keys: string[] = [...getFilters()] || [];

    try {
      const response: any = await getPopulationData(keys);
      setPopulationData(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const initialArg: PopulationState = {
    filters: OtherStateObject,
  };

  const [state, dispatch] = useReducer(PopulationReducer, initialArg);
  React.useEffect(() => {
    populatePopulationData();
  }, []);

  const getFilters = () => {
    const notRequired = ["sp", "all"];
    return Object.keys(state.filters).filter(
      (elem: string) =>
        state.filters[elem] === true && !notRequired.includes(elem)
    );
  };
  const checkboxes = [
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
    <main>
      <Compact>
        <ChartContainer
          title="Population Over Time"
          checkboxes={checkboxes}
          getData={populatePopulationData}
          loading={loading}
          selectedFilters={{ ...state.filters }}
          otherDelete={(filterValue: any) =>
            dispatch({
              type: UPDATE_FILTERS,
              payload: { [filterValue]: false },
            })
          }
          exportButton={
            <CSVLink
              data={Array.isArray(populationData) ? populationData : []}
              filename={"population-line-chart.csv"}
              target="_blank"
            >
              <Button variant="outlined" color="primary">
                Export
              </Button>
            </CSVLink>
          }
        >
          <LineChart keyName={"number"} dataFromProps={populationData} />
        </ChartContainer>
      </Compact>
    </main>
  );
};

export default Home;
