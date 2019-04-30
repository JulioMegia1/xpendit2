import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SelectserviceProvider } from '../selectservice/selectservice';

@Injectable()
export class CIprovider {

  tipousuario:any;
  idmaquina:any;
  idproducto:any;
  
    constructor(public http: HttpClient,public selectprovider:SelectserviceProvider) {
      this.selectprovider.selectmaquinas().then(data => {
        let maquinas=data;
        console.log("estoy en get menu y obtengo los datos del json:");
        console.log(maquinas); 
        console.log('Hello DataProvider Provider');
        this.tipousuario="default"
        this.idmaquina=maquinas[0].label;

        this.idproducto=11;//corregir usar la primera seleccion del riel de la maquina especificada

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

}