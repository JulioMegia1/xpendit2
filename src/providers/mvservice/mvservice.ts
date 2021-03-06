import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class MvserviceProvider {

  url ='http://dev.xpend-it.com:8893'

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
  graficahoras(tipoUsuario) { //
    console.log("--------entre al servicio del menu-----------");
    return new Promise(resolve => {
  
      let menu=this.url+'/principal/grafica/horas/'+tipoUsuario
      console.log(menu);
      this.http.get(menu).subscribe(data => {
        resolve(data);
      }
      ,err => {
        console.log(err);
      });
    });
  
  }

  graficadia(tipoUsuario) { //
    console.log("--------entre al servicio del menu-----------");
    return new Promise(resolve => {
  
      let menu=this.url+'/principal/grafica/dia/'+tipoUsuario
      console.log(menu);
      this.http.get(menu).subscribe(data => {
        resolve(data);
      }
      ,err => {
        console.log(err);
      });
    });
  
  }

  

  graficapie(tipoUsuario) { //
    console.log("--------entre al servicio del menu-----------");
    return new Promise(resolve => {
      let menu=this.url+'/principal/grafica/pie/'+tipoUsuario
      console.log(menu);
      this.http.get(menu).subscribe(data => {
        resolve(data);
      }
      ,err => {
        console.log(err);
      });
    });
  
  }


  graficahistorica(tipoUsuario) { //
    console.log("--------entre al servicio del menu-----------");
    return new Promise(resolve => {
  
      let menu=this.url+'/principal/grafica/historica/'+tipoUsuario
      console.log(menu);
      this.http.get(menu).subscribe(data => {
        resolve(data);
      }
      ,err => {
        console.log(err);
      });
    });
  
  }


  graficahistoricaultimo(tipoUsuario) { //
    console.log("--------entre al servicio del menu-----------");
    return new Promise(resolve => {
  
      let menu=this.url+'/principal/grafica/historica/dia/'+tipoUsuario
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
  maquinas(tipousuario){ //TRAE TODA LA INFORMACION
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

  buscaproductomaquina(idmaquina){
    return new Promise(resolve => {
  
      let menu=this.url+'/detalle/busca/'+idmaquina
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

  inventario(idmaquina){
    return new Promise(resolve => {
      let menu=this.url+'/detalle/inventario/'+idmaquina
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

  tacometros(idmaquina){
    return new Promise(resolve => {
  
      let menu=this.url+'/detalle/tacometros/'+idmaquina
      let error
      console.log(menu);
      this.http.get(menu).subscribe(data => {
        resolve(data);
      }
      ,err => {
        console.log(err);
        resolve(err) 
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
        let error=[
          {
              "label": "Caja",
              "value": "$0"
          },
          {
              "label": "Monedero",
              "value": "$0"
          },
          {
              "label": "Billetero",
              "value": "$0"
          }
      ]
        resolve(error)
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

  ventahoraacumuladamaquina(idmaquina){
    return new Promise(resolve => {
      let menu=this.url+'/detalle/grafica/dia/acumulada/'+idmaquina
      console.log(menu);
      this.http.get(menu).subscribe(data => {
        resolve(data);
      }
      ,err => {
        console.log(err);
      });
    });
  }

  ventamaquinahistoricaventa(idmaquina){
    return new Promise(resolve => {
      let menu=this.url+'/detalle/grafica/historica/venta/'+idmaquina
      console.log(menu);
      this.http.get(menu).subscribe(data => {
        resolve(data);
      }
      ,err => {
        console.log(err);
      });
    });
  }

  ventamaquinahistoricaunidad(idmaquina){
    return new Promise(resolve => {
      let menu=this.url+'/detalle/grafica/historica/unidad/'+idmaquina
      console.log(menu);
      this.http.get(menu).subscribe(data => {
        resolve(data);
      }
      ,err => {
        console.log(err);
      });
    });
  }

  /*actualizamv*/
  rielexistencia(idmaquina){
    return new Promise(resolve => {
      let menu=this.url+'/actualiza/get/existencia/'+idmaquina
      console.log(menu);
      this.http.get(menu).subscribe(data => {
        resolve(data);
      }
      ,err => {
        console.log(err);
      });
    });
  }

  updexistenciaAM (data,idmaquina)
  {
    var options = {
       headers : { 'Content-Type': 'application/json' }
    }
    return new Promise ((resolve,reject)=>{
      let menu=this.url+"/actualiza/upd/existencia/"+idmaquina;
      this.http.put(menu, JSON.stringify(data),options)
      .subscribe(res=>{
        resolve(res);
      },(err)=>{
        reject(err);
      });
    });
 }

  rielproducto(idmaquina){
    return new Promise(resolve => {
      let menu=this.url+'/actualiza/get/producto/'+idmaquina
      console.log(menu);
      this.http.get(menu).subscribe(data => {
        resolve(data);
      }
      ,err => {
        console.log(err);
      });
    });
  }

  rielprecio(idmaquina){
    return new Promise(resolve => {
      let menu=this.url+'/actualiza/get/precio/'+idmaquina
      console.log(menu);
      this.http.get(menu).subscribe(data => {
        resolve(data);
      }
      ,err => {
        console.log(err);
      });
    });
  }
  
  updprecioAM (data,idmaquina)
  {
    var options = {
       headers : { 'Content-Type': 'application/json' }
    }
    return new Promise ((resolve,reject)=>{
      let menu=this.url+"/actualiza/upd/precio/"+idmaquina;
      this.http.put(menu, JSON.stringify(data),options)
      .subscribe(res=>{
        resolve(res);
      },(err)=>{
        reject(err);
      });
    });
 }

  /*detalle Producto*/
  infoproducto(idmaquina,idproducto){ ///???????????????duda no deberia ser llamado igual por seleccion???
    return new Promise(resolve => {
      let menu=this.url+'/producto/'+idmaquina+'/'+idproducto
      console.log(menu);
      this.http.get(menu).subscribe(data => {
        resolve(data);
      }
      ,err => {
        console.log(err);
        resolve(err)
      });
    });
  }

  ventamaquinaproductohora(idmaquina,seleccion){  //indfo del producto
    return new Promise(resolve => {
      let menu=this.url+'/producto/grafica/dia/'+idmaquina+'/'+seleccion
      console.log(menu);
      this.http.get(menu).subscribe(data => {
        resolve(data);
      }
      ,err => {
        console.log(err);
      });
    });
  }

  ventamaquinaproductohoraacumulada(idmaquina,seleccion){  //indfo del producto
    return new Promise(resolve => {
      let menu=this.url+'/producto/grafica/dia/acumulada/'+idmaquina+'/'+seleccion
      console.log(menu);
      this.http.get(menu).subscribe(data => {
        resolve(data);
      }
      ,err => {
        console.log(err);
      });
    });
  }

  historicaventa(idmaquina,seleccion){  //indfo del producto
    return new Promise(resolve => {
      let menu=this.url+'/producto/grafica/historica/venta/'+idmaquina+'/'+seleccion
      console.log(menu);
      this.http.get(menu).subscribe(data => {
        resolve(data);
      }
      ,err => {
        console.log(err);
      });
    });
  }

  historicaunidad(idmaquina,seleccion){  //indfo del producto
    return new Promise(resolve => {
      let menu=this.url+'/producto/grafica/historica/unidad/'+idmaquina+'/'+seleccion
      console.log(menu);
      this.http.get(menu).subscribe(data => {
        resolve(data);
      }
      ,err => {
        console.log(err);
      });
    });
  }

  // catproductosInfogralproductos(){  //indfo del producto
  //   return new Promise(resolve => {
  //     let menu=this.url+'/catalogos/productos/getAll'
  //     console.log(menu);
  //     this.http.get(menu).subscribe(data => {
  //       resolve(data);
  //     }
  //     ,err => {
  //       console.log(err);
  //     });
  //   });
  // }

  updexistencia (data,idmaquina)
  {
    var options = {
       headers : { 'Content-Type': 'application/json' }
    }
    return new Promise ((resolve,reject)=>{
      let menu=this.url+"/producto/update/existencia/"+idmaquina;
      this.http.put(menu, JSON.stringify(data),options)
      .subscribe(res=>{
        resolve(res);
      },(err)=>{
        reject(err);
      });
    });
 }

 updproducto (data,idmaquina)
  {
    var options = {
       headers : { 'Content-Type': 'application/json' }
    }
    return new Promise ((resolve,reject)=>{
      let menu=this.url+"/producto/update/riel/"+idmaquina;
      this.http.put(menu, JSON.stringify(data),options)
      .subscribe(res=>{
        resolve(res);
      },(err)=>{
        reject(err);
      });
    });
 }






  
  



  





}
