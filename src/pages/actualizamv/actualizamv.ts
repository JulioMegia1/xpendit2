import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
/*servicios*/
import { DataServiceProvider } from "../../providers/data-service/data-service";
import { SelectserviceProvider } from "../../providers/selectservice/selectservice";


@IonicPage()
@Component({
  selector: 'page-actualizamv',
  templateUrl: 'actualizamv.html',
})
export class ActualizamvPage {

  seleccion:any;
  productos:any;

  maquinas:any;

  rielexistencias:any;
  fila1existencias:any;
  fila2existencias:any;
  fila3existencias:any;
  fila4existencias:any;
  fila5existencias:any;
  fila6existencias:any;

  

  rielproductos:any;
  fila1productos:any;
  fila2productos:any;
  fila3productos:any;
  fila4productos:any;
  fila5productos:any;
  fila6productos:any;
  

  rielprecios:any;
  fila1precios:any;
  fila2precios:any;
  fila3precios:any;
  fila4precios:any;
  fila5precios:any;
  fila6precios:any;

  inputstatusexistencias:any="disabled";

  constructor(public navCtrl: NavController, public navParams: NavParams,public dataService:DataServiceProvider,public selectService:SelectserviceProvider) 
  {
    this.obtenermaquinas();
    this.Selectproductos();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActualizamvPage');
  }

  obtenermaquinas(){

    this.dataService.getmaquinas().then(datos => {
    this.maquinas=datos;

    console.log(this.maquinas.maquinas[0].existencias);
    
    this.rielexistencias=this.maquinas.maquinas[0].existencias;//el 0 es de la maqunina 0
    console.log(this.rielexistencias);

    this.fila1existencias=this.rielexistencias.filter(this.funcionfila1);
    this.fila2existencias=this.rielexistencias.filter(this.funcionfila2);
    this.fila3existencias=this.rielexistencias.filter(this.funcionfila3);
    this.fila4existencias=this.rielexistencias.filter(this.funcionfila4);
    this.fila5existencias=this.rielexistencias.filter(this.funcionfila5);
    this.fila6existencias=this.rielexistencias.filter(this.funcionfila6);
    console.log(this.fila1existencias);
    console.log(this.fila2existencias);
    console.log(this.fila3existencias);
    console.log(this.fila4existencias);
    console.log(this.fila5existencias);
    console.log(this.fila6existencias);

    this.rielproductos=this.maquinas.maquinas[0].productos;

    this.fila1productos=this.rielproductos.filter(this.funcionfila1);
    this.fila2productos=this.rielproductos.filter(this.funcionfila2);
    this.fila3productos=this.rielproductos.filter(this.funcionfila3);
    this.fila4productos=this.rielproductos.filter(this.funcionfila4);
    this.fila5productos=this.rielproductos.filter(this.funcionfila5);
    this.fila6productos=this.rielproductos.filter(this.funcionfila6);
    console.log(this.fila1productos);
    console.log(this.fila2productos);
    console.log(this.fila3productos);
    console.log(this.fila4productos);
    console.log(this.fila5productos);
    console.log(this.fila6productos);
    
    this.rielprecios=this.maquinas.maquinas[0].precios;
    this.fila1precios=this.rielprecios.filter(this.funcionfila1);
    this.fila2precios=this.rielprecios.filter(this.funcionfila2);
    this.fila3precios=this.rielprecios.filter(this.funcionfila3);
    this.fila4precios=this.rielprecios.filter(this.funcionfila4);
    this.fila5precios=this.rielprecios.filter(this.funcionfila5);
    this.fila6precios=this.rielprecios.filter(this.funcionfila6);
    console.log(this.fila1precios);
    console.log(this.fila2precios);
    console.log(this.fila3precios);
    console.log(this.fila4precios);
    console.log(this.fila5precios);
    console.log(this.fila6precios);
   
    
});
}

funcionfila1(obj){
  if("riel"in obj && obj.riel>10 && obj.riel<20 ){
      return true;
  }
  else{
    return false;
  }
}

funcionfila2(obj){
  if("riel"in obj && obj.riel>20 && obj.riel<30 ){
      return true;
  }
  else{
    return false;
  }
}
funcionfila3(obj){
  if("riel"in obj && obj.riel>30 && obj.riel<40 ){
      return true;
  }
  else{
    return false;
  }
}
funcionfila4(obj){
  if("riel"in obj && obj.riel>40 && obj.riel<50 ){
      return true;
  }
  else{
    return false;
  }
}
funcionfila5(obj){
  if("riel"in obj && obj.riel>50 && obj.riel<60 ){
      return true;
  }
  else{
    return false;
  }
}
funcionfila6(obj){
  if("riel"in obj && obj.riel>60 && obj.riel<70 ){
      return true;
  }
  else{
    return false;
  }
}

Selectproductos(){
  this.selectService.selectproductos().then(result=>{
     this.productos= result;
     console.log(result);
     },(err)=>{
       console.log(err);
     }
     );
    }





}
