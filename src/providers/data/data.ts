import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class DatosUsuarioProvider {

  tipousuario:any;
  idmaquina:any;
  
    constructor(public http: HttpClient) {
    console.log('Hello DataProvider Provider');
    this.tipousuario="default"
    this.idmaquina="1"
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




