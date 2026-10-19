export default function BackgroundSwitch({ path }) {
  if (path == "/1") {
    document.querySelector("#root").style.background = "red";
  } else if (path == "/2") {
    document.querySelector("#root").style.background = "blue";
  } else if (path == "/3") {
    document.querySelector("#root").style.background = "green";
  }

  if (!path) {
    document.querySelector("#root").style.background = "";
  }
}
