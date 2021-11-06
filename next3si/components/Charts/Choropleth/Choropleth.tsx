/* eslint-disable import/no-webpack-loader-syntax */
import React, { useRef, useEffect, useState } from "react";

// @ts-ignore
import mapboxgl from "!mapbox-gl";
import { styled, Container } from "@mui/material";
import Legend from "./Legend/Legend";
import { FilterRadioGroup } from "../..";
import Counties from "./Geojsons/Counties";
import Tracts from "./Geojsons/Tracts";
import Regions from "./Geojsons/Regions";
import styles from "./Chloropleth.module.css";

const StyledContainer = styled("div")(() => ({
  position: "relative",
}));

const StyledRadioContainer = styled("div")(() => ({
  position: "absolute",
  width: "60%",
  top: "70px",
  zIndex: 1,
}));

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY || "NA";

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

const colors = ["#afc5ff", "#739aff", "#376eff", "#214299"];

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
      ranges: [
        {
          color: colors[3],
          text: `${all[0]}%`,
        },
      ],
    };
  }

  all[0] = Math.floor(all[0]);
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
    ranges: [
      { color: colors[0], text: `${all[0]}-${ReplaceWithK(lowerMid - 1)}` },
      {
        color: colors[1],
        text: `${ReplaceWithK(lowerMid)}-${ReplaceWithK(mid - 1)}`,
      },
      {
        color: colors[2],
        text: `${ReplaceWithK(mid)}-${ReplaceWithK(upperMid - 1)}`,
      },
      {
        color: colors[3],
        text: `${ReplaceWithK(upperMid)}-${ReplaceWithK(
          Math.ceil(all[all.length - 1])
        )}`,
      },
    ],
  };
};

const Choropleth = (props: Props) => {
  const {
    dataFromProps,
    selectedRadioOption = "",
    selectRadioOption = () => {},
    selectedType,
    options,
    showRadio = true,
  } = props;
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

  const GeoJsonSource: any =
    selectedType === "county"
      ? Counties
      : selectedType === "region"
      ? Regions
      : Tracts;

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
      let feature = defaultFeatures.find((elem: any) => {
        let condition: boolean = false;
        if (selectedType === "county") {
          condition = elem.properties.COUNTYFP === data.COUNTY;
        } else if (selectedType === "region") {
          condition = elem.properties.RegionName === data.EEC_REGIONNAME;
        } else {
          condition = elem.properties.TRACTCE === data.CENSUS_TRACT;
        }
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
      <StyledRadioContainer>
        {showRadio && (
          <Container>
            <FilterRadioGroup
              name="graphtype"
              options={RadioOptions}
              selected={selectedRadioOption}
              setSelected={selectRadioOption}
            />
          </Container>
        )}
      </StyledRadioContainer>
      <div ref={mapContainer} className={styles.mapContainer} />
      <Legend name={options.name} ranges={ranges} />
    </StyledContainer>
  );
};

export default Choropleth;
