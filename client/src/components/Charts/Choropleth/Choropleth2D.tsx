/* eslint-disable import/no-webpack-loader-syntax */
import React, { useRef, useEffect, useState } from "react";
import chroma from "chroma-js";

// @ts-ignore
import mapboxgl from "!mapbox-gl";
import { styled } from "@mui/material";
import Legend from "./Legend/Legend2D";
import Counties from "./Geojsons/Counties";
import "./Chloropleth.css";

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

interface Options {
  property: string;
  name: string;
}
interface Props {
  dataFromProps: any;
  selectedRadioOption?: string;
  selectRadioOption?: Function;
  selectedType?: string;
  options: Options;
  showRadio?: boolean;
}

var row1 = chroma.scale(["#367BF5", "#12214D"]).colors(3);
var row3 = chroma.scale(["#ff4538", "#610a0a"]).colors(3);
var row2 = chroma
  .scale([chroma.mix("#367BF5", "#ff4538"), chroma.mix("#12214D", "#610a0a")])
  .colors(3);

const colors = [...row3, ...row2, ...row1];
const svi = [
  0.3077,
  1,
  0.5385,
  0.4615,
  0.2308,
  0.9231,
  0,
  0.6154,
  0.1538,
  0.6923,
  0.7692,
  0.3846,
  0.8462,
  0.0769,
].sort((a: number, b: number) => a - b);

console.log(svi, "svis");

const ReplaceWithK = (number: number): string => {
  let numberStr = number.toString();
  if (numberStr.length > 4) return number.toString().slice(0, -3) + "K";
  return numberStr;
};

const getSteps = (data: any, property: string) => {
  const all: any[] = [];
  data.forEach((elem: any) => {
    all.push(elem[property]);
  });
  all.sort((a: number, b: number) => a - b);
  if (all[0] === all[all.length - 1]) {
    return {
      steps: [],
      ranges: colors,
    };
  }

  all[0] = Math.floor(all[0]);
  console.log(all, "all data");
  all[all.length - 1] = Math.ceil(all[all.length - 1]);
  const mid = Math.floor((all[0] + all[all.length - 1]) / 2);
  const lowerMid = Math.floor((all[0] + mid) / 2);
  const upperMid = Math.floor((all[all.length - 1] + mid) / 2);
  const steps = [
    "step",
    ["get", property],
    colors[0],
    lowerMid,
    colors[1],
    mid,
    colors[2],
    upperMid,
    colors[3],
  ];
  return {
    steps,
    ranges: colors,
  };
};

const Choropleth = (props: Props) => {
  const { dataFromProps, selectedType, options } = props;
  const mapContainer = useRef(null);
  const map: any = useRef(null);
  const [lng, setLng] = useState(-71.9143);
  const [lat, setLat] = useState(42.33);
  const [zoom, setZoom] = useState(7);

  const [steps, setSteps] = useState([
    "step",
    ["get", options.property],
    colors[0],
    -1,
    colors[1],
    0,
    colors[2],
    2,
    colors[3],
  ]);
  const [ranges, setRanges] = useState(colors);

  const GeoJsonSource: any = Counties;

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
    let newFeatures: any[] = [];
    dataFromProps.forEach((data: any) => {
      let feature = defaultFeatures.find((elem: any) => {
        let condition: boolean = false;
        condition = elem.properties.COUNTYFP === data.COUNTY;
        return condition;
      }) || { properties: {} };
      feature = {
        ...feature,
        properties: {
          ...feature.properties,
          [options.property]: data[options.property] | 0,
        },
      };
      newFeatures.push(feature);
    });

    newFeatures = newFeatures.sort(
      (a: any, b: any) =>
        a.properties[options.property] - b.properties[options.property]
    );

    GeoJsonSource.features = newFeatures;
    AddSource(GeoJsonSource);
  };

  /**
   * make steps
   */
  useEffect(() => {
    if (dataFromProps.length === 0) return;
    const stepsData = getSteps(dataFromProps, options.property);
    setSteps(stepsData.steps);
    setRanges(stepsData.ranges);
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
    map.current.removeLayer("outline");
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
    // Add a black outline around the polygon.
    map.current.addLayer({
      id: "outline",
      type: "line",
      source: "counties",
      layout: {},
      paint: {
        "line-color": "#000",
        "line-width": 1,
      },
    });
    map.current.setPaintProperty(
      "county",
      "fill-color",
      steps.length === 0 ? colors[3] : steps
    );
  };

  return (
    <StyledContainer>
      <StyledRadioContainer></StyledRadioContainer>
      <div ref={mapContainer} className="map-container" />
      <Legend ranges={ranges} />
    </StyledContainer>
  );
};

export default Choropleth;
