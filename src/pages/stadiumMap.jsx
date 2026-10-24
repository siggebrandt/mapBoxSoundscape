import { useRef } from "react";
import { Map, Source } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

import mapBoxControls from "../components/mapBoxControls";

const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = import.meta.env.VITE_API_URL;
const apiUrl1 = import.meta.env.VITE_API_URL1;

export default function MapComponent() {
  const mapRef = useRef(null);

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
        mapboxAccessToken={apiKey}
        initialViewState={{
          longitude: 11.979925726389924,
          latitude: 57.706510496715524,
          zoom: 17.5,
          pitch: 60,
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
      </Map>
    </div>
  );
}
