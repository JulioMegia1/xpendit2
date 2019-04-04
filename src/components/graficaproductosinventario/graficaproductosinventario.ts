import { Component } from '@angular/core';

const data = {
  chart: {
    caption: "Productos en inventario",
    //subcaption: "ACME Inc.",
    xaxisname: "Riel",
    syaxisname: "Amount (In USD)",
    //numberprefix: "$",
    exportenabled: "0",
    numvisibleplot:12,
    showValues:1,
    placeValuesInside:0,
    rotateValues:1,
    theme: "zune"
  },
  categories: [
    {
      category: [
        {
          label: "1"
        },
        {
          label: "2"
        },
        {
          label: "3"
        },
        {
          label: "4"
        },
        {
          label: "1"
        },
        {
          label: "2"
        },
        {
          label: "3"
        },
        {
          label: "4"
        },
        {
          label: "1"
        },
        {
          label: "2"
        },
        {
          label: "3"
        },
        {
          label: "4"
        },
        {
          label: "1"
        },
        {
          label: "2"
        },
        {
          label: "3"
        },
        {
          label: "4"
        },
        {
          label: "1"
        },
        {
          label: "2"
        },
        {
          label: "3"
        },
        {
          label: "4"
        },
        {
          label: "1"
        },
        {
          label: "2"
        },
        {
          label: "3"
        },
        {
          label: "4"
        },
        {
          label: "1"
        },
        {
          label: "2"
        },
        {
          label: "3"
        },
        {
          label: "4"
        },
        {
          label: "1"
        },
        {
          label: "2"
        },
        {
          label: "3"
        },
        {
          label: "4"
        },
        {
          label: "1"
        },
        {
          label: "2"
        },
        {
          label: "3"
        },
        {
          label: "4"
        },
        {
          label: "1"
        },
        {
          label: "2"
        },
        {
          label: "3"
        },
        {
          label: "4"
        }

      ]
    }
  ],
  dataset: [
    {
      //seriesname: "Actual Expenses",
      "valueposition": "ABOVE",
      data: [
        {
          value: "14"
        },
        {
          value: "12"
        },
        {
          value: "4"
        },
        {
          value: "36"
        },
        {
          value: "29"
        },
        {
          value: "12"
        },
        {
          value: "14"
        },
        {
          value: "36"
        },
        {
          value: "14"
        },
        {
          value: "12"
        },
        {
          value: "40"
        },
        {
          value: "36"
        },
        {
          value: "21"
        },
        {
          value: "24"
        },
        {
          value: "36"
        },
        {
          value: "11"
        },
        {
          value: "14"
        },
        {
          value: "25"
        },
        {
          value: "36"
        },
        {
          value: "37"
        },
        {
          value: "38"
        },
        {
          value: "26"
        },
        {
          value: "15"
        },
        {
          value: "13"
        },
        {
          value: "13"
        },
        {
          value: "17"
        },
        {
          value: "31"
        },
        {
          value: "12"
        },
        {
          value: "4"
        },
        {
          value: "7"
        },
        {
          value: "35"
        },
        {
          value: "23"
        },
        {
          value: "25"
        },
        {
          value: "24"
        },
        {
          value: "24"
        },
        {
          value: "24"
        },
        {
          value: "16"
        },
        {
          value: "31"
        },
        {
          value: "15"
        },
        {
          value: "2"
        }
        
      ]
    },
    {
      //seriesname: "Budgeted Expenses",
      renderas: "line",
      
      "showvalues": "0",
      data: [
        {
          value: "14"
        },
        {
          value: "12"
        },
        {
          value: "4"
        },
        {
          value: "36"
        },
        {
          value: "29"
        },
        {
          value: "12"
        },
        {
          value: "14"
        },
        {
          value: "36"
        },
        {
          value: "14"
        },
        {
          value: "12"
        },
        {
          value: "40"
        },
        {
          value: "36"
        },
        {
          value: "21"
        },
        {
          value: "24"
        },
        {
          value: "36"
        },
        {
          value: "11"
        },
        {
          value: "14"
        },
        {
          value: "25"
        },
        {
          value: "36"
        },
        {
          value: "37"
        },
        {
          value: "38"
        },
        {
          value: "26"
        },
        {
          value: "15"
        },
        {
          value: "13"
        },
        {
          value: "13"
        },
        {
          value: "17"
        },
        {
          value: "31"
        },
        {
          value: "12"
        },
        {
          value: "4"
        },
        {
          value: "7"
        },
        {
          value: "35"
        },
        {
          value: "23"
        },
        {
          value: "25"
        },
        {
          value: "24"
        },
        {
          value: "24"
        },
        {
          value: "24"
        },
        {
          value: "16"
        },
        {
          value: "31"
        },
        {
          value: "15"
        },
        {
          value: "2"
        }
      ]
    },
  ]
}; 


@Component({
  selector: 'graficaproductosinventario',
  templateUrl: 'graficaproductosinventario.html'
})
export class GraficaproductosinventarioComponent {

 


  constructor() {
    console.log('Hello GraficaproductosinventarioComponent Component');
  
  }

  "width" = "100%";
  height = 250;
  type = "mscombi2d";
  dataFormat = "json";
  dataSource = data;

}
