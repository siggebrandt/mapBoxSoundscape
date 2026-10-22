import { Map, Source } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = import.meta.env.VITE_API_URL;

export default function MapComponent() {
  /* const BOUNDS = {
  west: 12.85,
  south: 55.50,
  east: 13.20,
  north: 55.70,
};

// maxBounds i det format Mapbox vill ha
const maxBounds = [
  [BOUNDS.west, BOUNDS.south], // sydväst
  [BOUNDS.east, BOUNDS.north], // nordost
];
*/
  return (
    <Map
      mapboxAccessToken={apiKey}
      initialViewState={{
        /* bounds: maxBounds,  */
        fitBoundsOptions: {
          padding: 40,
          maxZoom: 15,
        },
        latitude: 57.70583,
        longitude: 11.98722,
        zoom: 16,
        pitch: 60,
        bearing: -20,
      }}
      /* maxBounds={maxBounds} */
      style={{ width: "100%", height: "100vh" }}
      mapStyle={apiUrl}
      maxPitch={85}
      minZoom={16}
      maxZoom={18}
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

