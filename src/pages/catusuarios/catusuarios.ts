import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { AlertController } from 'ionic-angular';


/*servicios*/
import { AuthserviceProvider } from "../../providers/authservice/authservice";
import { SelectserviceProvider } from "../../providers/selectservice/selectservice";
import {  MvserviceProvider} from "../../providers/mvservice/mvservice";
import { CatalogserviceProvider } from "../../providers/catalogservice/catalogservice";

import { DataSource } from "../../../node_modules/ng2-smart-table/lib/data-source/data-source";


@IonicPage()
@Component({
  selector: 'page-catusuarios',
  templateUrl: 'catusuarios.html',
})
export class CatusuariosPage {
  
/*table*/
settings = {
  noDataMessage: "Sin datos",

  actions:{
    columnTitle:"Actions",
    position:"right",
  custom:[{
    name: 'view',
    title: 'Cargar Datos',
  }]
},
  columns: {
    usuario: {
      title: 'usuario'
    },
    tipoUsuario: {
      title: 'Tipo',
      filter: {
        type: 'list',
        config: {
          selectText: 'Select',
          list: [
            { value: 'Administrador', title: 'Administrador' },
            { value: 'Operador', title: 'Operador' },
            { value: 'Solo Lectura', title: 'Solo Lectura' },
          ],

        },
      },
      editor: {
        type: 'list',
        config: {
          list: [
            { value: 'Administrador', title: 'Administrador' },
            { value: 'Operador', title: 'Operador' },
            { value: 'Solo Lectura', title: 'Solo Lectura' },
          ],

        },
      },
      
    },
    estadoUsuario: {
      title: 'Status',
      filter: {
        type: 'list',
        config: {
          selectText: 'Select',
          list: [
            { value: 'Activo', title: 'Activo' },
            { value: 'Inactivo', title: 'Inactivo' },
            { value: 'Vencido', title: 'Vencido' },
          ],

        },
      },
      editor: {
        type: 'list',
        config: {
          list: [
            { value: 'Activo', title: 'Activo' },
            { value: 'Inactivo', title: 'Inactivo' },
            { value: 'Vencido', title: 'Vencido' },
          ],

        },
      },
    },
    persona: {
      title: 'Nombre',
      valuePrepareFunction:(persona)=>{
        return persona.nombre;
      }
      //   var valueModelList = JSON.parse(row.persona);
      //   var htmlEntity ="";
      //   valueModelList.foreach(valueModel=>{
      //     htmlEntity += valueModel.nombre+ " : " + valueModel.value + '<br>';
      //   })     
      // return htmlEntity;
      // }
    },
    paterno: {
      title: 'Paterno'
    },
    materno: {
      title: 'Materno'
    },
    email:{
      title:"Correo"
    }
  },
 
};

data:any;

  @ViewChild(Content) content: Content;

  valor="true" //habilita input
  password:any;//
  infousuario= {
    "usuario": null,
    "tipoUsuario": null,
    "password": null,
    "estadoUsuario": null,
    "persona": {
        "nombre": null,
        "paterno": null,
        "materno": null,
        "email": null
    },
    "notificar": 0
}
mensaje:any;

selectEstadosUsuarios:any;
selectTipoUsuarios:any;


 

  constructor(public alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams,
    //servicios CI
    public authservice:AuthserviceProvider,
    public selectService:SelectserviceProvider,
    public mvService:MvserviceProvider,
    public catService:CatalogserviceProvider,
    ) {
      this.getinfogralMaquinas();
 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CatusuariosPage');
    this.infoselectEstadousuario();
    this.infoselectTipousuario();
    
  }

  getinfogralMaquinas(){
    this.catService.getUsuarios().then(result=>{
      console.log(result)
      this.data=result;
      // this.source=new LocalDataSource(this.data);

        },(err)=>{
          console.log(err);
        }
        );

  }

  nuevousuario(){
    this.valor="false"
  }

 

  encriptacontrasena(){

    let pwdencriptada={ password:this.password}; //contraseña en formato requerido para que el JSON lo encripte
    this.authservice.encripta(pwdencriptada).then((result)=>{
  
      let respuesta:any; //Respuesta de la encriptacion
      respuesta=result;
      console.log(respuesta);
      this.infousuario.password=respuesta.password;
      this.guardarusuario();
      
  

       },(err)=>{
         console.log(err);
       }
      
       );


  }

  guardarusuario(){

    if(this.infousuario.tipoUsuario==null || this.infousuario.tipoUsuario==""
    || this.infousuario.estadoUsuario==null || this.infousuario.estadoUsuario==""
    || this.infousuario.persona.nombre==null || this.infousuario.persona.nombre==""
    || this.infousuario.persona.paterno==null || this.infousuario.persona.paterno==""
    || this.infousuario.persona.materno==null || this.infousuario.persona.materno==""
    || this.infousuario.persona.email==null || this.infousuario.persona.email==""
    || this.infousuario.usuario==null || this.infousuario.usuario==""
    || this.infousuario.password==null || this.infousuario.password==""
    // || this.infousuario.movil==null || this.infousuario.movil==""
    ){
      this.mensaje="Usuario no creado\n favor de ingresar todos los datos"
      this.showAlert();
      console.log("no creado")
    
      }
      else{
        this.catService.newUsuario(this.infousuario).then((result)=>{
  
          let respuesta:any; //Respuesta de la encriptacion
          respuesta=result;
          console.log(respuesta);
          console.log(this.infousuario)
          this.mensaje="Usuario creado exitosamente!"

          this.showAlert();
    
           },(err)=>{
             console.log(err);
           }
          
           );

      }
    
  }


  infoselectEstadousuario(){
    this.selectService.selectEstadoUsuario().then((result)=>{
      this.selectEstadosUsuarios=result;
      console.log(this.selectEstadosUsuarios);
       },(err)=>{
         console.log(err);
       }
      
       );


  }

  infoselectTipousuario(){
    this.selectService.selectTipoUsuarios().then((result)=>{
      this.selectTipoUsuarios=result;
      console.log(this.selectTipoUsuarios);
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

  eliminarUsuario(){

  }

  modificarUsuario(){

  }
cargarDatos(event) {
  console.log(event);
  
}





}
