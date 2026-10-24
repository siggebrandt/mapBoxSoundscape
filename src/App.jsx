import { Routes, Route, Navigate } from "react-router-dom";
import StadiumMap from "./pages/stadiumMap.jsx";
import { Stadium1, Stadium2 } from "./pages/pages";

import "./App.css";

function App() {
  return (
    <>
      <div style={{ width: "100vw", height: "100vh" }}>
        {/* Routes */}
        <Routes>
          <Route path="/" element={<StadiumMap />}></Route>
          <Route path="/ullevi" element={<Stadium1 />}></Route>
          <Route path="/eleda" element={<Stadium2 />}></Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
