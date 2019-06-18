import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, AlertController } from 'ionic-angular';

/**Servicios */
import { SelectserviceProvider } from "../../providers/selectservice/selectservice";
import { MvserviceProvider } from "../../providers/mvservice/mvservice";
import {CIprovider  } from "../../providers/data/data";
import { CatalogserviceProvider } from "../../providers/catalogservice/catalogservice";

/**********************************SELECTABLE**************************/
import { IonicSelectableComponent } from 'ionic-selectable';

class Port { //clase para select maquinas
  public label: any;
  public value: any;
}

@IonicPage()
@Component({
  selector: 'page-actualizamv',
  templateUrl: 'actualizamv.html',
})
export class ActualizamvPage {
  @ViewChild(Content) content: Content;

  idmaquina:any;
  nombreMaquina:any;
  productos:any;

  listaproductos
 

  seleccion:any;
 
  maquinas:any;
  mensaje:any;

 
  fila1productos:any;
fila2productos:any;
fila3productos:any;
fila4productos:any;
fila5productos:any;
fila6productos:any;
disabledselectProductos=true;
 ports: Port[];  ///muestra las opciones del select
 port: Port; //muestra la opcion elegida del select
  
  


  constructor(public navCtrl: NavController, public navParams: NavParams,public ciService:CIprovider,
    // public da taService:DataServiceProvider,
    public selectService:SelectserviceProvider,public mvservice:MvserviceProvider,public alertCtrl: AlertController,public catService:CatalogserviceProvider,public selectprovider:SelectserviceProvider) 
  {
    this.idmaquina=this.ciService.getIdmaquinaActualiza();    // console.log(this.obtenido)
    this.nombreMaquina=this.ciService.getNombreMaquina();
    console.log(this.nombreMaquina);
    // this.obtenermaquinas();
    // this.Selectproductos();
    this.getInfomaquina(this.idmaquina)

  }

  ionViewCanEnter() //cuando la paginas esta activa
  {
    // this.getrielproducto(this.idmaquina);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActualizamvPage');
  }

  getInfomaquina(idmaquina){
    this.catService.getInfoMaquina(idmaquina).then( (result)=>{
      let infomaquina
      infomaquina=result;
      console.log(infomaquina);
      this.productos=infomaquina.productos
      console.log(this.productos)

  
      // /*productos**/
      this.getselectproductos();

      },(err)=>{
        console.log(err);
      }
      );
  }

