import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
/*servicios*/
// import { DataService Provider } from "../../providers/data-service/data-service";
import { SelectserviceProvider } from "../../providers/selectservice/selectservice";
import { MvserviceProvider } from "../../providers/mvservice/mvservice";
import {CIprovider  } from "../../providers/data/data";

@IonicPage()
@Component({
  selector: 'page-actualizamv',
  templateUrl: 'actualizamv.html',
})
export class ActualizamvPage {
  @ViewChild(Content) content: Content;

  idmaquina:any;
  existencias:any;
  productos:any;
  precios:any;
  
  // obtenido:any;

  seleccion:any;
 
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

  constructor(public navCtrl: NavController, public navParams: NavParams,public ciService:CIprovider,
    // public da taService:DataServiceProvider,
    public selectService:SelectserviceProvider,public mvservice:MvserviceProvider) 
  {
this.idmaquina=this.ciService.getIdmaquinaActualiza();    // console.log(this.obtenido)
    // this.obtenermaquinas();
    this.Selectproductos();
  }

  ionViewCanEnter() //cuando la paginas esta activa
  {
    this.getrielproducto(this.idmaquina);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActualizamvPage');
  }



funcionfila1(obj){
  if("key"in obj && obj.key>10 && obj.key<20 ){
      return true;
  }
  else{
    return false;
  }
}

funcionfila2(obj){
  if("key"in obj && obj.key>20 && obj.key<30 ){
      return true;
  }
  else{
    return false;
  }
}
funcionfila3(obj){
  if("key"in obj && obj.key>30 && obj.key<40 ){
      return true;
  }
  else{
    return false;
  }
}
funcionfila4(obj){
  if("key"in obj && obj.key>40 && obj.key<50 ){
      return true;
  }
  else{
    return false;
  }
}
funcionfila5(obj){
  if("key"in obj && obj.key>50 && obj.key<60 ){
      return true;
  }
  else{
    return false;
  }
}
funcionfila6(obj){
  if("key"in obj && obj.key>60 && obj.key<70 ){
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


  

    getrielproducto(idmaquina){
      this.mvservice.rielproducto(idmaquina).then(result=>{
        this.productos= result;
        console.log(result);
        },(err)=>{
          console.log(err);
        }
        );
      }

    
}
