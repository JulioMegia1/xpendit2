import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

/*mapa*/
import 'rxjs/add/operator/map';
import L from "leaflet";


/*servicios*/
import { SelectserviceProvider } from "../../providers/selectservice/selectservice";
import { MvserviceProvider } from "../../providers/mvservice/mvservice";
import { AuthserviceProvider } from "../../providers/authservice/authservice";
import { CatalogserviceProvider } from "../../providers/catalogservice/catalogservice";


/*selectable*/
import { IonicSelectableComponent } from 'ionic-selectable';
import { map } from 'rxjs/operator/map';
class Port {
  public label: any;
  public value: any;
}

@IonicPage()
@Component({
  selector: 'page-catmaquinas',
  templateUrl: 'catmaquinas.html',
})
export class CatmaquinasPage {

 /*********SELECT SEARCHEABLE***********/
 ports: Port[];  ///muestra las opciones del select
 port: Port; //muestra la opcion elegida del select

/**********SELECT SEARCHEABLE***********/

maquinas:any;//máquinas select
idMaquina:any;
descripcion:any;
modelo:any;
tipo:any;
direccion:any;

  valornuevo="true" //habilita input
  infomaquinanueva={

    "idMaquina": 102,
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
}//plantilla para maquina nueva
infomaquinaSeleccionada:any;//obtiene info máquina seleccionada

mensaje:any;//mensaje de confirmacion o error

/*select*/
selectTipoMaquina:any
selectModeloMaquina:any;
infoasignados:any
infonoasignados:any;

listausuarios:any;
asignados:any;
noasignados:any;

/*mapa*/
center: L.PointTuple;
map:L.map;
marker:any;


/*infomodem*/
idModem:any;
password:any;
telefono:any;
expiracion:any;


  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,

