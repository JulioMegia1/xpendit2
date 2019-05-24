import { Component, OnInit } from '@angular/core';
import { DataServiceProvider } from "../../providers/data-service/data-service";

/*servicios*/
import { CIprovider } from "../../providers/data/data";
import { MvserviceProvider } from "../../providers/mvservice/mvservice";

@Component({
  selector: 'ventaxdiaproductomaquina',
  templateUrl: 'ventaxdiaproductomaquina.html'
})

export class VentaxdiaproductomaquinaComponent implements OnInit{

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
      "theme": "ocean",
      "rotateValues": "1"

    },
    "data": "null"
  }; 
  grafica:any;
  idmaquina:any;
  seleccionproducto:any;

  constructor(public dataService:DataServiceProvider,public ciService:CIprovider, public mvservice:MvserviceProvider) {
    console.log('Hello VentaxdiamaquinaComponent Component');   
  }

  ngOnInit(){
    this.idmaquina=this.ciService.getIdmaquina(); //obtener el tipo de usuario
    console.log("TENGO EL ID DE LA MAQU(INA" + this.idmaquina)
    this.seleccionproducto=this.ciService.getIdProducto();
    console.log("TENGO EL ID DE LA MAQUINA" + this.idmaquina)
    console.log("TENGO la seleccion DEl producto" + this.seleccionproducto)
    //this.getgrafica(this.usuario); //obtener datos de la grafica
    this.dataSource=this.data
    this.getgrafica(this.idmaquina,this.seleccionproducto)
    //this.obtenerdatosgrafica();

  }

getgrafica(idmaquina,seleccion){
  this.mvservice.ventamaquinaproductohoraacumulada(idmaquina,seleccion).then(result=>{
  this.grafica= result;
  this.data.data=this.grafica.puntos;
  // this.data.chart.caption=this.grafica.titulo;
  console.log(result);
},(err)=>{
  console.log(err);
}
);
}

updatedata(){
  this.idmaquina=this.ciService.getIdmaquina(); //obtener el tipo de usuario
  this.seleccionproducto=this.ciService.getIdProducto();
  this.dataSource=this.data
  this.getgrafica(this.idmaquina,this.seleccionproducto)
}

}
