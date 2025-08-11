import {
  initialInfoUA,
  initialInfoEN,
  initialInfoRU,
  selectDescrUA,
  selectDescrEN,
  selectDescrRU,
  getForecastUA,
  getForecastEN,
  getForecastRU,
  setLocationUA,
  setLocationEN,
  setLocationRU,
  placeholderUA,
  placeholderEN,
  placeholderRU,
  searchUA,
  searchEN,
  searchRU,
  cancelUA,
  cancelEN,
  cancelRU,
  addForecastUA,
  addForecastEN,
  addForecastRU,
  removeForeacstUA,
  removeForeacstEN,
  removeForeacstRU,
  deleteForeacstUA,
  deleteForeacstEN,
  deleteForeacstRU,
} from "./UIstrValues.js";

export const UIstrValuesObj = {
  initialInfoTemplate: {
    ua: initialInfoUA,
    en: initialInfoEN,
    ru: initialInfoRU,
  },
  controlPanelTemplate: {
    descriptionSelect: {
      ua: selectDescrUA,
      en: selectDescrEN,
      ru: selectDescrRU,
    },
    getForecastBtn: { ua: getForecastUA, en: getForecastEN, ru: getForecastRU },
    setLocationBtn: { ua: setLocationUA, en: setLocationEN, ru: setLocationRU },
  },
  locationWindowTemplate: {
    inputPlaceholder: {
      ua: placeholderUA,
      en: placeholderEN,
      ru: placeholderRU,
    },
    searchBtn: { ua: searchUA, en: searchEN, ru: searchRU },
    cancelBtn: { ua: cancelUA, en: cancelEN, ru: cancelRU },
  },
  cardLocationTemplate: {
    addForecastBtn: {
      ua: addForecastUA,
      en: addForecastEN,
      ru: addForecastRU,
    },
    removeForecastBtn: {
      ua: removeForeacstUA,
      en: removeForeacstEN,
      ru: removeForeacstRU,
    },
    deleteBtn: {
      ua: deleteForeacstUA,
      en: deleteForeacstEN,
      ru: deleteForeacstRU,
    },
  },
  currentWeatherTemplate: {},

  futureWeatherTemplate: {},
};
