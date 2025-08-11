
import { ERRORS } from "../../errors.js";

import { DataEncoding } from "../dataEncoding.js";

export async function createRequest(urlP) {
  let request;
  if (window.XMLHttpRequest) {
    request = new XMLHttpRequest();
  } else {
    request = new ActiveXObject("Microsoft.XMLHTTP");
  }

  request.open("GET", urlP);

  request.responseType = "json";
  return new Promise((resolve) => {
    
    request.onreadystatechange = function () {
      if (request.readyState === 4 && request.status === 200) {
        swtchRqst(resolve, request, true, urlP);
      }

      if (request.readyState === 4 && request.status !== 200) {
        swtchRqst(resolve, request, false, urlP);
      }
    };
    request.send();
  });
}

function swtchRqst(resolveP, requestP, resultP, urlP) {

  switch (true) {
    case urlP.includes(DataEncoding.decodingLocation()):
      if (!resultP) {
        resolveP(`${ERRORS.getLocation.request}`);
        break;
      }

      resolveP(requestP.response);
      break;

    case urlP.includes(DataEncoding.decodingForecast()):
      if (!resultP) {
        resolveP(`${ERRORS.weatherForecast.request}`);
      }

      resolveP(requestP.response);
      break;

  }
}
