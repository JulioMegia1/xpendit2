import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

/*ng2SmartTable*/
import {LocalDataSource} from 'ng2-smart-table'

/*servicios*/
import { SelectserviceProvider } from "../../providers/selectservice/selectservice";
import { CatalogserviceProvider } from "../../providers/catalogservice/catalogservice";
import { CIprovider } from "../../providers/data/data";

@IonicPage()
@Component({
  selector: 'page-catalarmas',
  templateUrl: 'catalarmas.html',
  styles:['/*tamaño fuente*/:host /deep/ ng2-smart-table { font-size: 16px; } /*encabezado*/ :host /deep/ ng2-smart-table thead > tr > th  { background-color:#e9e9e9;  border: .5pxpx solid grey;text-align:center;}/*colore de las acciones*/:host /deep/ ng2-smart-table thead > tr > th > div { color: #2c6ab9; }/* grid lines */:host /deep/ ng2-smart-table table > tbody > tr > td {border: .5pxpx solid grey;}/*formato completo*/:host /deep/ tr,th {background-color: #ffffff;font-style: bold;text-align:center;font-weight: bold;width: 100%;border: 2px solid #e9e9e9;}']

})
export class CatalarmasPage {
  @ViewChild(Content) content: Content;

  mensaje:any;//mensaje del alert
  
  /*ng2-smartTable*/
  numpagina:any;
  source: LocalDataSource;
  settings = {
    hideSubHeader:false	,
    noDataMessage:"sin datos",
    actions:{
    
      add:false,
      edit:false,
      delete:false,
      columnTitle:"Acciones",
      position:"right",
    custom:[{
      name: 'view',
      title: '<span class="fa-stack fa-2x"><i class="fas fa-square fa-stack-2x" ></i><i class="fas fa-plus fa-stack-1x fa-inverse"></i></span>',
    }]
  },
    columns: {
      descripcion: {
        title: 'Descripción',
      },
      severidad: {
        title: 'Prioridad',
      },
      activaBody: {
        title: 'Body Activa',
        
      },
      inactivaBody: {
        title: 'Body Inactiva',
        
      }
      
    
    },
    pager: {
      display: true,
      perPage: 6
    },
   
   
  };
  data:any; //datos tabla

  alarmaseleccionada:any;

  
  //datos card
  descripcion:any;
  prioridad:any;
  Actsubject:any;
  Actbody:any;
  Inactsubject:any;
  Inactbody:any;
  
  prioridades:any;//select
  inputdisabled=true;
  buttonhidden=true;
  tipoUsuario;

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,
    public selectprovider: SelectserviceProvider,
    public catService:CatalogserviceProvider,
    public ciService:CIprovider
    ) {
      this.tipoUsuario=this.ciService.getTipoUsuario();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CatalarmasPage');
    this.SelectPrioridadAlarmas();
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

  getalarmas(){
  this.catService.getAlarmas().then(result=>{
      this.data=result; //obtiene las alarmas
      let i;
      for(i=0;i<this.data.length;i=i+1){
        this.data[i].activaBody=this.data[i].activa.body;
        this.data[i].inactivaBody=this.data[i].inactiva.body;
      }
      console.log(this.data);
      this.source= new LocalDataSource();
      this.source.load(this.data)
    },(err)=>{
      console.log(err);
    }
    );
  }

cargarDatos(event) {
  console.log(event);
  this.inputdisabled=false;
  this.buttonhidden=false;
  this.alarmaseleccionada=event.data;
  this.descripcion=this.alarmaseleccionada.descripcion;
  this.prioridad=this.alarmaseleccionada.severidad;
  this.Actsubject=this.alarmaseleccionada.activa.subject;
  this.Actbody=this.alarmaseleccionada.activa.body;
  this.Inactsubject=this.alarmaseleccionada.inactiva.subject;
  this.Inactbody=this.alarmaseleccionada.inactiva.body
}

 enviar(){
  if(this.tipoUsuario=="Solo Lectura"){
    this.mensaje="El usuario solo Lectura no tiene los permisos correspondientes"
    this.showAlert();
    }
    else{
  const confirm = this.alertCtrl.create({
          title: 'Desean modificar la alarma?',
          buttons: [
            {
              text: 'Cancelar',
              handler: () => {
                console.log('Disagree clicked');
              }
            },
            {
              text: 'Aceptar',
              handler: () => {
                console.log('Agree clicked');
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
                    else
                    {
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
            }
          ]
        });
        confirm.present();
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
pagina(data){
  this.source.setPaging(1,data);
}
}
