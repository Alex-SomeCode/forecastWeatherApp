import { forecastWeatherModel } from "../1_Models/Forecast/ForecastModel.js";
import { locationModel } from "../1_Models/Location/LocationModel.js";
import { objInputs, objWrappers } from "../2_View/linksToHTMLObjects.js";
import { view } from "../2_View/View.js";
import { ERRORS } from "../errors.js";
import { LocalStorage } from "../1_Models/LocalStorage/LocalStorage.js";


class Controller {
  constructor() {
    this._keys = { _arr: [], _crntIdx: null };
    this.setFuncsForBtns();
    this._prevInputs = [];
  }

  async requestLocationData() {

    const { error, indxLocation } = await getLocationData();

    if (error === ERRORS.getLocation.repeatedInput) return false

    if (error === ERRORS.getLocation.incorrectInput) return false


    if (error === ERRORS.getLocation.noFoundResult) {

      view.updateConsoleResult(2)

      return false

    }

    if (error === ERRORS.getLocation.request) {

      view.updateConsoleResult(6)

      return false
    }

    this.input = { input: userInput, indxLocation };

    locationModel.indxKeyforResponse = indxLocation;

    LocalStorage.locationData = { locationsP: locationModel.locations, keysP: locationModel.keysInFormArrays, prevInputsP: this.prevInputs }


    if (!forecastWeatherModel.allForecasts[indxLocation]) forecastWeatherModel.addIndxAllForecast = indxLocation;

    const cardlocationData = locationModel.location;

    view.updateConsoleResult(3);


    const { removeLocation } = locationModel

    setTimeout(() => view.showCardLocation(cardlocationData, indxLocation, removeLocation), 1400);

  }

  async requestWeatherData() {

    if (!objInputs.inputSelectLctn.value) return;

    let generalIndex = setIndxKeyForRequest()

    view.selectedLocation = generalIndex;

    let forecast;

    if (forecastWeatherModel.allForecasts.length > 0 && forecastWeatherModel.allForecasts[generalIndex])
      forecast = neadsForecastUpdate(forecastWeatherModel.allForecasts[generalIndex]);

    if (!forecast) forecast = await getForecastWeatherData();

    if (!forecast) return false

    forecast = prepareForecastDataForViewModel(forecast, generalIndex)

    view.showLoadAnimation()

    setTimeout(() => { view.removeLoadAnimation() }, 1800)

    setTimeout(() => {
      view.showCurrentWeatherCard(forecast.currentWeather);
      view.showFutureWeatherCards({
        futureWeather: forecast.futureWeather,
        groupsWeatherImg: forecastWeatherModel.groupsWeatherImg,
      })
    }, 2000);

  }

  inputCheckForRepeatedRequest() {

    return this.input.indexOf(userInput) < 0 ? false : true

  }

  setFuncsForBtns() {

    objInputs.inputBtnOpnLctnWindow.onclick = () => {

      document.body.appendChild(objWrappers.modalWrpr);

    };

    objInputs.inputBtnSearchLctn.onclick = () => this.requestLocationData();

    objInputs.inputBtnGetForecast.onclick = () => {

      this.requestWeatherData()

    };

  }

  start() {

    if (LocalStorage.dataExist()) {

      const { data, keys, inputs, activeCardLocations, selectedLocation, pastsWeatherForecasts } = LocalStorage.locationData;

      locationModel.locations = data;

      locationModel.keys = keys;

      controller.prevInputs = inputs;

      view.selectedLocation = typeof selectedLocation == 'number' ? selectedLocation : null;

      const { removeLocation } = locationModel;

      activeCardLocations && (view.activeLocationsArr = activeCardLocations);

      pastsWeatherForecasts && pastsWeatherForecasts.length > 0 && (forecastWeatherModel.allForecasts = pastsWeatherForecasts);

      let location = null;


      keys.forEach((el, index) => {

        locationModel.indxKeyforResponse = index;

        location = locationModel.location;

        if (location.remove) return

        if (activeCardLocations) {

          const el = activeCardLocations.find(el => index == el.index);

          view.showCardLocation(location, index, removeLocation, el.isActive);

          return

        }

        view.showCardLocation(location, index, removeLocation, el, null);

      });

      typeof selectedLocation == 'number' && (objInputs.inputSelectLctn.value = selectedLocation, view.removeElement(objWrappers.wrprInitialInfo), this.requestWeatherData());

    }


    window.addEventListener('beforeunload', function () {

      controller.beforeunload()

    })

  }

  beforeunload() {

    LocalStorage.locationData = {
      locationsP: locationModel.locations,
      keysP: locationModel.keysInFormArrays,
      prevInputsP: controller.prevInputs,
    }

    LocalStorage.viewValues = { activeCardLocationsP: view.activeLocationsArr, selectedLocationP: view.selectedLocation }

    LocalStorage.pastsWeatherForecast = forecastWeatherModel.allForecasts

  }

  set input({ input, indxLocation }) {

    this._prevInputs.push({ input, indxLocation })

  }

