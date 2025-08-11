import { weatherIconsValue } from "../weatherIconsValue.js";
import { objWrappers } from "../linksToHTMLObjects.js";

export function weatherIcons() {
  if (!objWrappers.wrprWeatherIcons) createWeatherIcons();

  objWrappers.wrprRoot.appendChild(objWrappers.wrprWeatherIcons);
}

function createWeatherIcons() {
  objWrappers.wrprWeatherIcons = document.createElement("div");
  objWrappers.wrprWeatherIcons.id = "wrprWeatherIcons";

  for (const [key, obj] of Object.entries(weatherIconsValue)) {
    if (obj.hasOwnProperty("el"))
      iconFromInnerHTML(obj, objWrappers.wrprWeatherIcons);
    else createIcon(key, obj.title, obj.href, objWrappers.wrprWeatherIcons);
  }
}

function createIcon(imgNameP, titleP, hrefP, wrapperP) {
  const div = document.createElement("div");
  const a = document.createElement("a");

  div.style = `background-image: url(../img/${imgNameP}.png)`;
  a.setAttribute("href", hrefP);
  a.setAttribute("title", titleP);
  a.appendChild(div);

  wrapperP.appendChild(a);
}

function iconFromInnerHTML(objP, wrapperP) {
  const div = document.createElement("div");
  div.innerHTML = objP.el;

  wrapperP.appendChild(div.children[0]);
}
