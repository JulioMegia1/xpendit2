import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';


/*servicios*/
import { SelectserviceProvider } from "../../providers/selectservice/selectservice";
import { MvserviceProvider } from "../../providers/mvservice/mvservice";


@IonicPage()
@Component({
  selector: 'page-catmaquinas',
  templateUrl: 'catmaquinas.html',
})
export class CatmaquinasPage {
  valor="true" //habilita input
  infomaquina={

    "idMaquina": 101,
    "descripcion": null,
    "tipo": null,
    "modelo": null,
    "direccion": null,
    "estado": "OK",
    "latitud": "20.626283",
    "longitud": "-100.44127",
    "usuarios": [
        {
            "id": "5c782511ea8a83183b70c01a",
            "usuario": "admin",
            "tipoUsuario": "Administrador",
            "password": "Y+xa88w6ckUvthrYfd94wA==",
            "estadoUsuario": "Activo",
            "persona": {
                "nombre": "Usuario",
                "paterno": "Xpend",
                "materno": "IT",
                "email": "contacto@xpend-it.com"
            },
            "notificar": 0
        }
    ],
    "maximos": {    },
    "productos": {    },
    "precios": {    },
    "existencias": {    },
    "ignorados": {    },
    "infoModem": {
        "idModem": 101,
        "telefono": null,
        "password": null,
        "expiracion": "12/12/2222"
    }
}
mensaje:any;
selectTipoMaquina:any
selectModeloMaquina:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,
    public selectService:SelectserviceProvider, public mvService:MvserviceProvider,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CatmaquinasPage');
    this.infoselecTipoMaquina();
    this.infoselecModeloMaquina()
  }



  nuevamaquina(){
    this.valor="false"
  }

  guardarmaquina(){
    if(this.infomaquina.descripcion==null || this.infomaquina.descripcion==""
    || this.infomaquina.tipo==null || this.infomaquina.tipo==""
    || this.infomaquina.modelo==null || this.infomaquina.modelo==""
    ){
      this.mensaje="Máquina no creada\n favor de ingresar todos los datos correctamente"
      this.showAlert();
      console.log("no creado")
    }
    else{
      this.mvService.newMaquina(this.infomaquina).then((result)=>{
  
        let respuesta:any; //Respuesta de la encriptacion
        respuesta=result;
        console.log(respuesta);
        console.log(this.infomaquina)
        this.mensaje="Máquina creada exitosamente!"

        this.showAlert();
  
         },(err)=>{
           console.log(err);
         }
        
         );
  }
  }


  infoselecTipoMaquina(){
    this.selectService.selectTipoMaquina().then((result)=>{
      this.selectTipoMaquina=result;
      console.log(this.selectTipoMaquina);
       },(err)=>{
         console.log(err);
       }
      
       );


  }


  infoselecModeloMaquina(){
    this.selectService.selectModeloMaquina().then((result)=>{
      this.selectModeloMaquina=result;
      console.log(this.selectModeloMaquina);
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
