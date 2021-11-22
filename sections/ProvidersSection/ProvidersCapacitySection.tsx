import React, { useReducer, useEffect, useState } from "react";
import { CSVLink } from "react-csv";

import {
  ChartContainer,
  LineChart,
  FilterSelect,
  Button,
} from "../../components";

import { getCapacityOverTimeData } from "../../src/frontend/api";
import { ProvidersCapacityReducer } from "../../state";
import { ProvidersCapacityState } from "../../src/frontend/Interfaces";
import { UPDATE_SITE_FILTERS } from "../../state/types";
import { SitesStateObject, SiteOptionTree } from "../../src/frontend/Constants";

const GeographicalELigibility = () => {
  const [capacityData, setCapacityData] = useState();
  const [loading, setLoading] = useState(false);

  const initialArg: ProvidersCapacityState = {
    siteFilers: SitesStateObject,
  };

  const [state, dispatch] = useReducer(ProvidersCapacityReducer, initialArg);

  useEffect(() => {
    loadCapacityData();
  }, []);

  const loadCapacityData = async () => {
    try {
      setLoading(true);
      const keys: string[] = getFilters() || [];
      const data: any = await getCapacityOverTimeData(keys);
      setCapacityData(data);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getFilters = () => {
    const notRequired = ["sp", "all"];
    return Object.keys(state.siteFilers).filter(
      (elem: string) =>
        state.siteFilers[elem] === true && !notRequired.includes(elem)
    );
  };

  const checkboxes = [
    <FilterSelect
      key="providers-section-site-filters"
      name="Site Filters"
      data={SiteOptionTree}
      selected={state.siteFilers}
      setState={(payload: any) =>
        dispatch({
          type: UPDATE_SITE_FILTERS,
          payload,
        })
      }
    />,
  ];
  return (
    <>
      <ChartContainer
        title="Service Sites"
        checkboxes={checkboxes}
        getData={loadCapacityData}
        loading={loading}
        selectedFilters={{
          ...state.siteFilers,
        }}
        sitesDelete={(filterValue: any) =>
          dispatch({
            type: UPDATE_SITE_FILTERS,
            payload: { [filterValue]: false },
          })
        }
        exportButton={
          <CSVLink
            data={Array.isArray(capacityData) ? capacityData : []}
            filename={"service-sites-graph.csv"}
            target="_blank"
          >
            <Button variant="outlined" color="primary">
              Export
            </Button>
          </CSVLink>
        }
      >
        <LineChart keyName={"number"} dataFromProps={capacityData} />
      </ChartContainer>
    </>
  );
};

export default GeographicalELigibility;
