import { Component, OnInit } from '@angular/core';
import { DataServiceProvider } from "../../providers/data-service/data-service";
import { DatosUsuarioProvider } from "../../providers/data/data";


@Component({
  selector: 'ventaxhora',
  templateUrl: 'ventaxhora.html'
})
export class VentaxhoraComponent implements OnInit{

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

  datos:any;

 
  constructor(public dataService:DataServiceProvider,public servicetipousuario:DatosUsuarioProvider) {
    console.log('Hello GraficafusionComponent Component');
    this.dataSource=this.data
    this.obtenerdatosgrafica();
    
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getdatos();
    
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


getdatos(){
  this.datos=this.servicetipousuario.getdatagraficas();
  console.log("DATOS DESDE COMPONENTE"+this.datos);

  

}

}
