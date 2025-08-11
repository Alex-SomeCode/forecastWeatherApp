// import { UIstrValuesObj } from "./UIstrValuesObj.js";
// import { weatherDecription } from "./forecastStrValues.js";
// import { namesOfCountriesInUkrainian } from "./namesOfCountriesInUkrainian.js";

// class LanguageModel {
//   constructor() {
//     this._en = "en";
//     this._ua = "ua";
//     this._ru = "ru";
//     this._active = this._en;
//     this._UIstrValuesObj = UIstrValuesObj;
//     this._weatherDescription = weatherDecription;
//     this._namesOfCountriesInUkrainian = namesOfCountriesInUkrainian;
//   }

//   getDataForTemplate(templateP) {
//     return this.UIstrValuesObj[templateP][this.activeLanguage];
//   }

//   set activeLanguage(langP) {
//     switch (true) {
//       case langP === 0:
//         this._active = this._en;
//         return;
//       case langP === 1:
//         this._active = this._ua;
//         return;
//       case langP === 2:
//         this._active = this._ru;
//         return;
//     }
//   }

//   get UIstrValuesObj() {
//     if (this._UIstrValuesObj !== UIstrValuesObj)
//       this._UIstrValuesObj = UIstrValuesObj;
//     return this._UIstrValuesObj;
//   }

//   get weatherDecription() {
//     if (this._weatherDescription !== weatherDecription)
//       this._weatherDescription = weatherDecription;
//     return this._weatherDescription;
//   }

//   get namesOfCountriesInUkrainian() {
//     if (this._namesOfCountriesInUkrainian !== namesOfCountriesInUkrainian)
//       this._namesOfCountriesInUkrainian = namesOfCountriesInUkrainian;
//     return this._namesOfCountriesInUkrainian;
//   }

//   get activeLanguage() {
//     return this._active;
//   }

//   set weatherDecription(valP) {
//     return;
//   }
//   set namesOfCountriesInUkrainian(valP) {
//     return;
//   }

//   set UIstrValuesObj(valP) {
//     return;
//   }
// }

// export const languageModel = new LanguageModel();
