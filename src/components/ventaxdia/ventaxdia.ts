import { Component } from '@angular/core';
import { DataServiceProvider } from "../../providers/data-service/data-service";


@Component({
  selector: 'ventaxdia',
  templateUrl: 'ventaxdia.html'
})
export class VentaxdiaComponent {
  "width" = "100%";
  height = 250;
  type = 'line';
  dataFormat = 'json';
  dataSource:any;
   data = {
    "chart": {
      "caption": "",
      "syaxisname": "",
      //"subcaption": "[2005-2016]",
      "numberprefix": " $",
      "rotatelabels": "1",
      "setadaptiveymin": "1",
      "divlinedashed": "0",
      "theme": "ocean"
    },
    "data": "null"
  }; 
  datosdeljson:any;


  constructor(public dataService:DataServiceProvider) {
    console.log('Hello VentaxdiaComponent Component');
    this.dataSource=this.data
    this.obtenerdatosgrafica();
  }

  obtenerdatosgrafica(){
    this.dataService.getgraficalineasventadia().then(datos => {
      this.datosdeljson=datos;
      console.log(this.datosdeljson.puntos);
      console.log(this.data.data);
      this.data.data=this.datosdeljson.puntos;
      this.data.chart.caption=this.datosdeljson.titulo;
      //this.data.chart.syaxisname=this.datosdeljson.ejeY;
      
  });
}
}
