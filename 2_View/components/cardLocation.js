import { cardLocationTemplate } from "../templates/cardLocation.js";
import { objInputs, objWrappers } from "../linksToHTMLObjects.js";

let location, funcToDelAboutLocation, updateActivityStatus, delSelectedLocation;

export function cardLocation(locationP, idxOfKeyLocationP, deleteLoctionDataP, isActive, updateActivityStatusP, delSelectedLocationP) {
  
  location = locationP;

  funcToDelAboutLocation = deleteLoctionDataP;

  delSelectedLocation = delSelectedLocationP;

  updateActivityStatus = updateActivityStatusP;

  const option = createOption(idxOfKeyLocationP);

  createCardLocation(option, idxOfKeyLocationP, isActive);

  isActive && addOptionToSelect(option)

}

function createOption(idxOfKeyLocationP) {

  const { name } = location;

  const option = document.createElement("option");

  option.superValue = idxOfKeyLocationP

  option.value = idxOfKeyLocationP;

  option.innerText = name;

  return option;

}

function createCardLocation(optionP, idxOfKeyLocationP, isActive) {
  
  const templateContainer = document.createElement("div");

  const template = addDataToTemplate();

  templateContainer.innerHTML = template;

  if (location.state) {
    const span = document.createElement("span");
    span.innerText = `${location.state}, `;

    templateContainer
      .querySelector("p")
      .insertBefore(
        span,
        templateContainer.querySelector("p [name=country]").nextSibling
      );
  }

  let argArr = ["[name=add]", "[name=rem]", "[name=del]"];

  const { addBtn, remBtn, delBtn } = getBtns(argArr, templateContainer);

  addBtn.disabled = isActive;
  remBtn.disabled = !isActive;
  delBtn.disabled = isActive

  addBtn.onclick = function () {
    addOptionToSelect(optionP);
    updateActivityStatus(idxOfKeyLocationP);
    this.disabled = true;
    delBtn.disabled = true;
    remBtn.disabled = false;
  };

  remBtn.onclick = function () {
    removeOptionFromSelect(optionP);
    updateActivityStatus(idxOfKeyLocationP);
    delSelectedLocation(idxOfKeyLocationP)
    objInputs.inputSelectLctn
    this.disabled = true;
    addBtn.disabled = false;
    delBtn.disabled = false;
    objInputs.inputSelectLctn.value = 'def'
    // if(idxOfKeyLocationP == this.idxs)

  };

  delBtn.onclick = function () {

    funcToDelAboutLocation(idxOfKeyLocationP);

    this.parentElement.remove();

  };

  objWrappers.locationCards.appendChild(templateContainer.children[0]);

}

function addOptionToSelect(optionP) {
  objInputs.inputSelectLctn.appendChild(optionP);
}

function removeOptionFromSelect(optionP) {
  optionP.remove();
}

function getBtns(arrOfAttributesP, containerP) {
  const resObj = {};

  arrOfAttributesP.forEach((attrP) => {
    resObj[
      // `${attrP.substring(attrP.indexOf("=") + 1, attrP.lastIndexOf("]"))}Btn`
      // ] = containerP.querySelector(attrP);
      `${attrP.substr(attrP.indexOf("=") + 1, 3)}Btn`
    ] = containerP.querySelector(attrP);
  });

  arrOfAttributesP = null;

  return resObj;
}

function addDataToTemplate() {

  let template = false;

  for (const [key, value] of Object.entries(location)) {

    if (!template) {
      template = cardLocationTemplate.replace(`{{${key}}}`, value);
      continue;
    }

    template = template.replace(`{{${key}}}`, value);

  }

  return template;
}