    public selectprovider:SelectserviceProvider, 
    public mvService:MvserviceProvider,
    public authService:AuthserviceProvider,
    public catService:CatalogserviceProvider
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CatmaquinasPage');
    this.getmaquinasid()
    this.getselecTipoMaquina();
    this.getselecModeloMaquina();
    this.center = [20.634012, -100.334345];
    console.log(this.center)
    this.leafletMap();

    
  }




  nuevamaquina(){
    this.valornuevo="false"
  }

  getmaquinasid(){
    this.selectprovider.selectmaquinas().then(result=>{
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

    this.idMaquina=this.port.label;
    
    this.getInfomaquina();
    this.getusuarios();


    
    this.getselectasignados();    
    this.getselectNoasignados();

  
  }
  /**********************************SELECTABLE**************************/


  guardarmaquina(){
    if( this.descripcion==null || this.descripcion==""
    ||  this.tipo==null || this.tipo==""
    || this.modelo==null || this.modelo==""
    ){
      this.mensaje="Máquina no creada\n favor de ingresar todos los datos correctamente"
      this.showAlert();
      console.log("no creado")
    }
    else{
      this.infomaquinanueva.descripcion=this.descripcion
        this.infomaquinanueva.modelo=this.modelo
        this.infomaquinanueva.tipo=this.tipo
        this.infomaquinanueva.direccion=this.direccion;
      this.catService.newMaquina(this.infomaquinanueva).then((result)=>{
  
        let respuesta:any; //Respuesta de la encriptacion
        respuesta=result;
        console.log(respuesta);
        console.log(this.infomaquinanueva)
        this.mensaje="Máquina creada exitosamente!";
        

        this.showAlert();
        this.getmaquinasid();
  
         },(err)=>{
           console.log(err);
         }
        
         );
  }
  }


getselecTipoMaquina(){
    this.selectprovider.selectTipoMaquina().then((result)=>{
      this.selectTipoMaquina=result;
      console.log(this.selectTipoMaquina);
       },(err)=>{
         console.log(err);
       }
      
       );


  }


  getselecModeloMaquina(){
    this.selectprovider.selectModeloMaquina().then((result)=>{
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
    this.selectprovider.selectasignados(this.idMaquina).then((result)=>{
      this.infoasignados=result;
      console.log(this.infoasignados);
       },(err)=>{
         console.log(err);
       }
       );
  }

  getselectNoasignados(){
    this.selectprovider.selectNoasignados(this.idMaquina).then((result)=>{
      this.infonoasignados=result;
      console.log(this.infonoasignados);
       },(err)=>{
         console.log(err);
       }
       );
  }


asigna(){
  console.log(this.noasignados)
  // let usuariosnuevos=[]
  for(let i=0; i<this.noasignados.length;i=i+1)
  {
    for(let j=0;j<this.listausuarios.length;j=j+1){
      if(this.noasignados[i]==this.listausuarios[j].usuario){
        // usuariosnuevos.push(this.listausuarios[j]);
        console.log(this.listausuarios[j])
        console.log("lo encontre")
        this.infomaquinaSeleccionada.usuarios.push(this.listausuarios[j])

        
      }
    }
  }
  // console.log(usuariosnuevos)
  console.log(this.infomaquinaSeleccionada);
  this.actualizainfo();
  this.mensaje="Los Usuarios asignados han sido modificados correctamente"
  this.showAlert();
  this.infoasignados=null;
  this.infonoasignados=null
  this.noasignados=null;
    this.asignados=null;
  this.getselectasignados()
  this.getselectNoasignados();

 
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

getInfomaquina(){
  this.catService.getInfoMaquina(this.idMaquina).then((result)=>{
    this.infomaquinaSeleccionada=result;
    console.log(this.infomaquinaSeleccionada);
    this.descripcion=this.infomaquinaSeleccionada.descripcion;
    this.direccion=this.infomaquinaSeleccionada.direccion;
    this.modelo=this.infomaquinaSeleccionada.modelo;
    this.tipo=this.infomaquinaSeleccionada.tipo;
    this.password=this.infomaquinaSeleccionada.infoModem.password;
    
    this.telefono=this.infomaquinaSeleccionada.infoModem.telefono;
    this.expiracion=this.infomaquinaSeleccionada.infoModem.expiracion;
    // this.map.removeLayer()
    this.mapa();


     },(err)=>{
       console.log(err);
     }
     );

}


actualizainfo(){
  this.catService.updMaquina(this.infomaquinaSeleccionada).then((result)=>{
  console.log(result)
     },(err)=>{
       console.log(err);
     }
     );

}


modificar(){
  console.log(this.infomaquinaSeleccionada);
  if(this.descripcion==null || this.descripcion==""
  || this.direccion==null || this.direccion==""){
        console.log("No modifique");
        this.mensaje="Máquina no modificada\n favor de ingresar todos los datos correctamente"
        this.showAlert();
        }

  else{
  this.infomaquinaSeleccionada.direccion=this.direccion;
  this.infomaquinaSeleccionada.descripcion=this.descripcion;
  this.infomaquinaSeleccionada.modelo=this.modelo;
  this.infomaquinaSeleccionada.tipo=this.tipo;
  console.log(this.infomaquinaSeleccionada);
  this.actualizainfo();
  this.mensaje="Máquina actualizada correctamente"
  this.showAlert();

}
}

modificainfomodem(){
  if(this.telefono==null || this.telefono==""
  ||this.password==null || this.password==""
  || this.expiracion==null || this.expiracion=="" || this.expiracion.length!=10
  ){
    console.log("no actualice")
    console.log(this.expiracion.length)
    this.mensaje="Info Módem no actualizada "
  this.showAlert();

  }
  else{
    this.infomaquinaSeleccionada.infoModem.telefono=this.telefono;
  this.infomaquinaSeleccionada.infoModem.password=this.password;
  this.infomaquinaSeleccionada.infoModem.expiracion=this.expiracion;
  console.log(this.infomaquinaSeleccionada);
  this.actualizainfo();
  this.mensaje="Info Módem actualizada "
  this.showAlert();


  }

  


}
/*mapa leaflet*/
leafletMap(){
  this.map = L.map('mapId', {
    center: this.center,
    zoom: 10.3
  });
 //var position = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
 //var position = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    var position = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: 'Xpend-It'
  }).addTo(this.map);

}


mapa(){
  if(this.marker){
    this.map.removeLayer(this.marker)
  }
 this.marker = new L.Marker([this.infomaquinaSeleccionada.latitud,this.infomaquinaSeleccionada.longitud]).addTo(this.map)
  //this.map.addLayer(marker);
 .bindPopup(this.infomaquinaSeleccionada.descripcion);
 console.log(L.marker);
 console.log(this.map)
 console.log(L.map)


 this.marker.on('mouseover', function (e) {
  this.openPopup();
});
this.marker.on('mouseout', function (e) {
  this.closePopup();
});

}

ionViewWillLeave(){
  console.log("estoy saliendo will leave")
  // this.map.off();
  // document.getElementById("mapId").outerHTML=""
  // this.map.remove();
}

ionViewDidLeave(){
  console.log("estoy saliendo Did leave")
}

  


}
