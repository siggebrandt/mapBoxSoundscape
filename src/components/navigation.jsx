import { Link } from "react-router-dom";
import BackgroundSwitch from "./backgroundSwitch";

export default function Navigation() {
  return (
    <>
      <BackgroundSwitch />
      <Link to="/">Map</Link>
      <Link to="/1">One</Link>
      <Link to="/2">Two</Link>
      <Link to="/3">Three</Link>
    </>
  );
}
