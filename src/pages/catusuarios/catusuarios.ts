import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { AlertController } from 'ionic-angular';


/*servicios*/
import { AuthserviceProvider } from "../../providers/authservice/authservice";
import { SelectserviceProvider } from "../../providers/selectservice/selectservice";
import {  MvserviceProvider} from "../../providers/mvservice/mvservice";
import { CatalogserviceProvider } from "../../providers/catalogservice/catalogservice";




@IonicPage()
@Component({
  selector: 'page-catusuarios',
  templateUrl: 'catusuarios.html',
})
export class CatusuariosPage {
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
 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CatusuariosPage');
    this.infoselectEstadousuario();
    this.infoselectTipousuario();
    
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






}
