import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class CatalogserviceProvider {

  url ='http://dev.xpend-it.com:8893'

  constructor(public http: HttpClient) {
    console.log('Hello CatalogserviceProvider Provider');
  }

 /*catalogo maquinas*/
 newMaquina (data){
  var options = {
     headers : { 'Content-Type': 'application/json' }
  }
  return new Promise ((resolve,reject)=>{
    this.http.post(this.url+'/catalogos/mvs/new/', JSON.stringify(data),options)
    .subscribe(res=>{
      resolve(res);
    },(err)=>{
      reject(err);
    });
  });
}

getInfoMaquina(idmaquina){  //indfo del producto
  return new Promise(resolve => {
    let menu=this.url+'/catalogos/mvs/get/'+idmaquina
    console.log(menu);
    this.http.get(menu).subscribe(data => {
      resolve(data);
    }
    ,err => {
      console.log(err);
    });
  });
}

updMaquina (data){
  var options = {
     headers : { 'Content-Type': 'application/json' }
  }
  return new Promise ((resolve,reject)=>{
    this.http.put(this.url+'/catalogos/mvs/upd/', JSON.stringify(data),options)
    .subscribe(res=>{
      resolve(res);
    },(err)=>{
      reject(err);
    });
  });
}






  /*******catalogo productos */
  newProducto (data){
    var options = {
       headers : { 'Content-Type': 'application/json' }
    }
    return new Promise ((resolve,reject)=>{
      this.http.post(this.url+'/catalogos/productos/new/', JSON.stringify(data),options)
      .subscribe(res=>{
        resolve(res);
      },(err)=>{
        reject(err);
      });
    });
 }




  /*catalogo usuarios*/
  newUsuario (data){
    var options = {
       headers : { 'Content-Type': 'application/json' }
    }
    return new Promise ((resolve,reject)=>{
      this.http.post(this.url+'/catalogos/usuarios/new/', JSON.stringify(data),options)
      .subscribe(res=>{
        resolve(res);
      },(err)=>{
        reject(err);
      });
    });
 }


 /*catalogos alarmas*/
 getAlarmas(){  //indfo del producto
  return new Promise(resolve => {
    let menu=this.url+'/catalogos/alarmas/getAll'
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
