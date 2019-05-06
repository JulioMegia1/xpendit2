import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,PopoverController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

/***********popover**********/
import { BuscamaquinaproductoPage } from "../buscamaquinaproducto/buscamaquinaproducto";

/*servicios*/
import { MvserviceProvider } from "../../providers/mvservice/mvservice";
import { SelectserviceProvider } from "../../providers/selectservice/selectservice";
import { CIprovider } from "../../providers/data/data";
/************servicios **********/

/*componentes*/
import { VentaxhoraproductomaquinaComponent } from '../../components/ventaxhoraproductomaquina/ventaxhoraproductomaquina';
import { VentaxdiaproductomaquinaComponent } from '../../components/ventaxdiaproductomaquina/ventaxdiaproductomaquina';
import { HistoricodetalleproductoComponent } from "../../components/historicodetalleproducto/historicodetalleproducto";

/**********************************SELECTABLE**************************/
import { IonicSelectableComponent } from 'ionic-selectable';

class Port {
  public label: any;
  public value: any;
}
/**********************************SELECTABLE**************************/

class Port2 {
  public label:any;
  public value:any;
}

@IonicPage()
@Component({
  selector: 'page-detalleproducto',
  templateUrl: 'detalleproducto.html',
})
export class DetalleproductoPage {

  @ViewChild("ventaHora") ventahora:VentaxhoraproductomaquinaComponent
  @ViewChild("ventaHoraAcum") ventahoraacum:VentaxdiaproductomaquinaComponent
  @ViewChild("Historico") historico:HistoricodetalleproductoComponent
                        
  /*variables*/
  maquinas:any;
  idmaquina:any;  
  nombremaquina:any;
  productomaquina:any //lista de productos popover
  // idproducto:any;
  infoproducto:any;
  riel:any


  // seleccion:any;

 
  nombreproducto:any;
  precio:any;
  faltante:any;
  existencia:any;
  maximo:any;
  listaproductos:any; //lista productos para select

   /*********SELECT SEARCHEABLE para cambiar de maquinas ***********/
   ports: Port[];  ///muestra las opciones del select
   port: Port; //muestra la opcion elegida del select
// /**********SELECT SEARCHEABLE***********/

//  /*********SELECT SEARCHEABLE para cambiar l prducto del riel ***********/
 ports2: Port2[];  ///muestra las opciones del select
 port2: Port2; //muestra la opcion elegida del select
// // /**********SELECT SEARCHEABLE***********/

  constructor(public navCtrl: NavController,public alertCtrl: AlertController, public navParams: NavParams,public mvservice:MvserviceProvider,public selectprovider:SelectserviceProvider,public popoverCtrl:PopoverController,public ciService:CIprovider) {
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalleproductoPage'); 
  }
  ionViewCanEnter(){
    // this.idmaquina=this.ciService.getIdmaquina(); //obtienes el id de la maquina
    this.getmaquinasid()
    // console.log(this.idmaquina)
  //  this.getproductomaquina(this.idmaquina); //obtienes los productos de la maquina para el popover y sacar el primer producto
  //  console.log(this.idproducto)
  }
  ngOnInit() {
  }


  getmaquinasid(){
    this.selectprovider.selectmaquinas().then(result=>{
      this.maquinas=result; //obtiene las maquinas
      console.log(this.maquinas);
      this.ports=this.maquinas; //
      console.log(this.ports)
      this.port=this.ports[0]; 
      console.log(this.port)
      this.idmaquina=this.port.label;
      this.nombremaquina=this.port.value;
      this.ciService.setIdMaquina(this.idmaquina);
      console.log(this.idmaquina)
      this.riel=this.ciService.getIdProducto();

      this.getinfoproducto(this.idmaquina,this.riel);
      this.getproductomaquina(this.idmaquina)
      console.log(result);
      },(err)=>{
        console.log(err);
      }
      );
  }

  getproductomaquina(idmaquina){
    this.mvservice.buscaproductomaquina(idmaquina).then(result=>{
      this.productomaquina= result;
      console.log(this.productomaquina);
      },(err)=>{
        console.log(err);
      }
      );
    }

