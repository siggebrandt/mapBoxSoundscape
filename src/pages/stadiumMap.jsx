import { useRef } from "react";
import { Map, Source } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = import.meta.env.VITE_API_URL;

const ROTATE_SENSITIVITY = 0.5; // degrees of bearing per pixel dragged

export default function MapComponent() {
  const mapRef = useRef(null);
  const lastX = useRef(null);

  const onPointerDown = (e) => {
    if (e.button !== 0) return; // left button only
    lastX.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (lastX.current === null || !mapRef.current) return;
    const dx = e.clientX - lastX.current;
    lastX.current = e.clientX;

    const map = mapRef.current.getMap();
    map.jumpTo({ bearing: map.getBearing() + dx * ROTATE_SENSITIVITY });
  };

  const onPointerUp = (e) => {
    lastX.current = null;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const maxBounds = [
    [11.986104478638646, 57.70540479243435], // sydväst
    [11.988443118214601, 57.70644723615407], // nordost
  ];

  return (
    <div
      style={{ width: "100%", height: "100vh", touchAction: "none" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <Map
        ref={mapRef}
        mapboxAccessToken={apiKey}
        initialViewState={{
          latitude: 57.70583,
          longitude: 11.98722,
          zoom: 17.5,
          pitch: 60,
          bearing: -45,
          dragPan: false,
          dragRotate: false,
          touchPitch: false,
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
    </div>
  );
}
