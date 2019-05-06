import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SelectserviceProvider } from '../selectservice/selectservice';
import { MvserviceProvider } from "../mvservice/mvservice";

@Injectable()
export class CIprovider {

  tipousuario:any;
  idmaquina:any;
  idproducto:any;
  
    constructor(public http: HttpClient,public selectprovider:SelectserviceProvider,public mvService:MvserviceProvider) {
      this.selectprovider.selectmaquinas().then(data => {
        let maquinas=data;
        console.log(maquinas); 
        console.log('Hello DataProvider Provider');
        this.tipousuario="default"
        this.idmaquina=maquinas[0].label;
        this.mvService.buscaproductomaquina(this.idmaquina).then(data=>{
          let productos=data;
          this.idproducto=productos[0].label;

        })

        

      })
  }

    setTipoUsuario(datos) {
    this.tipousuario = datos;  
    console.log("SERVICIO TIPO USUARIO"+this.tipousuario) 
}

    getTipoUsuario() {
    return this.tipousuario;
}  

    setIdMaquina(datos) {
      this.idmaquina = datos;  
      console.log("SERVICIO ID MAQUINA: "+this.idmaquina) 
}

    getIdmaquina() {
    return this.idmaquina;
}  


setIdProducto(datos) {
  this.idproducto = datos;  
  console.log("SERVICIO ID producto: "+this.idproducto) 
}

getIdProducto() {
return this.idproducto;
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

}