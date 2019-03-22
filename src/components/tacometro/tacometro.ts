import { Component } from '@angular/core';

var data = {
  "chart": {
    "caption": "Ventas ($)",
    //"subcaption": "2017",
    "lowerlimit": "0",
    "upperlimit": "100",
    "showvalue": "1",
    "numbersuffix": ".00",
    "numberprefix": "$",
    "color":"#ffffff",
    "theme": "zune"
  },
  "colorrange": {
    "color": [
      {
        "minvalue": "0",
        "maxvalue": "33",
        "code": "#F2726F"
      },
      {
        "minvalue": "33",
        "maxvalue": "66",
        "code": "#FFC533"
      },
      {
        "minvalue": "66",
        "maxvalue": "100",
        "code": "#62B58F"
      }
    ]
  },
  "dials": {
    "dial": [
      {
        "value": "14",
        "tooltext": "<b>9%</b> lesser that target",
        "color": "#E15A26"
      }
    ]
  },
  "trendpoints": {
    "point": [
      {
        "startvalue": "80",
        "displayvalue": "Máximo",
        "thickness": "2",
        "color": "#E15A26",
        "usemarker": "1",
        "markerbordercolor": "#E15A26",
        "markertooltext": "80%"
      },
    ]
  }
};

@Component({
  selector: 'tacometro',
  templateUrl: 'tacometro.html'
})
export class TacometroComponent {

  text: string;

  constructor() {
    console.log('Hello TacometroComponent Component');
    this.text = 'Hello World';
    //data.dials.dial[0].value
    data.dials.dial[0].value="85"
    console.log(data.dials.dial[0]);
    
    //data.splice()
  }

  width = 600;
  height = 400;
  type = 'angulargauge';
  dataFormat = 'json';
  //console.log(data);
  dataSource = data;

}
