export const futureWeatherTemplate = `
          <div class = card>
            <h4 name="day">{{day}}</h4>
            <span name="date">{{date}}</span>
            <div name="img" style="background-image: url(../img/{{icon}}.png)"></div>
            <h4 name="temp">{{temp}}&degC</h4>
          </div>
        `;
