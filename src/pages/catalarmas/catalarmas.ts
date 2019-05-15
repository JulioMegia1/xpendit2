import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';

/*componente*/
import { IonicSelectableComponent } from 'ionic-selectable';
class Port {
  public label: any;
  public value: any;
}

/*servicios*/
import { SelectserviceProvider } from "../../providers/selectservice/selectservice";
import { CatalogserviceProvider } from "../../providers/catalogservice/catalogservice";
import { CIprovider } from "../../providers/data/data";

@IonicPage()
@Component({
  selector: 'page-catalarmas',
  templateUrl: 'catalarmas.html',
})
export class CatalarmasPage {
  @ViewChild(Content) content: Content;


   /*********SELECT SEARCHEABLE***********/
 ports: Port[];  ///muestra las opciones del select
 port: Port; //muestra la opcion elegida del select

/**********SELECT SEARCHEABLE***********/
  seleccion:any;
  maquinas:any

  prioridades:any;

  alarmas:any;
  usuario:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public selectprovider: SelectserviceProvider,
    public catService:CatalogserviceProvider,
    public ciService:CIprovider
    ) {
  this.SelectPrioridadAlarmas();
  this.usuario=this.ciService.getTipoUsuario();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CatalarmasPage');
    this.getalarmas();
    this.getmaquinasid();
  }

  SelectPrioridadAlarmas(){
    this.selectprovider.selectprioridadalarmas().then(result=>{
       this.prioridades= result;
       console.log(result);
       },(err)=>{
         console.log(err);
       }
       );
      }



      getmaquinasid(){
        this.selectprovider.selectmaquinas(this.usuario).then(result=>{
          this.maquinas=result; //obtiene las maquinas
          console.log(this.maquinas);
          this.ports=this.maquinas; //
          console.log(this.ports)
         
    
          console.log(result);
          },(err)=>{
            console.log(err);
          }
          );
      }
    
      portChange(event: {
        component: IonicSelectableComponent,
        value: any 
      }) {
        console.log('port:', event.value);
        console.log("cambio el valor")
        console.log(this.port);
      
      }
      /**********************************SELECTABLE**************************/


      getalarmas(){
        this.catService.getAlarmas().then(result=>{
          this.alarmas=result; //obtiene las maquinas
          console.log(this.alarmas);
       
    
          console.log(result);
          },(err)=>{
            console.log(err);
          }
          );
      }



}
