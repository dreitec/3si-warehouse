import React, { useRef, useEffect, useState } from "react";

import mapboxgl from "mapbox-gl";
import "./Chloropleth.css";
import Massachusets from "./data/Masschusets";
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY || "NA";
interface Props {}

const Choropleth = (props: Props) => {
  const mapContainer = useRef(null);
  const map: any = useRef(null);
  const [lng, setLng] = useState(-71.9143);
  const [lat, setLat] = useState(42.33);
  const [zoom, setZoom] = useState(7);

  //   const bounds = [
  //     [-73.264263, 42.7414], // Southwest coordinates
  //     [-69.872966, 41.25932],
  //   ];

  const options = {
    name: "ELIGIBLE",
    description: "ESTIMATED TOTAL ELIGIBLE",
    property: "ELIGIBLE",
    stops: [
      [0, "#d7e2ff"],
      [1000000, "#afc5ff"],
      [5000000, "#87a8ff"],
      [10000000, "#5f8bff"],
      [50000000, "#376eff"],
      [100000000, "#3263e6"],
      [250000000, "#274db3"],
      [500000000, "#1c3780"],
      [1000000000, "#1c3780"],
    ],
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
    map.current.on("load", () => {
      map.current.addSource("counties", {
        type: "geojson",
        data: Massachusets,
      });

      map.current.addLayer({
        id: "county",
        type: "fill",
        source: "counties",
      });
      map.current.setPaintProperty("county", "fill-color", {
        property: options.property,
        stops: options.stops,
      });
    });

    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  }, []);

  return (
    <div>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
};

export default Choropleth;
