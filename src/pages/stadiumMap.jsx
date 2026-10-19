import { Map, Source } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

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
      mapboxAccessToken="pk.eyJ1Ijoic3BlY3RyYXp6eiIsImEiOiJjbXZmY2t6ZmcwMDgzMnpyNnNtdndidjBxIn0.3KKvqZEE62eqpoZcFgUiJg"
      initialViewState={{
        /* bounds: maxBounds,  */ // visar hela området direkt
        fitBoundsOptions: {
          padding: 40, // lite luft runt kanten
          maxZoom: 15,
        },
        longitude: 13.00073,
        latitude: 55.60587,
        zoom: 16,
        pitch: 60,
        bearing: -20,
      }}
      /* maxBounds={maxBounds} */
      style={{ width: "100%", height: "100vh" }}
      mapStyle="mapbox://styles/spectrazzz/cmvfd8jpo00eh01s69uxsfzfu"
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
