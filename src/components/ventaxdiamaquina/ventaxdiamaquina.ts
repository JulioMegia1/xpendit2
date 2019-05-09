import { Component, OnInit } from '@angular/core';
import { DataServiceProvider } from "../../providers/data-service/data-service";


/*servicios*/
import { CIprovider } from "../../providers/data/data";
import { MvserviceProvider } from "../../providers/mvservice/mvservice";



@Component({
  selector: 'ventaxdiamaquina',
  templateUrl: 'ventaxdiamaquina.html'
})
export class VentaxdiamaquinaComponent implements OnInit{

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
      "formatnumberscale": "0",
      "divlinedashed": "0",
      "setadaptiveymin": "1",
      "theme": "ocean"
    },
    "data": "null"
  }; 
  grafica:any;
  idmaquina:any;


  constructor(public dataService:DataServiceProvider,public ciService:CIprovider, public mvservice:MvserviceProvider) {
    console.log('Hello VentaxdiamaquinaComponent Component');
   
  }

  ngOnInit(){

    this.idmaquina=this.ciService.getIdmaquina(); //obtener el tipo de usuario
    console.log("TENGO EL ID DE LA MAQU(INA" + this.idmaquina)
    this.dataSource=this.data
    this.getgrafica(this.idmaquina)

  }

getgrafica(idmaquina){
  this.mvservice.ventahoraacumuladamaquina(idmaquina).then(result=>{
  this.grafica= result;
  if(this.grafica.puntos==null || this.grafica.puntos=="" || this.grafica.puntos==[])
  {  
    console.log("no hago nada VENTA X diaMÁQUINA")
    this.data.data=null

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

updatdata(){
  this.idmaquina=this.ciService.getIdmaquina(); //obtener el tipo de usuario
  
  this.dataSource=this.data
  this.getgrafica(this.idmaquina)

}




}
