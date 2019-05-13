import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,PopoverController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

/*paginas*/
import { ActualizamvPage } from "../actualizamv/actualizamv";
// import { PantallaprincipalPage } from "../pantallaprincipal/pantallaprincipal";
/******popover */
import { BuscamaquinaproductoPage } from "../buscamaquinaproducto/buscamaquinaproducto";

/*servicios*/
import { MvserviceProvider } from "../../providers/mvservice/mvservice";
import { SelectserviceProvider } from "../../providers/selectservice/selectservice";
import { CIprovider } from "../../providers/data/data";

/**********************************SELECTABLE**************************/
import { IonicSelectableComponent } from 'ionic-selectable';
import { GraficaproductosinventarioComponent } from '../../components/graficaproductosinventario/graficaproductosinventario';
import { TacometroproductosComponent } from '../../components/tacometroproductos/tacometroproductos';
import { TacometroventasComponent } from '../../components/tacometroventas/tacometroventas';
import { VentaxhoramaquinaComponent } from '../../components/ventaxhoramaquina/ventaxhoramaquina';
import { VentaxdiamaquinaComponent } from '../../components/ventaxdiamaquina/ventaxdiamaquina';
import { HistoricomaquinaproductoventaComponent } from '../../components/historicomaquinaproductoventa/historicomaquinaproductoventa';
class Port {
  public label: any;
  public value: any;
}
/**********************************SELECTABLE**************************/





@IonicPage()
@Component({
  selector: 'page-detallemv',
  templateUrl: 'detallemv.html',
})
export class DetallemvPage {
  //escuchas hijos
  @ViewChild("prodInv") prodinv:GraficaproductosinventarioComponent
  @ViewChild("tacProd") tacprod:TacometroproductosComponent;
  @ViewChild("tacVent") tacvent:TacometroventasComponent;
  @ViewChild("ventaXhora") ventaxhora:VentaxhoramaquinaComponent;
  @ViewChild("ventaXdia") ventaxdia:VentaxdiamaquinaComponent;
  @ViewChild("histoVentaProd") histoventaprod:HistoricomaquinaproductoventaComponent;

  // @ViewChild("PantallaprincipalPage") principal:PantallaprincipalPage
  usuario:any

  

  maquinas :any;//obtiene todas las maquinas
  seleccion:any; //obtiene elid de la maquina seleccionada
  nombremaquina:any;
  alarmas:any;  //obtiene las alarmas de la maquina seleccionada
  contables:any//obtiene los contables de la maquina seleccionada
  reinicia:any//reincia el inventario y muestra msj
  
  /*********SELECT SEARCHEABLE***********/
    ports: Port[];  ///muestra las opciones del select
    port: Port; //muestra la opcion elegida del select
  
/**********SELECT SEARCHEABLE***********/
 

/*********buscaproductomaquina********/
productomaquina:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,private popoverCtrl: PopoverController,
    public toastCtrl: ToastController,public mvservice:MvserviceProvider,public selectprovider:SelectserviceProvider,public ciService:CIprovider
    ) {
      this.usuario=this.ciService.getTipoUsuario();

      this.getmaquinasid();
     
  }

  ionViewCanEnter() //cuando la paginas esta activa
  {
  
  }

  getmaquinasid(){
    this.selectprovider.selectmaquinas(this.usuario).then(result=>{
      this.maquinas=result; //obtiene las maquinas
      console.log(this.maquinas);
      this.ports=this.maquinas; //
      console.log(this.ports)
      this.port=this.ports[0]; 
      console.log(this.port)
      this.seleccion=this.port.label;
      this.nombremaquina=this.port.value;
      this.ciService.setIdMaquina(this.seleccion);
      console.log(this.seleccion)
      this.getalarmas(this.seleccion);
      this.getcontables(this.seleccion);
      this.getproductomaquina(this.seleccion)
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
  this.seleccion=this.port.label;
  this.nombremaquina=this.port.value;
  this.ciService.setIdMaquina(this.seleccion);
  this.getalarmas(this.seleccion);
  this.getcontables(this.seleccion);
  this.getproductomaquina(this.seleccion);
  this.prodinv.updatedata();
  this.tacprod.updatedata();
  this.tacvent.updatedata();
  this.ventaxhora.updatedata();
  this.ventaxdia.updatdata();
  this.histoventaprod.updatedata();
}
/**********************************SELECTABLE**************************/

  getalarmas(seleccion){
  this.mvservice.alarmas(seleccion).then(result=>{
    this.alarmas= result;
    this.alarmas=this.alarmas.value;
    console.log(result);
   
    if(this.alarmas=="")
    {
      console.log("Sin Alarmas");
    }
    else{
      this.alarma();
      console.log("Alarma Activada");
    }

    },(err)=>{
      console.log(err);
    }
    );
  }

  getcontables(seleccion){
  this.mvservice.contables(seleccion).then(result=>{
    this.contables= result;
    console.log(result);
    },(err)=>{
      console.log(err);
      this.contables= [
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
        ];
    
    }
    );
  }
 
  confirmareinicioinventario() {
    const confirm = this.alertCtrl.create({
      title: 'Desea Actualizar el inventario de la máquina '+this.seleccion+'?',
      message: '',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.reiniciaInventario(this.seleccion)
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }

  reiniciaInventario(seleccion){
    this.mvservice.reiniciainventario(seleccion).then(result=>{
      this.reinicia= result;
      this.getcontables(this.seleccion);
      this.prodinv.updatedata();

      // let usuario:any=this.ciService.getTipoUsuario();

      // this.principal.mapa(usuario);
      // console.log("acttualice el mapa");
      console.log(result);
      },(err)=>{
        console.log(err);
      }
      );


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetallemvPage');
  }

 alarma(){
   
    let toast = this.toastCtrl.create({
      message:this.alarmas,
      showCloseButton: true,
      closeButtonText: 'Ok',
      duration: 3000,
      position: 'top',
      cssClass:'toastCustom'
    });
  
      toast.present();
  
}

actualizarInfoRieles(){
  this.navCtrl.push(ActualizamvPage,{"seleccion":this.seleccion});
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


  presentPopover(ev) {

    let popover = this.popoverCtrl.create(BuscamaquinaproductoPage, {
       productosmaquina: this.productomaquina,
      // textEle: this.text.nativeElement
    });

    popover.present({
      ev: ev
    });
    popover.onDidDismiss(popoverData=>{
      console.log(popoverData)
    })

  }

}
