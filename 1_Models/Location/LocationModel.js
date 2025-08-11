import { createRequest } from "../../functions/request/request.js";
import { objInputs } from "../../2_View/linksToHTMLObjects.js";
import { ERRORS } from "../../errors.js";
import { DataEncoding } from "../../functions/dataEncoding.js";


class LocationModel {
  constructor() {
    this._locations = {};
    this._keys = [];
    // this._locationIndexesRemoved = [];
    this._indxKeyforResponse = null;
    this._prevInputs = []
  }

  async request() {
    let query = objInputs.inputLocation.value.trim().replace(/ /g, "-");

    const data = await createRequest(`${DataEncoding.decodingLocation()}&q=${query}`);

    if (!Array.isArray(data)) return data

    if (Array.isArray(data) && (data.length === 0)) return { error: ERRORS.getLocation.noFoundResult };

    const { name, country, lat, lon, local_names } = data[0];

    const res = { key: { name, country }, data: { name, country, lat, lon } };

    if (data[0].state) { res.key.state = data[0].state; res.data.state = data[0].state }

    this.location = res.data;

    return { indxLocation: this.keysInFormArrays.length - 1 }

  }

  removeLocation(indexOfLocationP) {

    const key = getKeyLocation(indexOfLocationP);

    // locationModel.deletedLocationKey = state ? { country, state, name } : { country, name };

    locationModel.locationIndexesRemoved = { indexOfLocationP }

    updateRemove(key);

  }

  restoreDelLocationData(indexOfLocation) {

    const key = getKeyLocation(indexOfLocation);

    updateRemove(key);

    // this.locationIndexesRemoved.splice([this.locationIndexesRemoved.indexOf(indexOfLocation)], 1)

  }

  set indxKeyforResponse(idxP) {
    this._indxKeyforResponse = idxP
  }

  get indxKeyforResponse() {
    return this._indxKeyforResponse
  }

  set keyInFormStr(keyP) {
    this._keys.push(keyP)
  }

  get keysInFormArrays() {
    return this._keys
  }


  get keyInFormStr() {
    return this._keys[this.indxKeyforResponse]
  }

  set locations(locationsP) {
    this._locations = locationsP
  }

  set keys(keysP) {

    this._keys = keysP

  }

  set location(dataP) {

    if (dataP.length === 0) return;

    let locationsObj = addCountryCode(dataP, this.locations);

    if (dataP.state) locationsObj = addState(dataP, locationsObj);

    locationsObj = addLocation(dataP, locationsObj);

    addLatLon(dataP, locationsObj);

    this.keyInFormStr = tmpKeyValuesStr;

    tmpKeyValuesStr = ''

  }

  get location() {

    const locationCopy = {}

    let ref = this.locations;

    this.keyInFormStr.split('').forEach((elmtOfKey, idx, key) => {
      switch (true) {
        case idx == 0:
          locationCopy.country = Object.keys(ref)[elmtOfKey];
          ref = this.locations[Object.keys(this.locations)[elmtOfKey]]
          break
        case key.length === 3 && idx == 1:
          locationCopy.state = Object.keys(ref)[elmtOfKey];
          ref = ref[(Object.keys(ref)[elmtOfKey])]
          break
        case key.length === 2:
          locationCopy.name = Object.keys(ref)[elmtOfKey];
          locationCopy.lat = ref[Object.keys(ref)[elmtOfKey]].lat;
          locationCopy.lon = ref[Object.keys(ref)[elmtOfKey]].lon;
          break
        case idx == 2:
          locationCopy.name = Object.keys(ref)[elmtOfKey];
          ref = ref[Object.keys(ref)[0]];
          locationCopy.lat = ref.lat
          locationCopy.lon = ref.lon
          locationCopy.remove = ref.remove
          break
      }
    });

    ref = null;
    return locationCopy

  }

  get locations() {
    return this._locations;
  }

  get coords() {

    const { lat, lon } = this.location

    return { lat, lon };
  }

}

export const locationModel = new LocationModel();


function addCountryCode(dataP, locationsP) {
  return ensureObjectExists(dataP.country, locationsP)
}

function addState(dataP, stateP) {
  return ensureObjectExists(dataP.state, stateP)
}

function addLocation(dataP, nameP) {
  return ensureObjectExists(dataP.name, nameP)
}

function addLatLon(dataP, resultAddNameP) {
  resultAddNameP.lat = dataP.lat
  resultAddNameP.lon = dataP.lon

}

let tmpKeyValuesStr = ''

function ensureObjectExists(keyP, objP) {
  if (!objP[keyP]) objP[keyP] = {}

  createKey(keyP, objP, tmpKeyValuesStr)

  return objP[keyP]

}

function createKey(keyP, objP) {

  tmpKeyValuesStr += `${Object.keys(objP).indexOf(keyP)}`
  return tmpKeyValuesStr
}

function getKeyLocation(idxKeyLocationP) {

  const key = {}
  const keyInFormArray = locationModel.keysInFormArrays[idxKeyLocationP]

  keyInFormArray.split('').forEach((elmtOfKey, idx, arr) => {
    switch (true) {
      case idx == 0:
        key.country = Object.keys(locationModel.locations)[elmtOfKey]
        break
      case arr.length === 3 && idx == 1:
        key.state = Object.keys(locationModel.locations[key.country])[elmtOfKey]
        break
      case arr.length === 2 || idx == 2:
        if (arr.length === 2 && idx == 1) {
          key.name = Object.keys(locationModel.locations[key.country])[elmtOfKey];
          return
        }
        key.name = Object.keys(locationModel.locations[key.country][key.state])[elmtOfKey]

        break
    }
  });

  return key
}

function updateRemove(keyP) {
  const { country, state, name } = keyP;

  switch (true) {

    case !!state:
      locationModel.locations[country][state][name].remove = !locationModel.locations[country][state][name].remove;
      break;

    case !state:
      locationModel.locations[country][name].remove = !locationModel.locations[country][name].remove;
      break;
  }

}
