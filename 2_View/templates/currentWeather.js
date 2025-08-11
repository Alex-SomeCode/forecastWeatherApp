export const currentWeatherTemplate = `
  <div id="wrprCurrentWeather">
          <div class="flx f_wrp f_j_sp_btwn">
            <h1 id="cityH1">{{name}}, {{country}}</h1>
            <span id="time">{{time}}</span>
          </div>
          <div class="flx f_wrp f_j_sp_btwn">
            <div class="descrCrntWeather">
            <a name="linkAuthor">
            <div id="icnWthr"style="background-image: url(../img/{{icon}}.png)"></div>
            </a>
              <div id="dscrImg" class="txt_algn_cntr">{{description}}</div>
            </div>
            <h1 id="temp">{{temp}}&degC</h1>
            <p id="dscrWtrh" class="flx f_drctn_clmn">
              <span id="wind">Wind: <span id="wnd">{{speed}}</span> kph</span>
               <span id="precip">Precip: <span id="prcp">{{rain}}</span> mm</span>
               <span id="hudimity">Hudimity: <span id="hdmt">{{humidity}}</span> %</span>
              <span id="pressure">Pressure <span id="prsr">{{grnd_level}}</span> mb</span>
            </p>
          </div>
  </div>`;