  get prevInputs() {

    return this._prevInputs

  }

  set prevInputs(inputsP) {

    this._prevInputs = inputsP

  }

}

let userInput;

export const controller = new Controller();

// -------funcs
function setIndxKeyForRequest() {
  
  let generalIndex;

  Array.from(objInputs.inputSelectLctn.children).find(el => {
    if (el.selected == true) generalIndex = el.superValue
  });

  // if (!generalIndex) return false

  locationModel.indxKeyforResponse = generalIndex;
  forecastWeatherModel.indxKeyForResponse = generalIndex;

  return generalIndex

}

function prepareForecastDataForViewModel(forecastP, indxKeyForRequestP) {

  const { name, country, lat, lon } = locationModel.location;

  forecastWeatherModel.indxKeyForResponse = indxKeyForRequestP;

  const { temp, humidity, grnd_level } = forecastP.list[0].main;

  const { icon, description, main, id } = forecastP.list[0].weather[0];

  const { speed } = forecastP.list[0].wind;

  let rain, snow;

  if (forecastP.list[0].rain) rain = forecastP.list[0].rain[`3h`];

  const currentWeather = {
    country,
    name,
    temp,
    humidity,
    grnd_level,
    icon,
    description,
    speed,
  };

  if (rain) currentWeather.rain = rain;

  const futureWeather = [...forecastP.list];

  return { currentWeather, futureWeather }

}

function neadsForecastUpdate(forecastP) {

  const forecast = isDataActive(forecastP)

  if (forecast) return forecast

  return false

}

function isDataActive(forecastP) {

  if (forecastP.timeResponse - Date.now() > -7200000) {

    let currentTime = Date.now() / 1000;

    let forecast = forecastP.list.filter(el => {

      if (el.dt + forecastP.timezone - currentTime > 0) return true

    })

    return forecast = { list: forecast }

  }

  return false

}

async function getForecastWeatherData() {

  const { lat, lon } = locationModel.location

  if (!await forecastWeatherModel.getResponseData({ lat, lon })) return false

  return forecastWeatherModel.forecast

}

async function getLocationData() {
  
  if (!checkInputRepeat()) return { error: ERRORS.getLocation.repeatedInput }

  const checkInputRes = checkInputRegExp();

  if (!checkInputRes) {

    view.updateConsoleResult(1)

    return { error: ERRORS.getLocation.incorrectInput }

  };

  return await locationModel.request()

}

function checkInputRepeat() {

  userInput = prepareUserInput();

  const res = inputCheckForRepeatedRequest()



  if (res >= 0 && controller.prevInputs[res].input == userInput) {

    locationModel.indxKeyforResponse = controller.prevInputs[res].indxLocation;

    const location = locationModel.location;

    if (location.remove) {

      const { removeLocation } = locationModel;

      view.showCardLocation(location, controller.prevInputs[res].indxLocation, removeLocation)

      locationModel.restoreDelLocationData(controller.prevInputs[res].indxLocation)

      view.updateConsoleResult(3);

      return false;

    }

    view.updateConsoleResult(5);

    return false

  }

  // switch (true) {

  //   case res >= 0 && controller.prevInputs[res].input == userInput:

  //     locationModel.indxKeyforResponse = controller.prevInputs[res].indxLocation;

  //     const location = locationModel.location;

  //     if (location.remove) {

  //       const { removeLocation } = locationModel;

  //       view.showCardLocation(location, controller.prevInputs[res].indxLocation, removeLocation)

  //       locationModel.restoreDelLocationData(controller.prevInputs[res].indxLocation)

  //       view.updateConsoleResult(3);

  //       return false;

  //     }

  //     view.updateConsoleResult(5);

  //     return false

  //   // case controller.incorectInputs.length > 0 && !inuptCheckForRepeatedIncorrectRequest():
  //   //   view.updateConsoleResult(4)
  //   //   return false

  //   // case controller.prevInputs.length > 0 && !res:
  //   //   view.updateConsoleResult(5);
  //   //   return false
  // }

  return true
}

function inputCheckForRepeatedRequest() {

  return controller.prevInputs.findIndex(el => el.input == userInput)

}

const regExpEn = /^(([a-z]+ ?[a-z]+){1,2}$)|^(([a-z]+-?[a-z]+){1,2}$)/i;

const regExpUa = /^(([абвгґдеєжзиіїйклмнопрстуфхцчшщьюя]+'? ?[абвгґдеєжзиіїйклмнопрстуфхцчшщьюя]+){1,2}$)|^(([абвгґдеєжзиіїйклмнопрстуфхцчшщьюя]+-?[абвгґдеєжзиіїйклмнопрстуфхцчшщьюя]+){1,2}$)/i;


function checkInputRegExp() {

  let res1 = regExpEn.test(userInput) ? true : false;
  let res2 = regExpUa.test(userInput) ? true : false;

  let res = res1 || res2

  return res;
}

function prepareUserInput() {
  return objInputs.inputLocation.value.toLowerCase().trim().replace(/ +/g, " ")
}
