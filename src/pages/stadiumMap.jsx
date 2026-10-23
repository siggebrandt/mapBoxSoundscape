import { Map, Source } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = import.meta.env.VITE_API_URL;

export default function MapComponent() {
  const BOUNDS = {
    west: 12.85,
    south: 55.5,
    east: 13.2,
    north: 55.7,
  };

  // maxBounds i det format Mapbox vill ha
  const maxBounds = [
    [11.986329554910906, 57.705351061645246], // sydväst
    [11.988443118214601, 57.70644723615407], // nordost
  ];

  return (
    <Map
      mapboxAccessToken={apiKey}
      initialViewState={{
        /* bounds: maxBounds, */
        fitBoundsOptions: {
          padding: 40,
          maxZoom: 15,
        },
        latitude: 57.70583,
        longitude: 11.98722,
        zoom: 17.5,
        pitch: 60,
        bearing: -45,
      }}
      maxBounds={maxBounds}
      style={{ width: "100%", height: "100vh" }}
      mapStyle={apiUrl}
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
  );
}
