export const ERRORS = {}

const weatherForecast = {
    request: 'user get forecast is error'
}

const getLocation = {
    request: 'user location search error',
    repeatedInput: 'repeatedInputTrue',
    incorrectInput: 'incorrectInput',
    noFoundResult: 'noFoundResult'
}

ERRORS.weatherForecast = weatherForecast;
ERRORS.getLocation = getLocation;
