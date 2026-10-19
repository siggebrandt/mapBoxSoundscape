import { useLocation } from "react-router-dom";

export default function BackgroundSwitch() {
  const location = useLocation();
  console.log(location.pathname);

  if (location.pathname == "/1") {
    document.querySelector("#root").style.background = "red";
  } else if (location.pathname == "/2") {
    document.querySelector("#root").style.background = "blue";
  } else if (location.pathname == "/3") {
    document.querySelector("#root").style.background = "green";
  } else if (location.pathname == "/") {
    document.querySelector("#root").style.background = "pink";
  } else {
    document.querySelector("#root").style.background = "";
  }
  return null;
}
