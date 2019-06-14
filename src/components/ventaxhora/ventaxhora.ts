/*graficas fusioncharts
 npm install angular-fusioncharts
npm install fusioncharts
*/
import { Component, OnInit } from '@angular/core';

/*servicios*/
import { CIprovider } from "../../providers/data/data";
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
      "formatnumberscale": "0",
      "rotatelabels": "1",
      "divlinedashed": "0",
      "setadaptiveymin": "1",
      "theme": "ocean",
      "rotateValues": "1"
    },
    "data": "null"
  }; 
  
  grafica:any;
  usuario:any;

 
  constructor(public ciService:CIprovider, public mvservice:MvserviceProvider) {
    console.log('Hello GraficafusionComponent Component');
    this.usuario=this.ciService.getUsuario(); //obtener el  usuario
    this.dataSource=this.data; //
    this.getgrafica(this.usuario); //obtener datos de la grafica
  }

ngOnInit(){
}

  getgrafica(usuario){
    this.mvservice.graficahoras(usuario).then(result=>{
    this.grafica= result;
    if(this.grafica.puntos==null || this.grafica.puntos=="" || this.grafica.puntos==[])
    {  
      console.log("no hago nada")

    }
    else{
    this.data.data=this.grafica.puntos;
    this.data.chart.caption=this.grafica.titulo;
    console.log(result);
  }
  },(err)=>{
    console.log(err);
  }
  );
}


ngAfterViewInit()  {
  let interval = setInterval(()=> {
    console.log("hello");
    // this.leafletMap();
    this.getgrafica(this.usuario); //obtener datos de la grafica
  },35000);
  }



  updateData(){
    this.getgrafica(this.usuario); //obtener datos de la grafica
  }
  



}
