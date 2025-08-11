import { locationWindowTemplate } from "../templates/locationWindow.js";

import {
  objInputs,
  setInputsToObj,
  setWrappersToObj,
} from "../linksToHTMLObjects.js";


export function locationWindow() {
  let templateContainer = document.createElement("div");

  templateContainer.innerHTML = locationWindowTemplate;

  setWrappersToObj("#locationCards, #modalWrpr", templateContainer);

  templateContainer = templateContainer.children[0];

  templateContainer.querySelector("#inputBtnCloseWndwLctn").onclick = () =>
    templateContainer.remove();

  setInputsToObj("input[id], button[id], span[id]", templateContainer);

  objInputs.inputLocation.oninput = function () {
    objInputs.consoleResult.innerHTML = ''
  }

}



