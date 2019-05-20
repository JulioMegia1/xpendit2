import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { FabContainer } from 'ionic-angular';


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

  mensaje:any;//mensaje del alert
  habilitar=false;


  settings = {
    hideSubHeader:false	,
    noDataMessage:"sin datos",
    actions:{
      columnTitle:"Actions",
      position:"right",
      add:false,
      delete:false,
      edit:false,
    custom:[{
      name: 'view',
      title: '<i class="fas fa-edit    "></i>',
    }]
  },
    columns: {
      descripcion: {
        title: 'Descripcion',
        
      },
      severidad: {
        title: 'severidad',
        
       
      },
      activa: {
        title: 'Body Activa',
        sort: false,
        valuePrepareFunction:(activa)=>{
          return activa.body;
        }
      },
      inactiva: {
        title: 'Body Inactiva',
        sort: false,
        valuePrepareFunction:(inactiva)=>{
          return inactiva.body;
        }
      }
      
    
    },
    pager: {
      display: true,
      perPage: 6
    },
   
   
  };
  data:any;

  alarmaseleccionada:any;

  descripcion:any;
  prioridad:any;
  Actsubject:any;
  Actbody:any;
  Inactsubject:any;
  Inactbody:any;

  


  
  prioridades:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,
    public selectprovider: SelectserviceProvider,
    public catService:CatalogserviceProvider,
    public ciService:CIprovider
    ) {
  this.SelectPrioridadAlarmas();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CatalarmasPage');
    this.getalarmas();
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



     
      /**********************************SELECTABLE**************************/


      getalarmas(){
        this.catService.getAlarmas().then(result=>{
          this.data=result; //obtiene las maquinas
          console.log(this.data);
       
    
          console.log(result);
          },(err)=>{
            console.log(err);
          }
          );
      }


cargarDatos(event) {
  console.log(event);
  this.habilitar=true;
  this.alarmaseleccionada=event.data;
  this.descripcion=this.alarmaseleccionada.descripcion;
  this.prioridad=this.alarmaseleccionada.severidad;
  this.Actsubject=this.alarmaseleccionada.activa.subject;
  this.Actbody=this.alarmaseleccionada.activa.body;
  this.Inactsubject=this.alarmaseleccionada.inactiva.subject;
  this.Inactbody=this.alarmaseleccionada.inactiva.body
}

 enviar(){
  console.log(this.alarmaseleccionada)
  if(this.alarmaseleccionada==undefined){
    this.mensaje="No ha seleccionado ninguna alarma"
    this.showAlert();
  }
else{
  if(  
    this.descripcion==null || this.descripcion=="" ||
    this.prioridad==null || this.prioridad=="" ||
    this.Actsubject==null || this.Actsubject=="" ||
    this.Actbody==null || this.Actbody=="" || 
    this.Inactsubject==null || this.Inactsubject=="" ||
    this.Inactbody==null || this.Inactbody=="" )
    {
      this.mensaje="La alarma no ha sido actualizada\n favor de ingresar todos los datos correctamente"
      this.showAlert();

    }
    else{


  this.alarmaseleccionada.descripcion=this.descripcion;
  this.alarmaseleccionada.severidad=this.prioridad;
  this.alarmaseleccionada.activa.subject=this.Actsubject;
  this.alarmaseleccionada.activa.body=this.Actbody;
  this.alarmaseleccionada.inactiva.subject=this.Inactsubject;
  this.alarmaseleccionada.inactiva.body=this.Inactbody;
  console.log(this.alarmaseleccionada);
    this.updAlarma()
}
}

}




updAlarma(){
  this.catService.updAlarma(this.alarmaseleccionada).then( async (result)=>{
    console.log(result)
    await this.getalarmas();

    this.mensaje="La alarma ha sido actualizada"
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
