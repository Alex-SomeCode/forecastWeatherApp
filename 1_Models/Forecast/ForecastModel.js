import { createRequest } from "../../functions/request/request.js";

import { DataEncoding } from "../../functions/dataEncoding.js";

class ForecastWeatherModel {
  constructor() {
    this._allForecasts = [];
    this._indxKeyforResponse = null;
    this.groupsWeatherImg = {
      ["Group 2xx"]: "Thunderstorm",
      ["Group 3xx"]: "Drizzle",
      ["Group 5xx"]: "Rain",
      ["Group 6xx"]: "Snow",
    };
  }

  set addIndxAllForecast(indxP) {
    this._allForecasts[indxP] = null
  }

  set indxKeyForResponse(keyP) {

    this._indxKeyforResponse = keyP

  }

  get indxKeyForResponse() {

    return this._indxKeyforResponse;

  }

  set forecast(forecastP) {

    this._allForecasts[this.indxKeyForResponse] = forecastP

  }

  get forecast() {

    if (typeof this.indxKeyForResponse !== 'number') return false

    let copyForecast = JSON.stringify(this._allForecasts[this.indxKeyForResponse])

    copyForecast = JSON.parse(copyForecast)

    return copyForecast
  }

  get allForecasts() {
    return this._allForecasts;
  }

  set allForecasts(pastForecastsP) {
    
    this._allForecasts = pastForecastsP;
  }


  async getResponseData(coordsP, idxP) {

    const data = await createRequest(
      `${DataEncoding.decodingForecast()}lat=${coordsP.lat}&lon=${coordsP.lon}`
    );

    if (data == 'user get forecast is error') {

      confirm('user get forecast is error')

      return false
    }

    const { list, city: { timezone } } = data;

    if (!list) return false;

    this.forecast = {

      list, timezone, timeResponse: Date.now()
    };

    return true;
  }

}

export const forecastWeatherModel = new ForecastWeatherModel();
