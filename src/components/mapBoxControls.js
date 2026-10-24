import { useRef } from "react";
const ROTATE_SENSITIVITY = 0.5;

export default function mapBoxControls(mapRef) {
  const startPointRef = useRef(null);

  const onPointerDown = (e) => {
    if (e.button !== 0) return; // left button only
    startPointRef.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (startPointRef.current === null || !mapRef.current) return;
    const dx = e.clientX - startPointRef.current;
    startPointRef.current = e.clientX;

    const map = mapRef.current.getMap();
    map.jumpTo({ bearing: map.getBearing() + dx * ROTATE_SENSITIVITY });
  };

  const onPointerUp = (e) => {
    startPointRef.current = null;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };
  return { onPointerDown, onPointerMove, onPointerUp };
}
