import React, { useRef, useEffect, useState } from "react";

import mapboxgl from "mapbox-gl";
import "./Chloropleth.css";
import Counties from "./Geojsons/Counties";
import Tracts from "./Geojsons/Tracts";

import Legend from "./Legend/Legend";
import { styled, Container } from "@mui/material";

import { FilterRadioGroup } from "../../";

const StyledContainer = styled("div")(() => ({
  position: "relative",
}));

const StyledRadioContainer = styled("div")(() => ({
  position: "absolute",
  width: "60%",
  top: "70px",
  zIndex: 1,
}));

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY || "NA";
interface Props {
  dataFromProps: any;
  selectedRadioOption: string;
  selectRadioOption: Function;
  selectedType: string;
}

const colors = ["#afc5ff", "#739aff", "#376eff", "#214299"];

const getSteps = (data: any) => {
  const all: any[] = [];
  data.forEach((elem: any) => {
    all.push(elem.percentage);
  });
  //   console.log(all, "all before sort");
  all.sort();
  all[0] = Math.floor(all[0]);
  all[all.length - 1] = Math.ceil(all[all.length - 1]);
  //   console.log(all, "all");
  const mid = Math.floor((all[0] + all[all.length - 1]) / 2);
  const lowerMid = Math.floor((all[0] + mid) / 2);
  const upperMid = Math.floor((all[all.length - 1] + mid) / 2);
  const steps = [
    "step",
    ["get", "ELIGIBLE"],
    colors[0],
    lowerMid,
    colors[1],
    mid,
    colors[2],
    upperMid,
    colors[3],
  ];
  //   console.log(steps);
  return {
    steps,
    ranges: [
      { color: colors[0], text: `${all[0]}-${lowerMid - 1}` },
      { color: colors[1], text: `${lowerMid}-${mid - 1}` },
      { color: colors[2], text: `${mid}-${upperMid - 1}` },
      {
        color: colors[3],
        text: `${upperMid}-${Math.ceil(all[all.length - 1])}`,
      },
    ],
  };
};

const Choropleth = (props: Props) => {
  const {
    dataFromProps,
    selectedRadioOption,
    selectRadioOption,
    selectedType,
  } = props;
  const mapContainer = useRef(null);
  const map: any = useRef(null);
  const [lng, setLng] = useState(-71.9143);
  const [lat, setLat] = useState(42.33);
  const [zoom, setZoom] = useState(7);
  const [steps, setSteps] = useState([
    "step",
    ["get", "ELIGIBLE"],
    colors[0],
    -1,
    colors[1],
    0,
    colors[2],
    2,
    colors[3],
  ]);
  const [ranges, setRanges] = useState([
    { color: colors[0], text: `lo` },
    { color: colors[1], text: `ad` },
    { color: colors[2], text: `in` },
    {
      color: colors[3],
      text: `g`,
    },
  ]);

  const RadioOptions = [
    { value: "county", text: "By County" },
    { value: "region", text: "By Region" },
    { value: "census", text: "By Census" },
  ];

  const GeoJsonSource: any = selectedType === "county" ? Counties : Tracts;

  const options = {
    name: "% Children Eligible",
    property: "ELIGIBLE",
  };
  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current ? mapContainer.current : "null",
      style: "mapbox://styles/team-3si/ckuwv6aye7nff18qv4hsa5bbh",
      center: [lng, lat],
      zoom: zoom,
      // @ts-ignore
      //   maxBounds: bounds,
    });
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  }, []);

  /**
   * manipulate massachusets geojson to add your data and use it as GeoJsonSource
   */
  const makeSource = () => {
    const defaultFeatures = GeoJsonSource.features;
    const newFeatures: any[] = [];
    dataFromProps.forEach((data: any) => {
      let feature = defaultFeatures.find((elem: any) =>
        selectedType === "county"
          ? elem.properties.COUNTYFP === data.COUNTY
          : elem.properties.TRACTCE === data.CENSUS_TRACT
      ) || { properties: {} };
      feature = {
        ...feature,
        properties: {
          ...feature.properties,
          ELIGIBLE: data.percentage | 0,
        },
      };
      newFeatures.push(feature);
    });
    GeoJsonSource.features = newFeatures;
    AddSource(GeoJsonSource);
  };

  /**
   * make steps
   */
  useEffect(() => {
    if (dataFromProps.length === 0) return;
    const stepsData = getSteps(dataFromProps);
    setSteps(stepsData.steps);
    console.log(ranges, stepsData.ranges, "test");
    setRanges(stepsData.ranges);
    console.log(steps);
  }, [dataFromProps]);
  /**
   * once steps are loaded make GeoJsonSource
   */
  useEffect(() => {
    if (steps[3] !== -1) makeSource();
  }, [steps]);

  const removeSource = () => {
    if (!map.current.getSource("counties")) return;
    map.current.removeLayer("county");
    map.current.removeSource("counties");
  };

  const AddSource = (data: any) => {
    if (map.current.getSource("counties")) {
      removeSource();
    }
    map.current.addSource("counties", {
      type: "geojson",
      data,
    });
    map.current.addLayer({
      id: "county",
      type: "fill",
      source: "counties",
    });
    map.current.setPaintProperty("county", "fill-color", steps);
  };

  return (
    <StyledContainer>
      <StyledRadioContainer>
        <Container>
          <FilterRadioGroup
            name="graphtype"
            options={RadioOptions}
            selected={selectedRadioOption}
            setSelected={selectRadioOption}
          />
        </Container>
      </StyledRadioContainer>
      <div ref={mapContainer} className="map-container" />
      <Legend name={options.name} ranges={ranges} />
    </StyledContainer>
  );
};

export default Choropleth;
