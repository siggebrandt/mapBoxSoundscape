import * as THREE from "three";
import mapboxgl from "mapbox-gl";
import { useEffect, useId } from "react";
import { useMap } from "react-map-gl/mapbox";
import createSoundSphere from "./createSoundSphere";

function createLayer({ id, spots, color, altitude, radius, map }) {
  const list = Object.values(spots);

  // Första spoten är lagrets origin, övriga räknas i meter relativt den
  const origin = mapboxgl.MercatorCoordinate.fromLngLat(
    [list[0].longitude, list[0].latitude],
    0,
  );
  const meterScale = origin.meterInMercatorCoordinateUnits();

  const camera = new THREE.Camera();
  const scene = new THREE.Scene();
  const raycaster = new THREE.Raycaster();
  const spheres = [];
  let renderer;

  return {
    id,
    type: "custom",
    renderingMode: "3d",
    slot: "middle",

    onAdd(m, gl) {
      renderer = new THREE.WebGLRenderer({
        canvas: m.getCanvas(),
        context: gl,
        antialias: true,
      });
      renderer.autoClear = false;

      list.forEach((spot) => {
        const sphere = createSoundSphere({
          color: spot.color ?? color,
          radius: spot.radius ?? radius,
          soundName: spot.soundName, // undefined => standardljudet
        });

        const ground =
          map.queryTerrainElevation([spot.longitude, spot.latitude]) ?? 0;
        const p = mapboxgl.MercatorCoordinate.fromLngLat(
          [spot.longitude, spot.latitude],
          0,
        );
        sphere.group.position.set(
          (p.x - origin.x) / meterScale,
          -(p.y - origin.y) / meterScale,
          0,
        );
        sphere.anchor = {
          longitude: spot.longitude,
          latitude: spot.latitude,
          altitude: spot.altitude ?? altitude,
          ground: 0,
        };

        scene.add(sphere.group);
        spheres.push(sphere);
      });
    },

    render(gl, matrix) {
      const m = new THREE.Matrix4().fromArray(matrix);
      const l = new THREE.Matrix4()
        .makeTranslation(origin.x, origin.y, origin.z)
        .scale(new THREE.Vector3(meterScale, -meterScale, meterScale));
      camera.projectionMatrix = m.multiply(l);

      const t = performance.now() / 1000;
      spheres.forEach((s) => {
        const a = s.anchor;
        const g = map.queryTerrainElevation([a.longitude, a.latitude]);
        if (g != null) a.ground = g; // behåll senaste värdet om terrängen inte är laddad
        s.group.position.z = a.ground + a.altitude;
        s.update(t);
      });

      renderer.resetState();
      renderer.render(scene, camera);

      // Håll animationen igång bara när något spelar
      if (spheres.some((s) => s.isPlaying())) map.triggerRepaint();
    },

    onRemove() {
      spheres.forEach((s) => s.dispose());
    },

    // Vilket klot ligger under skärmpunkten? (point i CSS-pixlar)
    pick(point) {
      const { width, height } = map.getCanvas().getBoundingClientRect();
      const x = (point.x / width) * 2 - 1;
      const y = 1 - (point.y / height) * 2;

      const inv = camera.projectionMatrix.clone().invert();
      const near = new THREE.Vector3(x, y, -1).applyMatrix4(inv);
      const far = new THREE.Vector3(x, y, 1).applyMatrix4(inv);
      raycaster.set(near, far.sub(near).normalize());

      const hits = raycaster.intersectObjects(
        spheres.map((s) => s.hit),
        false,
      );
      return hits.length ? spheres.find((s) => s.hit === hits[0].object) : null;
    },
  };
}

export default function RenderObject({
  spots,
  color = "#e63946",
  altitude = 20,
  radius = 6,
}) {
  const { current: mapRef } = useMap();
  const layerId = useId();

  useEffect(() => {
    if (!mapRef || !Object.keys(spots).length) return;
    const map = mapRef.getMap();
    let layer = null;
    let down = null;

    const add = () => {
      if (map.getLayer(layerId)) map.removeLayer(layerId);
      layer = createLayer({ id: layerId, spots, color, altitude, radius, map });
      map.addLayer(layer);
    };

    // Ignorera klick som egentligen var en drag (rotation)
    const onDown = (e) => (down = e.point);
    const onClick = (e) => {
      if (!layer) return;
      if (down && Math.hypot(e.point.x - down.x, e.point.y - down.y) > 5)
        return;
      const hit = layer.pick(e.point);
      if (hit) {
        hit.toggle();
        map.triggerRepaint();
      }
    };
    const onMove = (e) => {
      if (!layer) return;
      map.getCanvas().style.cursor = layer.pick(e.point) ? "pointer" : "";
    };

    if (map.loaded()) add();
    else map.once("idle", add);

    map.on("mousedown", onDown);
    map.on("click", onClick);
    map.on("mousemove", onMove);

    return () => {
      map.off("idle", add);
      map.off("mousedown", onDown);
      map.off("click", onClick);
      map.off("mousemove", onMove);
      if (map.getLayer(layerId)) map.removeLayer(layerId);
    };
  }, [mapRef, layerId, spots, color, altitude, radius]);

  return null;
}
