import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class MvserviceProvider {

  url ='http://dev.xpend-it.com:8890'

  constructor(public http: HttpClient) {
    console.log('Hello MvserviceProvider Provider');
  }

  //pantalla principal***************************


  mapa(tipoUsuario) { //
    console.log("--------entre al servicio del menu-----------");
    return new Promise(resolve => {
  
      let menu=this.url+'/principal/mapa/'+tipoUsuario
      console.log(menu);
      this.http.get(menu).subscribe(data => {
        resolve(data);
      }
      ,err => {
        console.log(err);
      });
    });
  
  }


  //Detalle máquina************************
  maquinas(tipousuario){
    return new Promise(resolve => {
  
      let menu=this.url+'/principal/busca/'+tipousuario
      console.log(menu);
      this.http.get(menu).subscribe(data => {
        resolve(data);
      }
      ,err => {
        console.log(err);
      });
    });

  }
  

  

  alarmas(idmaquina){
    return new Promise(resolve => {
      let menu=this.url+'/detalle/alarmas/'+idmaquina
      console.log(menu);
      this.http.get(menu).subscribe(data => {
        resolve(data);
      }
      ,err => {
        console.log(err);
      });
    });
  }

  reiniciainventario(idmaquina){
    return new Promise(resolve => {
  
      let menu=this.url+'/detalle/inventario/reinicia/'+idmaquina
      console.log(menu);
      this.http.get(menu).subscribe(data => {
        resolve(data);
      }
      ,err => {
        console.log(err);
      });
    });

  }

  contables(idmaquina){
    return new Promise(resolve => {
  
      let menu=this.url+'/detalle/contables/'+idmaquina
      console.log(menu);
      this.http.get(menu).subscribe(data => {
        resolve(data);
      }
      ,err => {
        console.log(err);
      });
    });

  }

  ventahoramaquina(idmaquina){
    return new Promise(resolve => {
      let menu=this.url+'/detalle/grafica/dia/'+idmaquina
      console.log(menu);
      this.http.get(menu).subscribe(data => {
        resolve(data);
      }
      ,err => {
        console.log(err);
      });
    });



  }





}
