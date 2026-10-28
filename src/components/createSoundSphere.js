import * as THREE from "three";

// Bygger en enhetssfär (radie 1) som skalas till `radius` meter via group.scale
export default function createSoundSphere({
  color = "#e63946",
  radius = 6,
  soundName = "soundEffects.mp3",
}) {
  const group = new THREE.Group();
  group.scale.setScalar(radius);

  // Partikelklotet
  const geom = new THREE.SphereGeometry(1, 48, 48);
  const orig = geom.attributes.position.array.slice();
  const cloud = new THREE.Points(
    geom,
    new THREE.PointsMaterial({
      color,
      size: 3.5 * (window.devicePixelRatio || 1),
      sizeAttenuation: false,
    }),
  );

  const ghost = new THREE.Points(
    geom,
    new THREE.PointsMaterial({
      color,
      size: 3.5 * (window.devicePixelRatio || 1),
      sizeAttenuation: false,
      transparent: true,
      opacity: 0.3,
      depthTest: false,
      depthWrite: false,
    }),
  );

  const core = new THREE.Mesh(
    new THREE.SphereGeometry(0.4, 32, 32),
    new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
    }),
  );

  // Osynlig, lite större sfär som gör klotet lätt att träffa
  const hit = new THREE.Mesh(
    new THREE.SphereGeometry(1.3, 12, 12),
    new THREE.MeshBasicMaterial({ visible: false }),
  );

  group.add(core, cloud, ghost, hit);

  // Ljud
  let audio, ctx, analyser, data;
  let playing = false;

  function toggle() {
    if (!audio) {
      audio = new Audio(`/sound/${soundName}`);
      audio.crossOrigin = "anonymous";
      audio.loop = true;
      audio.addEventListener("error", () =>
        console.error("Ljudet kunde inte laddas:", audio.src, audio.error),
      );

      ctx = new (window.AudioContext || window.webkitAudioContext)();
      const source = ctx.createMediaElementSource(audio);
      analyser = ctx.createAnalyser();
      analyser.fftSize = 64;
      analyser.smoothingTimeConstant = 0.8;
      source.connect(analyser);
      analyser.connect(ctx.destination);
      data = new Uint8Array(analyser.frequencyBinCount);
    }
    if (ctx.state === "suspended") ctx.resume();

    if (playing) {
      audio.pause();
      playing = false;
      core.material.opacity = 0.5; // se nedan
      // borttaget: core.scale.setScalar(1);
      // borttaget: geom.attributes.position.array.set(orig);
      // borttaget: geom.attributes.position.needsUpdate = true;
    } else {
      audio.play().catch(console.error);
      playing = true;
      core.material.opacity = 0.85;
    }
  }

  // Anropas varje frame från lagrets render()
  function update(timeSeconds) {
    if (!playing) return;
    analyser.getByteFrequencyData(data);
    const bas = data[0] / 255;
    const mellan = (data[10] || 0) / 128;
    const time = timeSeconds * 1.5;

    core.scale.setScalar(1 + bas * 0.25);

    const pos = geom.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      // Enhetssfär, så originalpositionen är redan normaliserad riktning
      const ox = orig[i * 3];
      const oy = orig[i * 3 + 1];
      const oz = orig[i * 3 + 2];

      const wave =
        Math.sin(ox * 8 + time) *
        Math.cos(oy * 8 - time * 0.5) *
        Math.sin(oz * 8 + time);
      const d = 1 + bas * 0.4 + wave * (0.15 + mellan * 0.25);

      pos.setXYZ(i, ox * d, oy * d, oz * d);
    }
    pos.needsUpdate = true;
  }

  function dispose() {
    if (audio) audio.pause();
    if (ctx) ctx.close();
    [geom, core.geometry, hit.geometry].forEach((g) => g.dispose());
    [cloud.material, ghost.material, core.material, hit.material].forEach((m) =>
      m.dispose(),
    );
  }

  return { group, hit, toggle, update, isPlaying: () => playing, dispose };
}
