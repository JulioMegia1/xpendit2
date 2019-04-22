import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SelectserviceProvider } from '../selectservice/selectservice';

@Injectable()
export class CIprovider {

  maquinas

  tipousuario:any;
  idmaquina:any;
  
    constructor(public http: HttpClient,public selectprovider:SelectserviceProvider) {
      this.selectprovider.selectmaquinas().then(data => {
        this.maquinas=data;
        console.log("estoy en get menu y obtengo los datos del json:");
        console.log(this.maquinas); 
        console.log('Hello DataProvider Provider');
        this.tipousuario="default"
        this.idmaquina=this.maquinas[0].label
      


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




