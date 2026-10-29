/* /// IMPLEMENT A COMPAS IN HERE
      // MAP COMPASS
      <div className="mapCompas"></div> */

import { useRef } from "react";
const ROTATE_SENSITIVITY = 0.5;
const DRAG_THRESHOLD = 4; // pixlar innan det räknas som en drag

export default function mapBoxControls(mapRef) {
  const startPointRef = useRef(null); // senaste x, för rotationen
  const downXRef = useRef(null); // x vid nedtryck, för tröskeln

  const onPointerDown = (e) => {
    if (e.button !== 0) return; // left button only
    startPointRef.current = e.clientX;
    downXRef.current = e.clientX;
    // ingen setPointerCapture här längre
  };

  const onPointerMove = (e) => {
    if (startPointRef.current === null || !mapRef.current) return;

    // Börja fånga musen först när det faktiskt är en drag
    if (
      !e.currentTarget.hasPointerCapture(e.pointerId) &&
      Math.abs(e.clientX - downXRef.current) > DRAG_THRESHOLD
    ) {
      e.currentTarget.setPointerCapture(e.pointerId);
    }

    const dx = e.clientX - startPointRef.current;
    startPointRef.current = e.clientX;

    const map = mapRef.current.getMap();
    map.jumpTo({ bearing: map.getBearing() + dx * ROTATE_SENSITIVITY });
  };

  const onPointerUp = (e) => {
    startPointRef.current = null;
    downXRef.current = null;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  return { onPointerDown, onPointerMove, onPointerUp };
}
