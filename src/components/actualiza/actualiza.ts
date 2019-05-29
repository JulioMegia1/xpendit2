import { Component } from '@angular/core';

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
  disabledinputsExistencias=true

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

  settingsfila10 = {
    //selectMode: 'multi', // just add this
    hideSubHeader:true,
    columns: {
      // r10: {
      //   title: 'riel 10',
      //   sort:false
      // },
      // r11: {
      //   title: 'riel 11',
      //   sort:false

      // },
      // r12: {
      //   title: 'riel 12',
      //   sort:false
      // },
      // r13: {
      //   title: 'riel 13',
      //   sort:false
      // },
      // r14: {
      //   title: 'riel 14',
      //   sort:false

      // },
      // r15: {
      //   title: 'riel 15',
      //   sort:false
      // },
      // r16: {
      //   title: 'riel 16',
      //   sort:false
      // },
      // r17: {
      //   title: 'riel 17',
      //   sort:false
      // },
      // r18: {
      //   title: 'riel 18',
      //   sort:false
      // },
      // r19: {
      //   title: 'riel 19',
      //   sort:false

      // },
    },
      actions:{
        columnTitle: '',
        add: false,
        edit: true,
        delete: false
      }
  };
  datafila10:any
  



  constructor(public ciService:CIprovider,public mvservice:MvserviceProvider) {
    console.log('Hello ActualizaComponent Component');
    this.idmaquina=this.ciService.getIdmaquinaActualiza();
    console.log(this.idmaquina);
    this.getrielexistencia(this.idmaquina)
    this.getrielprecio(this.idmaquina);


  }

  ionViewCanEnter() //cuando la paginas esta activa
  {
    this.getrielproducto(this.idmaquina);
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
      let robj
      this.fila1existencias=this.existencias.filter(this.funcionfila1);
      let c={}
      let C={}


  //     for(let i=0;i<a.length;i=i+1)
	// {
	// 	let key=Object.keys(a[i])[0]
	// 	let value=a[i][key]
	// 	Object.defineProperty(c,key,{value:value})
	// 	Object.defineProperty(C,[key],{writable:true})
	// 	C[key]={title:"riel "+key,sort:false }
	// }
    
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

    }


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
  
      }


}
