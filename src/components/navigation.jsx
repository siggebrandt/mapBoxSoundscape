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
      <BackgroundSwitch />
      <div
        style={{
          transform: "translateY(-50%)", // ??
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <Link to="/1">STADIUM ONE</Link>
        <Link to="/2">STADIUM TWO</Link>
        <Link to="/3">STADIUM THREE</Link>
      </div>
    </div>
  );
}
