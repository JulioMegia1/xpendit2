import { Component } from '@angular/core';

/*servicios*/
import { CIprovider } from "../../providers/data/data";
import { MvserviceProvider } from "../../providers/mvservice/mvservice";

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
      "formatnumberscale": "0",
      "rotatelabels": "1",
      "setadaptiveymin": "1",
      "divlinedashed": "0",
      "theme": "ocean"
    },
    "data": "null"
  }; 
  grafica:any; //datos de la gráfica
  usuario:any; //tipo de usuario

  constructor(public ciService:CIprovider, public mvservice:MvserviceProvider) {
    console.log('Hello VentaxdiaComponent Component');
    this.usuario=this.ciService.getTipoUsuario(); //obtener el tipo de usuario
    this.dataSource=this.data; //
    this.getgrafica(this.usuario); //obtener datos de la grafica
  }

  getgrafica(usuario){
    this.mvservice.graficadia(usuario).then(result=>{
    this.grafica= result;
    this.data.data=this.grafica.puntos;
    this.data.chart.caption=this.grafica.titulo;
    console.log(result);
  },(err)=>{
    console.log(err);
  }
  );
  }





}
