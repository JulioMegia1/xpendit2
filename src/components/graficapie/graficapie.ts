import { Component,AfterViewInit, NgZone } from '@angular/core';

const data = {
  "chart": {
    "caption": "Venta x Maquina",
    //"subcaption": "For a net-worth of $1M",
    "showvalues": "1",
    "showpercentintooltip": "0",
    "numberprefix": "$",
    "enablemultislicing": "1",
    "legendposition": "right",
    "showlegend": "1",
    "captionpadding": "0",
    "theme": "fusion"
  },
  "data": [
    {
      "label": "IPQ botana",
      "value": "12"
    },
    {
      "label": "IPQ REFRESCO",
      "value": "24"
    },
    {
      "label": "SAFRAN I",
      "value": "42"
    },
    {
      "label": "SAFRAN II",
      "value": "32"
    },
    {
      "label": "CENTA",
      "value": "12"
    },
    {
      "label": "KIWIT",
      "value": "17"
    },
    
  ]
};



 
@Component({
  selector: 'graficapie',
  templateUrl: 'graficapie.html'
})
export class GraficapieComponent {
  "width" = "50%";
  height = 400;
  type = 'pie3d';
  dataFormat = 'json';
  dataSource = data;
  total:number;
  

  logMessage = '% de venta de cada máquina';

  

  constructor(private zone:NgZone) {
    console.log('Hello GraficapieComponent Component');
    let myData = this.dataSource.data;

        this.total = 0;

        // Calculate the sum of all values
        for (let i = 0; i < myData.length; i++) {
            this.total += Number(myData[i].value);
        }
   
  }

  events = {
    dataPlotRollOver: this.getPercentValue()
}

getPercentValue() {
  return (eve,  arg) => {
      this.zone.run(() => {
          
          let value = (arg.value / this.total * 100).toFixed(2);
          this.logMessage = "La venta de " + arg.categoryLabel + " es  " + value + "% del total";
      })
  }
}

}
