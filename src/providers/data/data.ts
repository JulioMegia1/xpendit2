import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SelectserviceProvider } from '../selectservice/selectservice';
import { MvserviceProvider } from "../mvservice/mvservice";

@Injectable()
export class CIprovider {

  usuario:any;
  tipoUsuario:any;
  idmaquina:any;
  idmaquinaActualiza:any;
  idmaquinaCatalogo:any;
  idproducto:any;


  nombreMaquina:any;
  
    constructor(public http: HttpClient,public selectprovider:SelectserviceProvider,public mvService:MvserviceProvider) {
     
  }

    setUsuario(datos) {
    this.usuario = datos;  
    console.log("Servicio usuario"+this.usuario) 
    this.getdefault();
    
}

    getUsuario() {
    return this.usuario;
}  

setTipoUsuario(datos) {
  this.tipoUsuario = datos;  
  console.log("Servicio tipo Usuario"+this.tipoUsuario) 
  
}

  getTipoUsuario() {
  return this.tipoUsuario;
}  

     setIdMaquina(datos) {
     this.idmaquina = datos;  
      console.log("SERVICIO ID MAQUINA: "+this.idmaquina) 
    }

    getIdmaquina() {
    console.log(this.idmaquina)
      
    return this.idmaquina;
}  

 setIdProducto(datos) {
  this.idproducto = datos;  
  console.log("SERVICIO ID producto: "+this.idproducto) 
}

 getIdProducto() {
return this.idproducto; 
} 

setIdMaquinaActualiza(datos) {
  this.idmaquinaActualiza = datos;  
   console.log("SERVICIO ID MAQUINA: "+this.idmaquinaActualiza) 
 }

 getIdmaquinaActualiza() {
 console.log(this.idmaquinaActualiza)
   
 return this.idmaquinaActualiza;
}  


setIdMaquinaCatalogo(datos) {
  this.idmaquinaCatalogo = datos;  
   console.log("SERVICIO ID MAQUINA: "+this.idmaquinaCatalogo) 
 }

 getIdmaquinaCatalogo() {
 console.log(this.idmaquinaCatalogo)
   
 return this.idmaquinaCatalogo;
}  




setNombreMaquina(datos) {
  this.nombreMaquina = datos;  
  console.log("Servicio usuario"+this.nombreMaquina) 
  // this.getdefault();
  
}

  getNombreMaquina() {
  return this.nombreMaquina;
}  


getschema () {    //obtiene el JSON de los usuarios
  return new Promise(resolve => {
    this.http.get('assets/data/esquemaCI.json').subscribe(data => { 
      resolve(data);
    },err => {
      console.log(err);
    });
  });
}

getschema2 () {    //obtiene el JSON de los usuarios
  return new Promise(resolve => {
    this.http.get('assets/data/esquemafusioncharthistoricos2.json').subscribe(data => { 
      resolve(data);
    },err => {
      console.log(err);
    });
  });
}


 getdefault(){
  if(this.idmaquina == undefined || this.idproducto==undefined){
  this.selectprovider.selectmaquinas(this.usuario).then( data => {
     let maquinas=  data;
    console.log(maquinas); 
    if(maquinas=="" || maquinas==null || maquinas==[])
    {
      console.log("NO tiene maquinas asignadas")
    }
    else{
    console.log('Hello DataProvider Provider');
    // this.usuario="default"
    this.idmaquina=maquinas[0].label;
    this.mvService.buscaproductomaquina(this.idmaquina).then(data=>{
    let productos=data;
    console.log(data);
    this.idproducto=productos[0].label;
    })
  }
})
}

}

}