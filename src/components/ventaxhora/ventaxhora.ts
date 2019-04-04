import { Component } from '@angular/core';
import { DataServiceProvider } from "../../providers/data-service/data-service";


@Component({
  selector: 'ventaxhora',
  templateUrl: 'ventaxhora.html'
})
export class VentaxhoraComponent {

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
      "divlinedashed": "0",
      "setadaptiveymin": "1",
      "theme": "ocean"
    },
    "data": "null"
  }; 
  datosdeljson:any;

 
  constructor(public dataService:DataServiceProvider) {
    console.log('Hello GraficafusionComponent Component');
    this.dataSource=this.data
    this.obtenerdatosgrafica();
  }

  obtenerdatosgrafica(){
    this.dataService.getgraficalineasventahora().then(datos => {
      this.datosdeljson=datos;
      console.log(this.datosdeljson.puntos);
      console.log(this.data.data);
      this.data.data=this.datosdeljson.puntos;
      this.data.chart.caption=this.datosdeljson.titulo;
      //this.data.chart.yaxisname=this.datosdeljson.ejeY;
      
  });
}

}
