import { Component, OnInit } from '@angular/core';

/*servicios*/
import { DatosUsuarioProvider } from "../../providers/data/data";
import { MvserviceProvider } from "../../providers/mvservice/mvservice";


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
  
  grafica:any;
  usuario:any;

 
  constructor(public servicetipousuario:DatosUsuarioProvider, public mvservice:MvserviceProvider) {
    console.log('Hello GraficafusionComponent Component');
    this.usuario=this.servicetipousuario.getTipoUsuario(); //obtener el tipo de usuario
    this.dataSource=this.data; //
    this.getgrafica(this.usuario); //obtener datos de la grafica
  }

ngOnInit(){
}

  getgrafica(usuario){
    this.mvservice.graficahoras(usuario).then(result=>{
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
