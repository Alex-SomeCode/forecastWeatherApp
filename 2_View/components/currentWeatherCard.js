import { currentWeatherTemplate } from "../templates/currentWeather.js";
import { objWrappers, setWrappersToObj } from "../linksToHTMLObjects.js";
import { _03nTemplate } from "../templates/03n.js";

export function currentWeather(dataP) {

  let template = repleceTemplateData(dataP);

  let templateContainer = document.createElement("div");

  templateContainer.innerHTML = template;

  if (objWrappers.wrprCurrentWeather) {
    updateWrapperElemetnsCurrentWeather(templateContainer, template);
    clear([templateContainer, template]);
    return;
  }

  setWrappersToObj("#wrprCurrentWeather", templateContainer);

  objWrappers.wrprRoot.appendChild(objWrappers.wrprCurrentWeather);

  clear([templateContainer, template]);
}

function updateWrapperElemetnsCurrentWeather(templateContainerP, templateP) {
  objWrappers.wrprCurrentWeather.innerHTML = "";

  objWrappers.wrprCurrentWeather.innerHTML =
    templateContainerP.children[0].innerHTML;

  objWrappers.wrprRoot.appendChild(objWrappers.wrprCurrentWeather);
 
  clear([templateContainerP, templateP]);
}

function clear(variablesP) {
  variablesP.forEach((element) => {
    element = null;
  });
}

function repleceTemplateData(dataP) {
  let template = false;

  for (const [key, value] of Object.entries(dataP)) {

    if (!template) {
      template = currentWeatherTemplate.replace(`{{${key}}}`, value);
    }

    if (value == "03n") {
      let div = document.createElement("div");
      div.innerHTML = _03nTemplate;
      div.children[0].style.width = "80px";
      div.children[0].style.height = "80px";

      template = template.replace(/<div id="icnWthr".+<\/div>/, div.innerHTML);
      div = null;
    } else template = template.replace(`{{${key}}}`, value);
  }

  let time = getTime();

  if (!dataP.rain) template = template.replace("{{rain}}", "0.0");

  template = template.replace("{{time}}", time);
  return template;
}

function getTime() {
  let time = new Date();
  return (time = `${time.getHours() >= 10 ? time.getHours() : `0${time.getHours()}`
    }:${time.getMinutes() >= 10 ? time.getMinutes() : `0${time.getMinutes()}`} ${time.getDate() >= 10 ? time.getDate() : `0${time.getDate()}`
    }.${time.getMonth() + 1 >= 10 ? time.getMonth() + 1 : `0${time.getMonth() + 1}`
    }.${time.getFullYear()}`);
}
