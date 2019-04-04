import { Component } from '@angular/core';

const data = {
  "chart": {
    "caption": "Venta x Hora",
    "yaxisname": "Venta",
    //"subcaption": "[2005-2016]",
    "numbersuffix": " $",
    "rotatelabels": "1",
    "labeldisplay": "Rotate",
    "setadaptiveymin": "1",
    "slantlabels": "1",
    "theme": "ocean"
  },
  "data": [
    {
      "label": "00:00",
      "value": "89.45"
    },
    {
      "label": "01:00",
      "value": "89.87"
    },
    {
      "label": "02:00",
      "value": "89.64"
    },
    {
      "label": "03:00",
      "value": "90.13"
    },
    {
      "label": "04:00",
      "value": "90.67"
    },
    {
      "label": "05:00",
      "value": "90.54"
    },
    {
      "label": "06:00",
      "value": "90.75"
    },
    {
      "label": "07:00",
      "value": "90.8"
    },
    {
      "label": "08:00",
      "value": "91.16"
    },
    {
      "label": "09:00",
      "value": "91.37"
    },
    {
      "label": "10:00",
      "value": "91.66"
    },
    {
      "label": "11:00",
      "value": "91.8"
    },
    {
      "label": "12:00",
      "value": "90.75"
    },
    {
      "label": "13:00",
      "value": "90.8"
    },
    {
      "label": "14:00",
      "value": "91.16"
    },
    {
      "label": "15:00",
      "value": "91.37"
    },
    {
      "label": "16:00",
      "value": "91.66"
    },
    {
      "label": "17:00",
      "value": "91.8"
    },
    {
      "label": "18:00",
      "value": "90.75"
    },
    {
      "label": "19:00",
      "value": "90.8"
    },
    {
      "label": "20:00",
      "value": "91.16"
    },
    {
      "label": "21:00",
      "value": "91.37"
    },
    {
      "label": "22:00",
      "value": "91.66"
    },
    {
      "label": "23:00",
      "value": "91.8"
    }
  ]
};
 
@Component({
  selector: 'graficalineas',
  templateUrl: 'graficalineas.html'
})
export class GraficalineasComponent {

  width = 1500;
  height = 250;
  type = 'line';
  dataFormat = 'json';
  dataSource = data;

  constructor() {
    console.log('Hello GraficalineasComponent Component');
    
  }

}
