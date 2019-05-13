import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class SelectserviceProvider {

  url ='http://dev.xpend-it.com:8893/'

  constructor(public http: HttpClient) {
    console.log('Hello SelectserviceProvider Provider');
  }


  selectprioridadalarmas() { //
    console.log("--------entre al servicio del menu-----------");
    return new Promise(resolve => {
  
      let select=this.url+'select/prioridad/'
      console.log(select);
      this.http.get(select).subscribe(data => {
        resolve(data);
      }
      ,err => {
        console.log(err);
      });
    });
  
  }


  selectproductos() { //
    console.log("--------entre al servicio del menu-----------");
    return new Promise(resolve => {
  
      let select=this.url+'select/productos/'
      console.log(select);
      this.http.get(select).subscribe(data => {
        resolve(data);
      }
      ,err => {
        console.log(err);
      });
    });
  
  }

  selectmaquinas(usuario) { //
    console.log("--------entre al servicio del menu-----------");
    return new Promise(resolve => {
      let select=this.url+'select/maquina/'+usuario
      console.log(select);
      this.http.get(select).subscribe(data => {
        resolve(data);
      }
      ,err => {
        console.log(err);
      });
    });
  
  }


  selectTipoUsuarios() { //
    console.log("--------entre al servicio del menu-----------");
    return new Promise(resolve => {
      let select=this.url+'select/tipo/usuario'
      console.log(select);
      this.http.get(select).subscribe(data => {
        resolve(data);
      }
      ,err => {
        console.log(err);
      });
    });
  
  }

  selectEstadoUsuario() { //
    console.log("--------entre al servicio del menu-----------");
    return new Promise(resolve => {
      let select=this.url+'select/estado/'
      console.log(select);
      this.http.get(select).subscribe(data => {
        resolve(data);
      }
      ,err => {
        console.log(err);
      });
    });
  
  }
  selectTipoMaquina() { //
    console.log("--------entre al servicio del menu-----------");
    return new Promise(resolve => {
      let select=this.url+'select/tipo/maquina'
      console.log(select);
      this.http.get(select).subscribe(data => {
        resolve(data);
      }
      ,err => {
        console.log(err);
      });
    });
  
  }

  selectModeloMaquina() { //
    console.log("--------entre al servicio del menu-----------");
    return new Promise(resolve => {
      let select=this.url+'select/modelo'
      console.log(select);
      this.http.get(select).subscribe(data => {
        resolve(data);
      }
      ,err => {
        console.log(err);
      });
    });
  
  }


  selectasignados(idmaquina) { //
    console.log("--------entre al servicio del menu-----------");
    return new Promise(resolve => {
      let select=this.url+'select/asignados/'+idmaquina
      console.log(select);
      this.http.get(select).subscribe(data => {
        resolve(data);
      }
      ,err => {
        console.log(err);
      });
    });
  
  }

  selectNoasignados(idmaquina) { //
    console.log("--------entre al servicio del menu-----------");
    return new Promise(resolve => {
      let select=this.url+'select/asignados/no/'+idmaquina
      console.log(select);
      this.http.get(select).subscribe(data => {
        resolve(data);
      }
      ,err => {
        console.log(err);
      });
    });
  
  }
 






}
