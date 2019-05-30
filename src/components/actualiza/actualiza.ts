
import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';

/**Servicios */
import { CIprovider } from '../../providers/data/data';
import { MvserviceProvider } from "../../providers/mvservice/mvservice";


@Component({
  selector: 'actualiza',
  templateUrl: 'actualiza.html'
})
export class ActualizaComponent {
  
  idmaquina:any;
  infoExistencia:any;

  existencias:any;
  productos:any;
  precios:any;

  rielexistencias:any;
  fila1existencias:any;
  fila2existencias:any;
  fila3existencias:any;
  fila4existencias:any;
  fila5existencias:any;
  fila6existencias:any;
  disabledinputsExistencias=true;

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
  disabledinputsPrecios=true;


  mensaje:any;

  // settings10 = {
  //   //selectMode: 'multi', // just add this
  //   hideSubHeader:true,
  //   columns: null,
  //     actions:{
  //       columnTitle: 'Actualizar',
  //       add: false,
  //       edit: true,
  //       delete: false
  //     }
  // };
  // datafila10=[]
  
  constructor(public ciService:CIprovider,public mvservice:MvserviceProvider,public alertCtrl: AlertController) {
    console.log('Hello ActualizaComponent Component');

    this.idmaquina=this.ciService.getIdmaquinaActualiza();
    console.log(this.idmaquina);

    this.getrielexistencia(this.idmaquina)
    this.getrielprecio(this.idmaquina)
  }


  ionViewDidEnter() {
    console.log("didload")
  }

  //*existencias*/
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
      // let robj
      this.fila1existencias=this.existencias.filter(this.funcionfila1);
      console.log(this.fila1existencias);

  //     var reformattedArray = this.fila1existencias.map(function(obj){ 
  //       var rObj = {};
  //       rObj[obj.key] = obj.value;
  //       return rObj;
  //    });
     
  //    console.log(reformattedArray) 

  //     let c={}
  //     let C={}
      
  // for(let i=0;i<reformattedArray.length;i=i+1)
	// {
	// 	let key=Object.keys(reformattedArray[i])[0]
	// 	let value=reformattedArray[i][key]
	// 	Object.defineProperty(c,key,{value:value})
	// 	Object.defineProperty(C,key,{writable:true})
	// 	C[key]={title:"riel "+key,sort:false }
  // }
  

  // console.log(c)//datos
  // console.log(C)//configuracion columnas
  // this.settings10.columns=C
  // console.log(this.settings10)
  // this.datafila10.push(c)
  // console.log(c)
  // console.log(this.datafila10)
   
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

    modificarExistencia(){
      this.disabledinputsExistencias=false;

    }

    guardarExistencia(){

    
      console.log(this.fila1existencias)
      console.log(this.fila2existencias)
      console.log(this.fila3existencias)
      console.log(this.fila4existencias)
      console.log(this.fila5existencias)
      console.log(this.fila6existencias)
      let maximosupd={}
      let riel
      let existencia

      for(let i =0;i<this.fila1existencias.length;i=i+1)
      {
        riel=this.fila1existencias[i].key;
        existencia=this.fila1existencias[i].value;
        maximosupd[riel]=existencia
      }
      for(let i =0;i<this.fila2existencias.length;i=i+1)
      {
        riel=this.fila2existencias[i].key;
        existencia=this.fila2existencias[i].value;
        maximosupd[riel]=existencia
      }
      for(let i =0;i<this.fila3existencias.length;i=i+1)
      {
        riel=this.fila3existencias[i].key;
        existencia=this.fila3existencias[i].value;
        maximosupd[riel]=existencia
      }
      for(let i =0;i<this.fila4existencias.length;i=i+1)
      {
        riel=this.fila4existencias[i].key;
        existencia=this.fila4existencias[i].value;
        maximosupd[riel]=existencia
      }
      for(let i =0;i<this.fila5existencias.length;i=i+1)
      {
        riel=this.fila5existencias[i].key;
        existencia=this.fila5existencias[i].value;
        maximosupd[riel]=existencia
      }
      for(let i =0;i<this.fila6existencias.length;i=i+1)
      {
        riel=this.fila6existencias[i].key;
        existencia=this.fila6existencias[i].value;
        maximosupd[riel]=existencia
      }

      console.log(maximosupd)
      this.updExistencia(maximosupd,this.idmaquina)
      this.mensaje="Existencia Actualizada"
      this.showAlert();
      this.disabledinputsExistencias=true;

    }

