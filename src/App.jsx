import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import { Gltf } from "@react-three/drei";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div style={{ width: "100vw", height: "100vh" }}>
        <Canvas>
          <ambientLight intensity={1} />
          <mesh>
            <boxGeometry />
            <meshStandardMaterial color="red" />
          </mesh>
          <Gltf src="3d/HockeyArena.glb" position={[0, 0, 0]} />
          <OrbitControls />
        </Canvas>
      </div>
    </>
  );
}

export default App;
