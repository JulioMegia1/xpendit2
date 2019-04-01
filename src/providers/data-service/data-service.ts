import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class DataServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello DataServiceProvider Provider');
  }


  getmaquinas () {    //obtiene el JSON de las maquinas
    return new Promise(resolve => {
      this.http.get('assets/data/maquinas.json').subscribe(data => { 
        resolve(data);
      },err => {
        console.log(err);
      });
    });
  }

  /*obtiene esquema para graficas fusion chart*/
  getschema () {    //obtiene el JSON de los usuarios
    return new Promise(resolve => {
      this.http.get('assets/data/esquemafusioncharthistoricos.json').subscribe(data => { 
        resolve(data);
      },err => {
        console.log(err);
      });
    });
  }



  /*obtiene datos para graficas fusion chart*/
  getdata () {   
    return new Promise(resolve => {
      this.http.get('assets/data/datosfusioncharthistoricos.json').subscribe(data => { 
        resolve(data);
      },err => {
        console.log(err);
      });
    });
  }


  getdata2 () {    //obtiene el JSON de los usuarios
    return new Promise(resolve => {
      this.http.get('assets/data/datosfusioncharthistoricos2.json').subscribe(data => { 
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
