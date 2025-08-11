export const key_1 = 'locations';
export const key_2 = 'keysToAccesLocationData';
export const key_3 = 'prevInputs';
export const key_4 = 'activeCardLocations';
export const key_5 = 'selectedLocation';
export const key_6 = 'pastsWeatherForecasts';

export class LocalStorage {

    static dataExist() {
        return localStorage.getItem(key_1) ? true : false
    }

    static get locationData() {

        return {

            data: getJSON(key_1),

            keys: getJSON(key_2),

            inputs: getJSON(key_3),

            [key_4]: getJSON(key_4),

            [key_5]: getJSON(key_5),

            [key_6]: getJSON(key_6)

        }

    }



    static set locationData({ locationsP, keysP, prevInputsP, }) {

        setJson(key_1, locationsP);

        setJson(key_2, keysP);

        setJson(key_3, prevInputsP);


    }

    static set viewValues({ activeCardLocationsP, selectedLocationP }) {

        setJson(key_4, activeCardLocationsP);

        setJson(key_5, selectedLocationP);

    }


    static set pastsWeatherForecast(pastsWeatherForecastsP) {
        setJson(key_6, pastsWeatherForecastsP)
    }

}

function setJson(keyP, valueP) {

    localStorage.setItem(keyP, JSON.stringify(valueP))

}

function getJSON(keyP) {

    return JSON.parse(localStorage.getItem(keyP))
}