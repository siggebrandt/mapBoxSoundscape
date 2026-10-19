import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import StadiumMap from "./pages/stadiumMap";
import { Stadium1, Stadium2, Stadium3 } from "./pages/pages";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Gltf } from "@react-three/drei";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div style={{ width: "100vw", height: "100vh" }}>
        {/* Routes */}
        <Routes>
          <Route path="/" element={<StadiumMap />}></Route>
          <Route path="/1" element={<Stadium1 />}></Route>
          <Route path="/2" element={<Stadium2 />}></Route>
          <Route path="/3" element={<Stadium3 />}></Route>
        </Routes>
      </div>

      {/* -- 3D view --
        <Canvas>
          <ambientLight intensity={1} />
          <mesh>
            <boxGeometry />
            <meshStandardMaterial color="red" />
          </mesh>
          <Gltf src="3d/HockeyComp.glb" position={[0, 0, 0]} />
          <OrbitControls />
        </Canvas> */}
    </>
  );
}

export default App;
