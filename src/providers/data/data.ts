import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class DatosUsuarioProvider {

  tipousuario:any;
  graficas:any;
  
    constructor(public http: HttpClient) {
    console.log('Hello DataProvider Provider');
    this.tipousuario="default"
  }

    setTipoUsuario(firstName) {
    this.tipousuario = firstName;  
    console.log("SERVICIO TIPO USUARIO"+this.tipousuario) 
}

    getTipoUsuario() {
    return this.tipousuario;
}  


setdatagraficas(datos) {
  this.graficas = datos;  
  console.log("SERVICIO DATOS GRAFICAS"+this.graficas) 
}

  getdatagraficas() {
  return this.graficas;
}  




}