    getinfoproducto(idmaquina,idproducto){
      this.mvservice.infoproducto(idmaquina,idproducto).then(result=>{
        this.infoproducto= result;
        console.log(this.infoproducto);
      //   console.log(this.infoproducto.seleccion)
       this.riel=this.infoproducto.seleccion;
      this.ciService.setIdProducto(this.riel);
    console.log(this.infoproducto.producto.precioCompra)
        this.precio=this.infoproducto.producto.precioCompra
        console.log(this.infoproducto.existencia)
        this.existencia=this.infoproducto.existencia;
        console.log(this.infoproducto.producto.descripcion)
        this.nombreproducto=this.infoproducto.producto.descripcion;
        console.log(this.infoproducto.faltante);
        this.faltante=this.infoproducto.faltante;
        console.log(this.infoproducto.maximo)
        this.maximo=this.infoproducto.maximo;
 
        this.getselectproductos();
      //   this.getlistaproductos();
        },(err)=>{
          console.log(err);
        }
        );
      }

    getselectproductos(){
      this.selectprovider.selectproductos().then(result=>{
        this.listaproductos=result; //obtiene los productos
        console.log(this.listaproductos);
        this.ports2=this.listaproductos; //
        console.log(this.infoproducto.producto.idProducto)
        console.log(this.listaproductos[0].label)
        let punto 
        for(let i =0; i < this.listaproductos.length;i=i+1){
          if(this.infoproducto.producto.idProducto==this.listaproductos[i].label){
            punto=i
          }
        }
        console.log(punto)
     this.port2=this.ports2[punto]; 
        console.log(result);
        },(err)=>{
          console.log(err);
        }
        );
    }

    /**********************************SELECTABLE**************************/
  portChange(event: {
    component: IonicSelectableComponent,
    value: any 
  }) {
    console.log('port:', event.value);
    console.log("cambio el valor")
    console.log(this.port);
    this.nombremaquina=this.port.value;
    this.idmaquina=this.port.label;
    this.ciService.setIdMaquina(this.idmaquina);
    this.getinfoproducto(this.idmaquina,this.riel);
   this.getproductomaquina(this.idmaquina);
    this.ventahora.updatedata();
    this.ventahoraacum.updatedata();   
    this.historico.updatedata();
    
  }
/**********************************SELECTABLE**************************/

portChange2(event: {
  component: IonicSelectableComponent,
  value: any 
}) {
  console.log('port:', event.value);
  console.log("cambio el valor")
  console.log(this.port2);
  this.putnuevoproducto();
    
}

    async presentPopover(ev) {
      let popover = await this.popoverCtrl.create(BuscamaquinaproductoPage, {
         productosmaquina: this.productomaquina,
         event:ev,
         mode: 'ios',
         backdropDismiss:false
        // textEle: this.text.nativeElement
      });
  
      await popover.present({
        ev: ev
      });
      popover.onDidDismiss(popoverData=>{
        console.log(popoverData)
        if(popoverData!==null)
        {
        this.riel=popoverData;
        console.log(this.riel)
        this.ciService.setIdProducto(this.riel);
        this.getinfoproducto(this.idmaquina,this.riel);
        // this.seleccion=this.idproducto;
        this.ventahora.updatedata();
        this.ventahoraacum.updatedata();
        this.historico.updatedata();
      }
      else{
        console.log("datos nulos");
      }
      });
    }

    modificaexistencia() {
      let msj:string;
      const prompt = this.alertCtrl.create({
        title: 'Modificar existencia',
        message: msj,
        inputs: [
          {
             name: 'existencia',
            placeholder: 'Existencia'
          },
        ],
        buttons: [
          {
            text: 'Cancelar',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Actualizar',
            handler: data => {
              if(isNaN(data.existencia)==false)
              {
                console.log("si es un numero");
                console.log(data)
                console.log(data.existencia);
                this.existencia=data.existencia;
                console.log(this.existencia);
                this.putexistencia();
              }
              else{  
                prompt.setMessage("Favor de ingresar un número válido");
              }
            }
          }
        ]
      });
      prompt.present();
    }


    putexistencia(){
      let datos={label:this.riel,value:this.existencia} 
      this.mvservice.updexistencia(datos,this.idmaquina).then((result)=>{
        console.log(result);
         },(err)=>{
           console.log(err);
         }
         );
    }

    putnuevoproducto(){
      let datos={label:this.riel,value:this.port2.label} 
      console.log(datos)
      this.mvservice.updproducto(datos,this.idmaquina).then((result)=>{
        console.log(datos)
        console.log(result);
        
         },(err)=>{
           console.log(err);
         }
         );
    }
}
