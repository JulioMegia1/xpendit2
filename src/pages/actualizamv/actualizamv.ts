import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
/*servicios*/
// import { DataService Provider } from "../../providers/data-service/data-service";
import { SelectserviceProvider } from "../../providers/selectservice/selectservice";
import { MvserviceProvider } from "../../providers/mvservice/mvservice";


@IonicPage()
@Component({
  selector: 'page-actualizamv',
  templateUrl: 'actualizamv.html',
})
export class ActualizamvPage {

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

  constructor(public navCtrl: NavController, public navParams: NavParams,
    // public da taService:DataServiceProvider,
    public selectService:SelectserviceProvider,public mvservice:MvserviceProvider) 
  {
    this.idmaquina=navParams.get("seleccion");


    // console.log(this.obtenido)
    // this.obtenermaquinas();
    this.Selectproductos();
  }


  ionViewCanEnter() //cuando la paginas esta activa
  {
    this.getrielexistencia(this.idmaquina);
    this.getrielproducto(this.idmaquina);
    this.getrielprecio(this.idmaquina);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActualizamvPage');
  }



//   obtenermaquinas(){

//     this.dataService.getmaquinas().then(datos => {
//     this.maquinas=datos;

//     console.log(this.maquinas.maquinas[0].existencias);
    
//     this.rielexistencias=this.maquinas.maquinas[0].existencias;//el 0 es de la maqunina 0
//     console.log(this.rielexistencias);

//     this.fila1existencias=this.rielexistencias.filter(this.funcionfila1);
//     this.fila2existencias=this.rielexistencias.filter(this.funcionfila2);
//     this.fila3existencias=this.rielexistencias.filter(this.funcionfila3);
//     this.fila4existencias=this.rielexistencias.filter(this.funcionfila4);
//     this.fila5existencias=this.rielexistencias.filter(this.funcionfila5);
//     this.fila6existencias=this.rielexistencias.filter(this.funcionfila6);
//     console.log(this.fila1existencias);
//     console.log(this.fila2existencias);
//     console.log(this.fila3existencias);
//     console.log(this.fila4existencias);
//     console.log(this.fila5existencias);
//     console.log(this.fila6existencias);

//     this.rielproductos=this.maquinas.maquinas[0].productos;

//     this.fila1productos=this.rielproductos.filter(this.funcionfila1);
//     this.fila2productos=this.rielproductos.filter(this.funcionfila2);
//     this.fila3productos=this.rielproductos.filter(this.funcionfila3);
//     this.fila4productos=this.rielproductos.filter(this.funcionfila4);
//     this.fila5productos=this.rielproductos.filter(this.funcionfila5);
//     this.fila6productos=this.rielproductos.filter(this.funcionfila6);
//     console.log(this.fila1productos);
//     console.log(this.fila2productos);
//     console.log(this.fila3productos);
//     console.log(this.fila4productos);
//     console.log(this.fila5productos);
//     console.log(this.fila6productos);
    
//     this.rielprecios=this.maquinas.maquinas[0].precios;
//     this.fila1precios=this.rielprecios.filter(this.funcionfila1);
//     this.fila2precios=this.rielprecios.filter(this.funcionfila2);
//     this.fila3precios=this.rielprecios.filter(this.funcionfila3);
//     this.fila4precios=this.rielprecios.filter(this.funcionfila4);
//     this.fila5precios=this.rielprecios.filter(this.funcionfila5);
//     this.fila6precios=this.rielprecios.filter(this.funcionfila6);
//     console.log(this.fila1precios);
//     console.log(this.fila2precios);
//     console.log(this.fila3precios);
//     console.log(this.fila4precios);
//     console.log(this.fila5precios);
//     console.log(this.fila6precios);
   
    
// });
// }

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


    getrielexistencia(idmaquina){
      this.mvservice.rielexistencia(idmaquina).then(result=>{
        this.existencias= result;
        console.log(result);
        let b=[];
        for (let [key,value]of Object.entries(this.existencias))
        {
          b.push({key,value})
          this.existencias=[];
          this.existencias=b;
        }
        console.log(b);
        console.log(this.existencias);
        
        this.fila1existencias=this.existencias.filter(this.funcionfila1);
        this.fila2existencias=this.existencias.filter(this.funcionfila2);
        this.fila3existencias=this.existencias.filter(this.funcionfila3);
        this.fila4existencias=this.existencias.filter(this.funcionfila4);
        this.fila5existencias=this.existencias.filter(this.funcionfila5);
        this.fila6existencias=this.existencias.filter(this.funcionfila6);
        console.log(this.fila1existencias);
            console.log(this.fila2existencias);
            console.log(this.fila3existencias);
            console.log(this.fila4existencias);
            console.log(this.fila5existencias);
            console.log(this.fila6existencias);

    


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


    getrielprecio(idmaquina){
      this.mvservice.rielprecio(idmaquina).then(result=>{
        this.precios= result;
        let b=[];
        for (let [key,value] of Object.entries(this.precios)){
          b.push({key,value})
          this.precios=[]
          this.precios=b;


        }
        console.log(b)
        console.log(this.precios)
        this.fila1precios=this.precios.filter(this.funcionfila1);
        this.fila2precios=this.precios.filter(this.funcionfila2);
        this.fila3precios=this.precios.filter(this.funcionfila3);
        this.fila4precios=this.precios.filter(this.funcionfila4);
        this.fila5precios=this.precios.filter(this.funcionfila5);
        this.fila6precios=this.precios.filter(this.funcionfila6);
        console.log(this.fila1precios);
        console.log(this.fila2precios);
        console.log(this.fila3precios);
        console.log(this.fila4precios);
        console.log(this.fila5precios);
        console.log(this.fila6precios);
      


        console.log(result);
        },(err)=>{
          console.log(err);
        }
        );
      }




}
