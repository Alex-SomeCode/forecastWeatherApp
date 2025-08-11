export const objWrappers = {};
export const objInputs = {};

setInputsToObj(`button[id], select[id],  div[key]`, document);

setWrappersToObj(`div[id^="wrpr"]`, document);

export function setInputsToObj(selectorP, elementP, keyP) {
  const arr = elementP.querySelectorAll(selectorP);

  arr.forEach((el) => {

    if (keyP) {
      objInputs[keyP][el.id] = el;

      return;
    }

    if (el.hasAttribute("key")) {

      objInputs[el.getAttribute("key")] = {};

      setInputsToObj("div[id]", el, el.getAttribute("key"));

      return;
    }

    objInputs[el.id] = el;
  });
}

export function setWrappersToObj(selectorP, elementP) {
  const arr = elementP.querySelectorAll(selectorP);
  arr.forEach((el) => {
    objWrappers[el.id] = el;
  });
}

export function addWrapperToObj(idNameP) {
  objWrappers[idNameP] = document.createElement("div");
  objWrappers[idNameP].id = idNameP;
}

export const namesObj = {
  // wrappers: {
  //   root: "root",
  //   initialInfo: "initialInfo",
  //   controlPanel: "controlPanel",
  //   weatherIcons: "weatherIcons",
  //   locationCards: "locationCards",
  //   crntWeather: "crntWeather",
  //   futureWeather: "futureWeather",
  // },
  CSS: {
    class: {
      flx: "flx",
      f_algn_itms_cntr: "f_algn_itms_cntr",
      f_j_sp_btwn: "f_j_sp_btwn",
      f_j_sp_arnd: "f_j_sp_arnd",
      f_j_cntr: "f_j_cntr",
      f_wrp: "f_wrp",
      brdrRght: "brdrRght",
    },
  },
};
