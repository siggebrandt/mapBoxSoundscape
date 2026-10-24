import { useLocation } from "react-router-dom";

export default function BackgroundSwitch() {
  const location = useLocation();
  console.log(location.pathname);

  if (location.pathname == "/ullevi") {
    document.querySelector("#root").style.background = "";
  } else if (location.pathname == "/eleda") {
    document.querySelector("#root").style.background = "";
  } else {
    document.querySelector("#root").style.background = "";
  }
  return null;
}
