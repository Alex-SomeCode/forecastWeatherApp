export const locationWindowTemplate = `
<div id="modalWrpr">
      <div id="modalCntnr"></div>
      <div id="locationWindow">
        <div class="flx f_j_sp_btwn">
          <input id="inputLocation" type="text" placeholder="enter the settlement whose weather you are interested in" />
          <button id="inputBtnSearchLctn">search</button>
          </div>
         <div class="wrapper">
          <div id="locationCards"></div>
          <div id="consoleLocationWindow">
              result: <span id="consoleResult"></span>
          </div>
         </div>
         <button id='inputBtnCloseWndwLctn'>cancel</button>
      </div>
</div>
`;
