import { objWrappers, namesObj, objInputs } from "./linksToHTMLObjects.js";
import { locationWindow } from "./components/locationWindow.js";
import { cardLocation } from "./components/cardLocation.js";
import { currentWeather } from "./components/currentWeatherCard.js";
import { futureWeatherCars } from "./components/futureWeatherCards.js";
import { weatherIcons } from "./components/weatherIconsHomePage.js";
import { LoadAnimation } from "./elements/LoadAnimation.js";
// import { templates } from "./templates/templates.js";

class View {
  constructor() {
    this.addLocationWindow();
    this.showWeatherIcons();

    LoadAnimation.createLoadAnimatoin()

    this._wrappers = {};
    this._inputs = {};
    // this._currentLocation = null;
    this._activeLocations = [];
    this._selectedLocation = null;

  }

  showLoadAnimation() {

    this.removeElement([
      objWrappers.wrprInitialInfo,
      objWrappers.wrprWeatherIcons,
      objWrappers.wrprCurrentWeather,
      objWrappers.wrprFutureWeather,
    ]);

    LoadAnimation.addLoadAnimation({ addTo: objWrappers.wrprRoot })

  }

  removeLoadAnimation() {
    LoadAnimation.removeLoadAnimation()
  }

  addLocationWindow() {
    locationWindow();
  }

  showWeatherIcons() {
    weatherIcons();
  }

  showCardLocation(locationP, idxOfKeyLocationP, removeLocationP, isActiveP) {

    const { delSelectedLocation, updateActivityStatusOfLocation } = view;


    if (typeof isActiveP == "boolean") {

      cardLocation(locationP, idxOfKeyLocationP, removeLocationP, isActiveP, updateActivityStatusOfLocation, delSelectedLocation);

      return

    }

    this.activeLocation = { index: idxOfKeyLocationP, isActive: false };

    cardLocation(locationP, idxOfKeyLocationP, removeLocationP, false, updateActivityStatusOfLocation, delSelectedLocation);

  }

  async showCurrentWeatherCard(dataP) {
    currentWeather(dataP);
  }

  async showFutureWeatherCards(dataP) {
    futureWeatherCars(dataP);
  }

  removeElement(elP) {
    if (Array.isArray(elP))
      elP.forEach(
        (el) => {
          if (!el) return
          updateElementStylesAfterRemoveInitInfo(el.id);
          el.remove()
        }
      );
    else elP.remove();
  }

  // setLanguageColor(langDiv) {
  //   objWrappers.wrprLang
  //     .querySelector(".langColor")
  //     .classList.remove("langColor");

  //   langDiv.classList.add("langColor");
  // }

  updateConsoleResult(checkInputP) {

    objInputs.inputBtnSearchLctn.disabled = true
    updateConsoleResultView('-----------', 'black')

    setTimeout(() => {

      if (checkInputP == 1)
        updateConsoleResultView('incorect input', 'darkred')

      if (checkInputP == 2)
        updateConsoleResultView('location not find', 'darkred')

      if (checkInputP == 3)
        updateConsoleResultView('location added', 'green')

      if (checkInputP == 4)
        updateConsoleResultView(`this request has already been made,
        there are no results for it. Location not find.`, 'darkred')

      if (checkInputP == 5)
        updateConsoleResultView(`location information has already
        been requested before`, 'black')

      if (checkInputP == 6)
        updateConsoleResultView('user search location is error', 'darkred')

      objInputs.inputBtnSearchLctn.disabled = false

    }, 1000)
  }

  updateActivityStatusOfLocation(idxOfKeyLocationP) {

    const index = view.activeLocationsArr.findIndex(el => el.index == idxOfKeyLocationP);

    view.activeLocationsArr[index].isActive = !view.activeLocationsArr[index].isActive;


  }

  delSelectedLocation(idxOfKeyLocationP) {
    view.selectedLocation = idxOfKeyLocationP == view.selectedLocation ? null : view.selectedLocation;
  }


  set selectedLocation(indexLocationP) {
    this._selectedLocation = indexLocationP;
  }

  get selectedLocation() {
    return this._selectedLocation;
  }


  set activeLocation(locationValuesIndexIsActive) {

    this._activeLocations.push(locationValuesIndexIsActive)

  }


  set activeLocationsArr(arrP) {
    this._activeLocations = arrP
  }

  get activeLocationsArr() {
    return this._activeLocations;
  }

  set wrappers({ selectorP, elP }) {
    this._wrappers[selectorP] = elP.querySelector(selectorP);

    const arr = elementP.querySelectorAll(selectorP);

    arr.forEach((el) => {
      this._wrappers[el.id] = el;
    });
  }

  get wrappers() {
    return this._wrappers;
  }

  set inputs({ selectorP, elP }) {
    this._inputs[selectorP] = elP.querySelector(selectorP);
  }

  get inputs() {
    return this._inputs;
  }
}

export const view = new View();

function updateConsoleResultView(textP, colorP) {
  objInputs.consoleResult.innerHTML = textP
  objInputs.consoleResult.style.color = colorP
}

function updateElementStylesAfterRemoveInitInfo(idElP) {
  switch (true) {
    case idElP == "wrprInitialInfo":
      objWrappers.wrprHeader.classList.add(namesObj.CSS.class.f_algn_itms_cntr);

      break;
  }
}


