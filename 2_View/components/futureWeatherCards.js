import { objWrappers, addWrapperToObj } from "../linksToHTMLObjects.js";

import { futureWeatherTemplate } from "../templates/futureWeather.js";

let weatherData, groupsWeatherImg;

export function futureWeatherCars(dataObjP) {
  if (!objWrappers.wrprFutureWeather) {
    addWrapperToObj("wrprFutureWeather");
  }

  groupsWeatherImg = dataObjP.groupsWeatherImg;

  weatherData = divideArrIntoArraysByDates(dataObjP.futureWeather);

  createCards();
}

function createCards() {
  let container = document.createElement("div");

  weatherData.forEach((el) => {

    if (el.length === 1) return

     container.appendChild(card(el));
  });

  if (!objWrappers.wrprRoot.contains(objWrappers.wrprFutureWeather)) {
    objWrappers.wrprRoot.appendChild(objWrappers.wrprFutureWeather);
  }

  if (objWrappers.wrprFutureWeather.innerHTML.length)
    objWrappers.wrprFutureWeather.innerHTML = "";

  objWrappers.wrprFutureWeather.innerHTML = container.innerHTML;
}

function card(forecastArrP) {
  const dataObjForWeatherCard = procesForecastData(forecastArrP);

  dataObjForWeatherCard.temp = Math.round(
    dataObjForWeatherCard.temp / forecastArrP.length
  );

  const templateContainer = document.createElement("div");

  templateContainer.innerHTML = replaceTemplateData(dataObjForWeatherCard);

  return templateContainer.children[0];
}

function procesForecastData(forecastArrP) {
  const { dataObjForWeatherCard, typesOfWeatherIcons, crntDate } =
    objectsForForecastData();

  forecastArrP.forEach((forecastEl, idx) => {
    let date = new Date(forecastEl.dt_txt);

    calculateTemperatureAndIcons(forecastEl, typesOfWeatherIcons, dataObjForWeatherCard);

    switch (true) {
      case idx == 0 && crntDate == date.getDate():
        if (forecastArrP.length == 1)
          setDataToCard(
            dataObjForWeatherCard,
            forecastEl.dt_txt,
            forecastEl.weather[0].icon
          );
        return;

      case crntDate == date.getDate():
        if (!dataObjForWeatherCard.icon)
          setDataToCard(
            dataObjForWeatherCard,
            forecastEl.dt_txt,
            forecastEl.weather[0].icon
          );

        return;

      case idx === forecastArrP.length - 1:
        const keys = Object.keys(typesOfWeatherIcons);

        if (keys.length === 1) {
          setDataToCard(
            dataObjForWeatherCard,
            forecastEl.dt_txt,
            typesOfWeatherIcons[keys[0]].icon
          );

          return;
        }

        let icon;

        icon = checkingForPrecipitationDuringDayLightHours(typesOfWeatherIcons);

        if (!icon) icon = setWeatherIconWithMost(typesOfWeatherIcons);

        if (!icon) icon = "undefiend";

        setDataToCard(dataObjForWeatherCard, forecastEl.dt_txt, icon);
    }
  }); // forEach

  return dataObjForWeatherCard;
}

function objectsForForecastData() {
  const dataObjForWeatherCard = { temp: 0 };

  const typesOfWeatherIcons = {};

  const crntDate = new Date().getDate();

  return {
    dataObjForWeatherCard,
    typesOfWeatherIcons,
    crntDate,
  };
}

function setDataToCard(weatherCardP, dt_txtP, iconP) {
  weatherCardP.day = setDay(new Date(dt_txtP).getDay());

  weatherCardP.date = dt_txtP.slice(0, 10).split("-").reverse().join(".");

  weatherCardP.icon = iconP;
}

function calculateTemperatureAndIcons(forecastElP, typesOfWeatherIconsP, weatherCardP) {

  countTypeOfWeatherIconsInDaylightHours(typesOfWeatherIconsP, forecastElP);

  weatherCardP.temp += forecastElP.main.temp;

}

function countTypeOfWeatherIconsInDaylightHours(typeOfWeatherIconsP, forecastElP) {
  if (
    typeOfWeatherIconsP[forecastElP.weather[0].main] &&
    forecastElP.weather[0].icon.includes("d")
  ) {
    ++typeOfWeatherIconsP[forecastElP.weather[0].main].count;
    return;
  }

  if (forecastElP.weather[0].icon.includes("d"))
    typeOfWeatherIconsP[forecastElP.weather[0].main] = {
      count: 1,
      icon: forecastElP.weather[0].icon,
    };
}

