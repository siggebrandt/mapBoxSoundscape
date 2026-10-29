import { Link } from "react-router-dom";
import BackgroundSwitch from "./backgroundSwitch";

export default function Navigation() {
  return (
    <div
      className="navigation"
      style={{
        position: "absolute",
        top: "50%",
        left: "20px",
        zIndex: "2",
      }}
    >
      <div
        style={{
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <Link to="/" style={{ color: "black" }}>
          GAMLA ULLLEVI
        </Link>
        <Link to="/" style={{ color: "black" }}>
          ELEDA STADION
        </Link>
      </div>
    </div>
  );
}
