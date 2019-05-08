import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';


/*servicios*/
import { SelectserviceProvider } from "../../providers/selectservice/selectservice";
import { MvserviceProvider } from "../../providers/mvservice/mvservice";
import { AuthserviceProvider } from "../../providers/authservice/authservice";


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
infoasignados:any
infonoasignados:any;

listausuarios:any;
asignados:any;
noasignados:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,
    public selectService:SelectserviceProvider, public mvService:MvserviceProvider,public authService:AuthserviceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CatmaquinasPage');
    this.getselecTipoMaquina();
    this.getselecModeloMaquina()
    this.getselectasignados();    
    this.getselectNoasignados();
    this.getusuarios();
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


getselecTipoMaquina(){
    this.selectService.selectTipoMaquina().then((result)=>{
      this.selectTipoMaquina=result;
      console.log(this.selectTipoMaquina);
       },(err)=>{
         console.log(err);
       }
      
       );


  }


  getselecModeloMaquina(){
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


getselectasignados(){
    this.selectService.selectasignados(this.infomaquina.idMaquina).then((result)=>{
      this.infoasignados=result;
      console.log(this.infoasignados);
       },(err)=>{
         console.log(err);
       }
       );
  }

  getselectNoasignados(){
    this.selectService.selectNoasignados(this.infomaquina.idMaquina).then((result)=>{
      this.infonoasignados=result;
      console.log(this.infonoasignados);
       },(err)=>{
         console.log(err);
       }
       );
  }


asigna(){
  console.log(this.noasignados)
  let agregar=[]
  for(let i=0; i<this.noasignados.length;i=i+1)
  {
    for(let j=0;j<this.listausuarios.length;j=j+1){
      if(this.noasignados[i]==this.listausuarios[j].usuario){
        agregar.push(this.listausuarios[j]);
        console.log("lo encontre")
        
      }
    }
  }
  console.log(agregar)
 
}

getusuarios(){
  this.authService.getUsers().then((result)=>{
    this.listausuarios=result;
    console.log(this.listausuarios);
     },(err)=>{
       console.log(err);
     }
     );
}


  


}
