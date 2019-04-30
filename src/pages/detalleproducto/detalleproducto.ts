import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,PopoverController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

/***********popover**********/
import { BuscamaquinaproductoPage } from "../buscamaquinaproducto/buscamaquinaproducto";


/*servicios*/
import { MvserviceProvider } from "../../providers/mvservice/mvservice";
import { SelectserviceProvider } from "../../providers/selectservice/selectservice";
import { CIprovider } from "../../providers/data/data";
/************servicios **********/

/**********************************SELECTABLE**************************/
import { IonicSelectableComponent } from 'ionic-selectable';
class Port {
  public label: any;
  public value: any;
}
/**********************************SELECTABLE**************************/


class Port2 {
  public id: number;
  public name: string;
}

@IonicPage()
@Component({
  selector: 'page-detalleproducto',
  templateUrl: 'detalleproducto.html',
})
export class DetalleproductoPage {
  /*variables*/
//   idmaquina:any;  
//   productosmaquina:any//para la busqueda del popover y para elegir el primer producto
//   idproducto:any;
//   listaproductos:any;
  

// infoproducto:any;
  

  
//   // buiscar si se puede hacer mejor
//   seleccion:any;
//   nombreproducto:any;
//   precio:any;
//   faltante:any;
//   existencia:any;
//   maximo:any;
  


   /*********SELECT SEARCHEABLE para cambiar l prducto del riel ***********/
//    ports: Port[];  ///muestra las opciones del select
//    port: Port; //muestra la opcion elegida del select
 
// /**********SELECT SEARCHEABLE***********/
// /****popover */


//    /*********SELECT SEARCHEABLE para cambio de maquinas***********/
//    ports2: Port2[];  ///muestra las opciones del select
//    port2: Port2; //muestra la opcion elegida del select
 
/**********SELECT SEARCHEABLE***********/
// productomaquina:any;


  constructor(public navCtrl: NavController,public alertCtrl: AlertController, public navParams: NavParams,public mvservice:MvserviceProvider,public selectprovider:SelectserviceProvider,public popoverCtrl:PopoverController,public ciService:CIprovider) {
    // this.ports2 = [
    //   { id: 1, name: 'Tokai' },
    //   { id: 2, name: 'Vladivostok' },
    //   { id: 3, name: 'Navlakhi' }
    // ];
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalleproductoPage'); 
  }
  ionViewCanEnter(){
    // this.idmaquina=this.ciService.getIdmaquina(); //obtienes el id de la maquina
    // console.log(this.idmaquina)
    // this.getproductomaquina(this.idmaquina); //obtienes los productos de la maquina para el popover y sacar el primer producto

    
  }
  ngOnInit() {
      //  this.getinfoproducto(this.idmaquina,this.idproducto); 
  }

  getproductomaquina(idmaquina){
    // this.mvservice.buscaproductomaquina(idmaquina).then(result=>{
    //   this.productosmaquina= result;
    //   console.log(this.productosmaquina); 
    //   this.idproducto=parseInt(this.productosmaquina[0].label)
    //   // this.ciService.setIdProducto(this.idproducto);;
    //   console.log(this.idproducto)
    //   this.getinfoproducto(this.idmaquina,this.idproducto)

    //   },(err)=>{
    //     console.log(err);
    //   }
    //   );
    }
  
  
    // presentPopover(ev) {
    //   let popover = this.popoverCtrl.create(BuscamaquinaproductoPage, {
    //      productosmaquina: this.productomaquina,
    //     // textEle: this.text.nativeElement
    //   });
    //   popover.present({
    //     ev: ev
    //   });
    // }


  getlistaproductos(){
    // this.selectprovider.selectproductos().then(result=>{
    //   this.listaproductos=result; //obtiene las maquinas
    //   console.log(this.listaproductos);


    // this.ports=this.listaproductos; //
    //  console.log(this.ports);
      
    //   let a 
    //   for(let i =0;i<this.listaproductos.length;i=i+1){
    //       if(this.listaproductos[i].label==this.infoproducto.producto.idProducto){
    //             a=i;
    //       }
    //   }
    //   this.port=this.ports[a]; //declarar el seleccionado
    //   console.log(this.port)
    //   console.log(result);
    //   },(err)=>{
    //     console.log(err);
    //   }
    //   );
  }

  /**********************************SELECTABLE**************************/
// portChange(event: {
//   component: IonicSelectableComponent,
//   value: any 
// }) {
//   console.log('port:', event.value);
//   console.log("cambio el valor")
//   console.log(this.port);
//   this.nombreproducto=this.port.value;

// }
/**********************************SELECTABLE**************************/

// portChange2(event: {
//   component: IonicSelectableComponent,
//   value: any 
// }) {
//   console.log('port:', event.value);
// }



  getinfoproducto(idmaquina,idproducto){
    // this.mvservice.infoproducto(idmaquina,idproducto).then(result=>{
    //   this.infoproducto= result;
    //   console.log(result);
    //   console.log(this.infoproducto.seleccion)
    //  this.seleccion=this.infoproducto.seleccion;
    //   this.ciService.setIdProducto(this.seleccion);
    //   console.log(this.infoproducto.producto.precioCompra)
    //   this.precio=this.infoproducto.producto.precioCompra
    //   console.log(this.infoproducto.existencia)
    //   this.existencia=this.infoproducto.existencia;
    //   console.log(this.infoproducto.producto.descripcion)
    //   this.nombreproducto=this.infoproducto.producto.descripcion;
    //   console.log(this.infoproducto.faltante);
    //   this.faltante=this.infoproducto.faltante;
    //   console.log(this.infoproducto.maximo)
    //   this.maximo=this.infoproducto.maximo;
    //   this.getlistaproductos();
    //   },(err)=>{
    //     console.log(err);
    //   }
    //   );
    }


    modificaexistencia() {
      // let msj:string;
      // const prompt = this.alertCtrl.create({
        
      //   title: 'Modificar existencia',
      //   message: msj,
      //   inputs: [
      //     {
      //        name: 'existencia',
      //       placeholder: 'Existencia'
      //     },
      //   ],
      //   buttons: [
      //     {
      //       text: 'Cancelar',
      //       handler: data => {
      //         console.log('Cancel clicked');
      //       }
      //     },
      //     {
      //       text: 'Actualizar',
      //       handler: data => {
      //         if(isNaN(data.existencia)==false)
      //         {
      //           console.log("si es un numero");
      //           console.log(data)
      //           console.log(data.existencia);
      //           this.existencia=data.existencia;
      //           console.log(this.existencia);
                
      //         }
      //         else{  
      //           // msj="Favor de ingresar un número válido"
      //           prompt.setMessage("Favor de ingresar un número válido");

  
      //         }
        
      //       }
      //     }
      //   ]
      // });
      // prompt.present();
     
    }
  



}
