import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class MvserviceProvider {

  url ='http://dev.xpend-it.com:8890'

  constructor(public http: HttpClient) {
    console.log('Hello MvserviceProvider Provider');
  }


  mapa(tipoUsuariomenu) { //
    console.log("--------entre al servicio del menu-----------");
    return new Promise(resolve => {
  
      let menu=this.url+'/principal/mapa/'+tipoUsuariomenu
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