function setWeatherIconWithMost(typeOfWeatherIconsP) {
  const keys = Object.keys(typeOfWeatherIconsP);

  if (keys.length === 1) {
    return typeOfWeatherIconsP[keys[0]].icon;
  }

  let icon;
  keys.forEach((key, idx, arr) => {
    const nextIndex = idx + 1 < arr.length ? idx + 1 : false;

    switch (true) {
      case !nextIndex:
        return;
      case typeOfWeatherIconsP[key].count >=
        typeOfWeatherIconsP[keys[nextIndex]].count:
        icon = typeOfWeatherIconsP[key].icon;

      case typeOfWeatherIconsP[key].count <
        typeOfWeatherIconsP[keys[nextIndex]].count:
        icon = typeOfWeatherIconsP[keys[nextIndex]].icon;
    }
  });

  return icon;
}

function checkingForPrecipitationDuringDayLightHours(typesOfWeatherIconsP) {
  let precipitationObj = createObjPrecipitationGroups(typesOfWeatherIconsP);

  if (!precipitationObj) return false;

  let precipitationTypeStr = detrminateTypeOfPrecipitation(precipitationObj);

  if (!precipitationTypeStr) return false;

  return typesOfWeatherIconsP[precipitationTypeStr].icon;
}

function detrminateTypeOfPrecipitation(precipitationObjP) {
  let precipitationTypeStr = false;

  switch (true) {
    case precipitationObjP.hasOwnProperty("Drizzle") &&
      !precipitationObjP.hasOwnProperty("Rain") &&
      !precipitationObjP.hasOwnProperty("Thunderstorm"):
      precipitationTypeStr = "Drizzle";
      break;

    case precipitationObjP.hasOwnProperty("Rain") &&
      !precipitationObjP.hasOwnProperty("Thunderstorm"):
      precipitationTypeStr = "Rain";
      break;

    case precipitationObjP.hasOwnProperty("Thunderstorm"):
      precipitationTypeStr = "Thunderstorm";
      break;

    case precipitationObjP.hasOwnProperty("Snow"):
      precipitationTypeStr = "Snow";
      break;
  }

  return precipitationTypeStr;
}

function createObjPrecipitationGroups(countTypesOfWeatherIconsP) {
  let precipObj = false;
  for (let k in groupsWeatherImg) {
    if (countTypesOfWeatherIconsP.hasOwnProperty(groupsWeatherImg[k])) {
      if (!precipObj) precipObj = {};

      precipObj[groupsWeatherImg[k]] =
        countTypesOfWeatherIconsP[groupsWeatherImg[k]];
    }
  }

  return precipObj;
}

function replaceTemplateData(dataCardP) {
  let template = false;
  for (const [key, value] of Object.entries(dataCardP)) {
    if (!template) {
      template = futureWeatherTemplate.replace(`{{${key}}}`, value);
      continue;
    }

    template = template.replace(`{{${key}}}`, value);
  }

  return template;
}

function setDay(dayP) {
  switch (true) {
    case dayP === 0:
      return "Sun";
    case dayP === 1:
      return "Mon";
    case dayP === 2:
      return "Tue";
    case dayP === 3:
      return "Wed";
    case dayP === 4:
      return "Thu";
    case dayP === 5:
      return "Fri";
    case dayP === 6:
      return "Sat";
  }
}

// -----
function divideArrIntoArraysByDates(forecastP) {
  
  const arr = [];
  const copy = [...forecastP];

  arr.push(forecastForFirstDate(copy));

  while (copy.length !== 0) {
    arr.push(copy.splice(0, 8));
  }

  return arr;
}

function forecastForFirstDate(weatherDataP) {
  const idx = lastIndexOfFirstDate();
  return [...weatherDataP.splice(0, idx + 1)];
}

function lastIndexOfFirstDate() {

  const obj = { initVl: 23 - new Date().getHours(), idx: 0 };

  while (obj.initVl > 0) {

    if (obj.initVl - 3 > 0) {
      obj.initVl -= 3;
      obj.idx += 1;

      if (obj.initVl - 3 < 0) obj.initVl = -1;
    } else obj.initVl = -1;
  }

  return obj.idx;
}
