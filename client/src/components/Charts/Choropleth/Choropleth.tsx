import React, { useRef, useEffect, useState } from "react";

import mapboxgl from "mapbox-gl";
import "./Chloropleth.css";
import Massachusets from "./data/Masschusets";
import Legend from "./Legend/Legend";
import { styled } from "@mui/material";

const StyledContainer = styled("div")(() => ({
  position: "relative",
}));

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY || "NA";
interface Props {
  dataFromProps: any;
}

const colors = ["#afc5ff", "#376eff", "#1c3780"];

const getStops = (data: any) => {
  const all: any[] = [];
  data.forEach((elem: any) => {
    all.push(elem.percentage);
  });
  console.log(all, "all before sort");
  all.sort();
  all[0] = Math.floor(all[0]);
  all[all.length - 1] = Math.ceil(all[all.length - 1]);
  console.log(all, "all");
  const mid = Math.floor((all[0] + all[all.length - 1]) / 2);
  const lowerMid = Math.floor((all[0] + mid) / 2);
  const upperMid = Math.floor((all[all.length - 1] + mid) / 2);
  const stops = [
    [Math.floor(all[0]), colors[0]],
    [lowerMid, colors[1]],
    [upperMid, colors[2]],
  ];
  console.log(stops);
  return { stops, lastValue: Math.ceil(all[all.length - 1]) };
};

const Choropleth = (props: Props) => {
  const { dataFromProps } = props;
  const mapContainer = useRef(null);
  const map: any = useRef(null);
  const [lng, setLng] = useState(-71.9143);
  const [lat, setLat] = useState(42.33);
  const [zoom, setZoom] = useState(7);
  const [stops, setStops] = useState([
    [-1, "#FFF"],
    [-1, "#AFA"],
    [-1, "#FAF"],
  ]);
  const [lastValue, setLastValue] = useState(31);
  //   const bounds = [
  //     [-73.264263, 42.7414], // Southwest coordinates
  //     [-69.872966, 41.25932],
  //   ];

  const options = {
    name: "% Children Eligible",
    property: "ELIGIBLE",
    // [
    //   [0, "#d7e2ff"],
    //   [10, "#afc5ff"],
    //   [20, "#87a8ff"],
    //   [30, "#376eff"],
    //   [40, "#274db3"],
    //   [50, "#1c3780"],
    // ],
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
   * manipulate massachusets geojson to add your data and use it as source
   */
  const makeSource = () => {
    const defaultFeatures = Massachusets.features;
    const newFeatures: any[] = [];
    dataFromProps.forEach((data: any) => {
      let feature = defaultFeatures.find(
        (elem: any) => elem.properties.COUNTYFP === data.COUNTY
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
    Massachusets.features = newFeatures;
    AddSource(Massachusets);
  };

  /**
   * make stops
   */
  useEffect(() => {
    if (dataFromProps.length === 0) return;
    setStops(getStops(dataFromProps).stops);
    setLastValue(getStops(dataFromProps).lastValue);
  }, [dataFromProps]);
  /**
   * once stops are loaded make source
   */
  useEffect(() => {
    if (stops[0][0] !== -1) makeSource();
  }, [stops]);

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
    map.current.setPaintProperty("county", "fill-color", {
      property: options.property,
      stops,
    });
  };
  //   if (map && map.current) {
  //     console.log(map.current.setPaintProperty("county", "fill-color"));
  //   }
  return (
    <StyledContainer>
      {/* <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div> */}

      <div ref={mapContainer} className="map-container" />
      <Legend name={options.name} stops={stops} lastValue={lastValue} />
    </StyledContainer>
  );
};

export default Choropleth;
