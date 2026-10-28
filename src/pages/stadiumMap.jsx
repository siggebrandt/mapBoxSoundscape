import { useRef } from "react";
import { Map, Source, Layer } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

import mapBoxControls from "../components/mapBoxControls";
import RenderObject from "../components/renderObject";

const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = import.meta.env.VITE_API_URL;
const apiUrl1 = import.meta.env.VITE_API_URL1;

const stadiumCoordinates = {
  longitude: 11.979925726389924,
  latitude: 57.706510496715524,
};

export default function MapComponent() {
  const mapRef = useRef(null);

  const soundSpots = {
    /* different spots */
    "007": {
      id: "007",
      longitude: 11.97959214596796,
      latitude: 57.70631167357664,
      altitude: 5,
      color: "#e63946",
    },
    "010": {
      id: "010",
      longitude: 11.980266083740867,
      latitude: 57.705760867556926,
      altitude: 5,
      color: "#4ea8de",
    },
    "014": {
      id: "014",
      longitude: 11.980741257876506,
      latitude: 57.70646431305478,
      altitude: 5,
      color: "#80ed99",
    },
    "018": {
      id: "018",
      longitude: 11.979948853707825,
      latitude: 57.70673011007179,
      altitude: 5,
      color: "#ffd166",
    },
  };

  const mapPanning = mapBoxControls(mapRef);

  const maxBounds = [
    [11.979178662486545, 57.70559405517854], // sydväst
    [11.980967290865511, 57.70688948944532], // nordost
  ];

  return (
    <div
      style={{ width: "100%", height: "100vh", touchAction: "none" }}
      {...mapPanning}
    >
      <Map
        ref={mapRef}
        dragPan={false}
        dragRotate={false}
        doubleClickZoom={false}
        scrollZoom={false}
        boxZoom={false}
        keyboard={false}
        touchZoomRotate={false}
        touchPitch={false}
        mapboxAccessToken={apiKey}
        initialViewState={{
          longitude: stadiumCoordinates.longitude,
          latitude: stadiumCoordinates.latitude,
          zoom: 17.5,
          pitch: 45,
          bearing: -45,
          dragPan: false,
          dragRotate: false,
          touchPitch: false,
          keyboard: false,
        }}
        maxBounds={maxBounds}
        style={{ width: "100%", height: "100vh" }}
        mapStyle={apiUrl1}
        maxPitch={85}
        minZoom={17.5}
        maxZoom={17.5}
        terrain={{
          source: "mapbox-dem",
          exaggeration: [
            "interpolate",
            ["linear"],
            ["zoom"],
            12,
            2.8,
            14,
            1.5,
            16,
            1.2,
          ],
        }}
      >
        <Source
          id="mapbox-dem"
          type="raster-dem"
          url="mapbox://mapbox.mapbox-terrain-dem-v1"
          tileSize={512}
          maxzoom={14}
        />
        {/* Manage 3D elements */}
        <Layer
          id="all-buildings"
          source="composite"
          source-layer="building"
          type="fill-extrusion"
          paint={{
            "fill-extrusion-height": [
              "case",
              [
                "in",
                ["id"],
                ["literal", [3114029, 104112635, "3114029", "104112635"]],
              ],
              22,
              0,
            ],
          }}
        />
        <RenderObject spots={soundSpots} />
      </Map>
    </div>
  );
}