    // onSaveConfirm(event){
    //   console.log(event)
    // }

    updExistencia(data,idmaquina){
        this.mvservice.updexistenciaAM(data,idmaquina).then(result=>{
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

    // Rieles Validacion(separacion)
    funcionfila1(obj){
      if("key"in obj && obj.key>=10 && obj.key<20 ){
          return true;
      }
      else{
        return false;
      }
    }
    funcionfila2(obj){
      if("key"in obj && obj.key>=20 && obj.key<30 ){
          return true;
      }
      else{
        return false;
      }
    }
    funcionfila3(obj){
      if("key"in obj && obj.key>=30 && obj.key<40 ){
          return true;
      }
      else{
        return false;
      }
    }
    funcionfila4(obj){
      if("key"in obj && obj.key>=40 && obj.key<50 ){
          return true;
      }
      else{
        return false;
      }
    }
    funcionfila5(obj){
      if("key"in obj && obj.key>=50 && obj.key<60 ){
          return true;
      }
      else{
        return false;
      }
    }
    funcionfila6(obj){
      if("key"in obj && obj.key>=60 && obj.key<70 ){
          return true;
      }
      else{
        return false;
      }
    }

    /*************/

    


    /*PRECIOS*/
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

      modificarPrecios(){
        this.disabledinputsPrecios=false;
  
      }
  
      guardarPrecios(){
        console.log(this.fila1precios)
        console.log(this.fila2precios)
        console.log(this.fila3precios)
        console.log(this.fila4precios)
        console.log(this.fila5precios)
        console.log(this.fila6precios)
      
      let preciosupd={}
      let riel
      let precio

      for(let i =0;i<this.fila1precios.length;i=i+1)
      {
        riel=this.fila1precios[i].key;
        precio=this.fila1precios[i].value;
        preciosupd[riel]=precio
      }
      for(let i =0;i<this.fila2precios.length;i=i+1)
      {
        riel=this.fila2precios[i].key;
        precio=this.fila2precios[i].value;
        preciosupd[riel]=precio
      }
      for(let i =0;i<this.fila3precios.length;i=i+1)
      {
        riel=this.fila3precios[i].key;
        precio=this.fila3precios[i].value;
        preciosupd[riel]=precio
      }
      for(let i =0;i<this.fila4precios.length;i=i+1)
      {
        riel=this.fila4precios[i].key;
        precio=this.fila4precios[i].value;
        preciosupd[riel]=precio
      }
      for(let i =0;i<this.fila5precios.length;i=i+1)
      {
        riel=this.fila5precios[i].key;
        precio=this.fila5precios[i].value;
        preciosupd[riel]=precio
      }
      for(let i =0;i<this.fila6precios.length;i=i+1)
      {
        riel=this.fila6precios[i].key;
        precio=this.fila6precios[i].value;
        preciosupd[riel]=precio
      }

      console.log(preciosupd)
      this.updPrecios(preciosupd,this.idmaquina)
      this.mensaje="Existencia Actualizada"
      this.showAlert();
      this.disabledinputsPrecios=true
  
      }

      updPrecios(data,idmaquina){
        this.mvservice.updprecioAM(data,idmaquina).then(result=>{
          console.log(result);
          
          },(err)=>{
            console.log(err);
          }
          );
        }



      showAlert() {
        const alert = this.alertCtrl.create({
          title: this.mensaje,
          
          buttons: ['OK']
        });
        alert.present();
      }
      

}