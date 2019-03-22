import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class ServicioApiProvider {

  url ='http://13.59.225.188:8888'

  constructor(public http: HttpClient) {
    console.log('Hello ServicioApiProvider Provider');
  }

  getUsers() {
    return new Promise(resolve => {
      this.http.get(this.url+'/login/all').subscribe(data => {
        resolve(data);
      },err => {
        console.log(err);
      });
    });

  }



  encripta (data)
  {
    var options = {
       headers : { 'Content-Type': 'application/json' }
    }
    return new Promise ((resolve,reject)=>{
      this.http.post(this.url+'/login/enc', JSON.stringify(data),options)
      .subscribe(res=>{
        resolve(res);
      },(err)=>{
        reject(err);
      });
    });
 }

 menu(tipoUsuariomenu) { //
  console.log("--------entre al servicio del menu-----------");
  return new Promise(resolve => {

    let menu=this.url+'/menu/'+tipoUsuariomenu
    console.log(menu);
    this.http.get(menu).subscribe(data => {
      resolve(data);
    }
    ,err => {
      console.log(err);
    });
  });

}


 login (data)
  {
    var options = {
       headers : { 'Content-Type': 'application/json' }
    }
    return new Promise ((resolve,reject)=>{
      this.http.post(this.url+'/login/', JSON.stringify(data),options)
      .subscribe(res=>{
        resolve(res);
      },(err)=>{
        reject(err);
      });
    });
 }

}
