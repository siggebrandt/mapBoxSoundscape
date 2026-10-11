import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Canvas>
        <ambientLight intensity={1} />
        <mesh>
          <boxGeometry />
          <meshStandardMaterial color="red" />
        </mesh>
        <OrbitControls />
      </Canvas>
    </>
  );
}

export default App;
