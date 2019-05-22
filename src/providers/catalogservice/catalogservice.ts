import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class CatalogserviceProvider {

  url ='http://dev.xpend-it.com:8893'

  constructor(public http: HttpClient) {
    console.log('Hello CatalogserviceProvider Provider');
  }

 /*catalogo maquinas*/
 getMaquinas(){  //indfo del producto
  return new Promise(resolve => {
    let menu=this.url+'/catalogos/mvs/getAll'
    console.log(menu);
    this.http.get(menu).subscribe(data => {
      resolve(data);
    }
    ,err => {
      console.log(err);
    });
  });
}

 
 getidMaquina(){  //indfo del producto
  return new Promise(resolve => {
    let menu=this.url+'/sequence/maquina/'
    console.log(menu);
    this.http.get(menu).subscribe(data => {
      resolve(data);
    }
    ,err => {
      console.log(err);
    });
  });
}



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

delMaquina(data){
  //En angular 7, el delete no puede enviar body, solo (url,options)
  // o url+/(idmaquina)
  //o usar delete 
 
 
  return new Promise ((resolve,reject)=>{
   this.http.request('delete',this.url+'/catalogos/mvs/del/',{body:{idMaquina:data}})
   .subscribe(res=>{
     resolve(res);
   },(err)=>{
     reject(err);
   });
 });

}






  /*******catalogo productos */

  getProductos(){  //indfo del producto
    return new Promise(resolve => {
      let menu=this.url+'/catalogos/productos/getAll'
      console.log(menu);
      this.http.get(menu).subscribe(data => {
        resolve(data);
      }
      ,err => {
        console.log(err);
      });
    });
  }

  getidProducto(){  //indfo del producto
    return new Promise(resolve => {
      let menu=this.url+'/sequence/producto/'
      console.log(menu);
      this.http.get(menu).subscribe(data => {
        resolve(data);
      }
      ,err => {
        console.log(err);
      });
    });
  }



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

 getInfoProducto(idProducto){  //indfo del producto
  return new Promise(resolve => {
    let menu=this.url+'/catalogos/productos/get/'+idProducto
    console.log(menu);
    this.http.get(menu).subscribe(data => {
      resolve(data);
    }
    ,err => {
      console.log(err);
    });
  });
}

updProducto (data){
  var options = {
     headers : { 'Content-Type': 'application/json' }
  }
  return new Promise ((resolve,reject)=>{
    this.http.put(this.url+'/catalogos/productos/upd/', JSON.stringify(data),options)
    .subscribe(res=>{
      resolve(res);
    },(err)=>{
      reject(err);
    });
  });
}


delProducto(data){
  //En angular 7, el delete no puede enviar body, solo (url,options)
  // o url+/(idmaquina)
  //o usar delete 
 
 
  return new Promise ((resolve,reject)=>{
   this.http.request('delete',this.url+'/catalogos/productos/del/',{body:{idProducto:data}})
   .subscribe(res=>{
     resolve(res);
   },(err)=>{
     reject(err);
   });
 });

}





  /*catalogo usuarios*/

  getinfogralUsuarios(){  //indfo del producto
    return new Promise(resolve => {
      let menu=this.url+'/catalogos/usuarios/getAll'
      console.log(menu);
      this.http.get(menu).subscribe(data => {
        resolve(data);
      }
      ,err => {
        console.log(err);
      });
    });
  }

  getUsuario(data){  //indfo del producto
    return new Promise(resolve => {
      let menu=this.url+'/catalogos/usuarios/get/'+data
      console.log(menu);
      this.http.get(menu).subscribe(data => {
        resolve(data);
      }
      ,err => {
        console.log(err);
      });
    });
  }





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


 updUsuario (data){
  var options = {
     headers : { 'Content-Type': 'application/json' }
  }
  return new Promise ((resolve,reject)=>{
    this.http.put(this.url+'/catalogos/usuarios/upd/', JSON.stringify(data),options)
    .subscribe(res=>{
      resolve(res);
    },(err)=>{
      reject(err);
    });
  });
}

delUsuario(data){
  //En angular 7, el delete no puede enviar body, solo (url,options)
  // o url+/(idmaquina)
  //o usar delete 
  return new Promise ((resolve,reject)=>{
   this.http.request('delete',this.url+'/catalogos/usuarios/del/',{body:{usuario:data}})
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

updAlarma (data){
  var options = {
     headers : { 'Content-Type': 'application/json' }
  }
  return new Promise ((resolve,reject)=>{
    this.http.put(this.url+'/catalogos/alarmas/upd/', JSON.stringify(data),options)
    .subscribe(res=>{
      resolve(res);
    },(err)=>{
      reject(err);
    });
  });
}


}