  getselectproductos(){ //info de productos
    this.selectprovider.selectproductos().then(result=>{
      this.listaproductos=result; //obtiene los productos
      console.log(this.listaproductos);//lista de TODOS LOS PRODUCTOS
      this.ports=this.listaproductos; 
  
      let productos=this.productos;
      console.log(productos)
  
    let Rieles=Object.keys(productos)
    
    console.log(Rieles)
    let riel
    let ArrayProductos=[]
  for(let i=0;i<Rieles.length;i=i+1)
  {
    riel=Rieles[i]
    productos[riel].key=riel//agregaremos al producto el riel al que pertenece
    ArrayProductos.push(productos[riel])
  }
  console.log(productos);
  console.log(ArrayProductos)
  this.fila1productos=ArrayProductos.filter(this.funcionfila1);
  console.log(this.fila1productos);
  this.fila2productos=ArrayProductos.filter(this.funcionfila2);
  console.log(this.fila2productos);
  this.fila3productos=ArrayProductos.filter(this.funcionfila3);
  console.log(this.fila3productos);
  this.fila4productos=ArrayProductos.filter(this.funcionfila4);
  console.log(this.fila4productos);
  this.fila5productos=ArrayProductos.filter(this.funcionfila5);
  console.log(this.fila5productos);
  this.fila6productos=ArrayProductos.filter(this.funcionfila6);
  console.log(this.fila6productos);
  
  
  
  
  
  //this.fila1productos[0].indice=
  for(let i=0;i<this.listaproductos.length;i=i+1)
  {
    for(let j=0;j<this.fila1productos.length;j=j+1)
    {
      if(this.listaproductos[i].label==this.fila1productos[j].idProducto)
          {
            this.fila1productos[j].indice=this.ports[i]
          }
    }
  }
  
  for(let i=0;i<this.listaproductos.length;i=i+1)
  {
    for(let j=0;j<this.fila2productos.length;j=j+1)
    {
      if(this.listaproductos[i].label==this.fila2productos[j].idProducto)
          {
            this.fila2productos[j].indice=this.ports[i]
          }
    }
  }
  
  
  for(let i=0;i<this.listaproductos.length;i=i+1)
  {
    for(let j=0;j<this.fila3productos.length;j=j+1)
    {
      if(this.listaproductos[i].label==this.fila3productos[j].idProducto)
          {
            this.fila3productos[j].indice=this.ports[i]
          }
    }
  }
  
  for(let i=0;i<this.listaproductos.length;i=i+1)
  {
    for(let j=0;j<this.fila4productos.length;j=j+1)
    {
      if(this.listaproductos[i].label==this.fila4productos[j].idProducto)
          {
            this.fila4productos[j].indice=this.ports[i]
          }
    }
  }
  
  for(let i=0;i<this.listaproductos.length;i=i+1)
  {
    for(let j=0;j<this.fila5productos.length;j=j+1)
    {
      if(this.listaproductos[i].label==this.fila5productos[j].idProducto)
          {
            this.fila5productos[j].indice=this.ports[i]
          }
    }
  }
  
  for(let i=0;i<this.listaproductos.length;i=i+1)
  {
    for(let j=0;j<this.fila6productos.length;j=j+1)
    {
      if(this.listaproductos[i].label==this.fila6productos[j].idProducto)
          {
            this.fila6productos[j].indice=this.ports[i]
          }
    }
  }
  
  console.log(this.fila1productos);
  
  // this.fila7productos=ArrayProductos.filter(this.funcionfila7);
  // console.log(this.fila7productos);
  
  
  //     console.log(this.infoproducto.producto.idProducto)
  //     console.log(this.listaproductos[0].label)
  //     let punto 
  //     for(let i =0; i < this.listaproductos.length;i=i+1){
  //       if(this.infoproducto.producto.idProducto==this.listaproductos[i].label){
  //         punto=i
  //       }
  //     }
  //     console.log(punto)
  //  this.port=this.ports[punto]; 
  //     console.log(result);
      },(err)=>{
        console.log(err);
      }
      );
  }



funcionfila1(obj){
  if("key"in obj && obj.key>10 && obj.key<20 ){
      return true;
  }
  else{
    return false;
  }
}

funcionfila2(obj){
  if("key"in obj && obj.key>20 && obj.key<30 ){
      return true;
  }
  else{
    return false;
  }
}
funcionfila3(obj){
  if("key"in obj && obj.key>30 && obj.key<40 ){
      return true;
  }
  else{
    return false;
  }
}
funcionfila4(obj){
  if("key"in obj && obj.key>40 && obj.key<50 ){
      return true;
  }
  else{
    return false;
  }
}
funcionfila5(obj){
  if("key"in obj && obj.key>50 && obj.key<60 ){
      return true;
  }
  else{
    return false;
  }
}
funcionfila6(obj){
  if("key"in obj && obj.key>60 && obj.key<70 ){
      return true;
  }
  else{
    return false;
  }
}

portChange(event: {
  component: IonicSelectableComponent,
  value: any 
}) {
  console.log('port:', event.value);
  console.log("cambio el valor")
  console.log(event);


  console.log(this.idmaquina)
  console.log(event.component._label)
  console.log(event.value.label)


  let datos={label:event.component._label,value:event.value.label} //
  console.log(datos)
  this.mvservice.updproducto(datos,this.idmaquina).then((result)=>{
    console.log(datos)
    console.log(result);
    this.mensaje="El producto ha sido actualizado"
    this.showAlert();

     },(err)=>{
       console.log(err);
     }
     );
  
  
}

showAlert() {
  const alert = this.alertCtrl.create({
    title: this.mensaje,
    buttons: ['OK']
  });
  alert.present();
}
    
}
