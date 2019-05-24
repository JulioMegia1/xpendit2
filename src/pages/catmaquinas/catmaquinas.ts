import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

/*ng2SmartTable*/
import {LocalDataSource} from 'ng2-smart-table'

/*mapa*/
import 'rxjs/add/operator/map';
import L from "leaflet";

/*servicios*/
import { SelectserviceProvider } from "../../providers/selectservice/selectservice";
import { MvserviceProvider } from "../../providers/mvservice/mvservice";
import { AuthserviceProvider } from "../../providers/authservice/authservice";
import { CatalogserviceProvider } from "../../providers/catalogservice/catalogservice";
import {CIprovider  } from "../../providers/data/data";

@IonicPage()
@Component({
  selector: 'page-catmaquinas',
  templateUrl: 'catmaquinas.html',
  styles:['/*tamaño fuente*/:host /deep/ ng2-smart-table { font-size: 16px; } /*encabezado*/ :host /deep/ ng2-smart-table thead > tr > th  { background-color:#e9e9e9;  border: .5pxpx solid grey;text-align:center;}/*colore de las acciones*/:host /deep/ ng2-smart-table thead > tr > th > div { color: #2c6ab9; }/* grid lines */:host /deep/ ng2-smart-table table > tbody > tr > td {border: .5pxpx solid grey;}/*formato completo*/:host /deep/ tr,th {background-color: #ffffff;font-style: bold;text-align:center;font-weight: bold;width: 100%;border: 2px solid #e9e9e9;}']

})
export class CatmaquinasPage {

  /*SmartTable*/

  source: LocalDataSource;

  settings = {  
    hideSubHeader:false	,
    noDataMessage:"sin datos",
    add: {
      confirmCreate: true,
      addButtonContent: '<span class="fa-stack fa-2x"><i class="fas fa-square fa-stack-2x "></i><i class="fas fa-plus fa-stack-1x fa-inverse"></i></span>',
      createButtonContent: '<span class="fa-stack fa-2x"><i class="fas fa-square fa-stack-2x "></i><i class="fas fa-save fa-stack-1x fa-inverse"></i></span>',
      cancelButtonContent: '<span class="fa-stack fa-2x"><i class="fas fa-square fa-stack-2x "></i><i class="fas fa-times fa-stack-1x fa-inverse"></i></span>'
          },
          edit: {
      confirmSave: true,
      editButtonContent: '<span class="fa-stack fa-2x"><i class="fas fa-square fa-stack-2x "></i><i class="fas fa-edit fa-stack-1x fa-inverse"></i></span>',
          saveButtonContent: '<span class="fa-stack fa-2x"><i class="fas fa-square fa-stack-2x "></i><i class="fas fa-save fa-stack-1x fa-inverse"></i></span>',
  
      cancelButtonContent: '<span class="fa-stack fa-2x"><i class="fas fa-square fa-stack-2x "></i><i class="fas fa-times fa-stack-1x fa-inverse"></i></span>'
          },
          delete: {
      confirmDelete: true,
      deleteButtonContent: '<span class="fa-stack fa-2x"><i class="fas fa-square fa-stack-2x "></i><i class="fas fa-trash-alt fa-stack-1x fa-inverse"></i></span>',
      saveButtonContent: '<i class="fas fa-check fa-3x"></i>',
      cancelButtonContent: '<i class="fas fa-times fa-3x"></i>'
    },
    actions:{
      columnTitle:"Acciones",
      position:"right",
    custom:[{
      name: 'view',
      title: '<span class="fa-stack fa-2x"><i class="fas fa-square fa-stack-2x" ></i><i class="fas fa-plus fa-stack-1x fa-inverse"></i></span>',
    }]
  },
    columns: {
      estado: {
        title: 'Estado',
        filter: {
          type: 'list',
          config: {
            selectText: 'Todas',
            list: [
              { value: 'Alertada', title: 'Alertada' },
              { value: 'OK', title: 'OK' },
              { value: 'Borrada', title: 'Borrada' },
            ],
          },
        },
        editor: {
          type: 'list',
          config: {
            list: [
              { value: 'OK', title: 'OK' },
            ],
          },
        },
       editable:false
      },
      tipo: {
        title: 'Tipo',
        filter: {
          type: 'list',
          config: {
            selectText: 'Todas',
            list: [
              { value: 'BOTANA', title: 'BOTANA' },
              { value: 'CAFE', title: 'CAFE' },
              { value: 'COMBO', title: 'COMBO' },
              { value: 'REFRESCO', title: 'REFRESCO' },
            ],
          },
        },
        editor: {
          type: 'list',
          config: {
            list: [
              { value: 'BOTANA', title: 'BOTANA' },
              { value: 'CAFE', title: 'CAFE' },
              { value: 'COMBO', title: 'COMBO' },
              { value: 'REFRESCO', title: 'REFRESCO' },
            ],
          },
        },
      },
      modelo: {
        title: 'Modelo',
     
        filter: {
          type: 'list',
          config: {
            selectText: 'Todas',
            list: [
              { value: 'AMS', title: 'AMS' },
              { value: 'CRANE', title: 'CRANE' },
              { value: 'CRANE DEX VIEJO', title: 'CRANE DEX VIEJO' },
              { value: 'SIN ESPECIFICAR', title: 'SIN ESPECIFICAR' },

            ],

          },
        },
        editor: {
          type: 'list',
          config: {
            list: [
              { value: 'AMS', title: 'AMS' },
              { value: 'CRANE', title: 'CRANE' },
              { value: 'CRANE DEX VIEJO', title: 'CRANE DEX VIEJO' },
              { value: 'SIN ESPECIFICAR', title: 'SIN ESPECIFICAR' },

            ],

          },
        },
      },
      descripcion:{ 
        title:"Descripción"
      },
      direccion: {
        title: 'Dirección'
      },
      latitud: {
        title: 'Latitud',
        type:"number"
      },
      longitud: {
        title: 'Longitud',
        type:"number"

      }
    },
   
  };
  numpagina:any;
  data:any;//datos de la tabla

  @ViewChild(Content) content: Content;//minimizar header(menu)

maquinas:any;//máquinas select
idMaquina:any;

// datos grales máquina
descripcion:any;
modelo:any;
tipo:any;
direccion:any;

  infomaquinanueva={
    "idMaquina": null,
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
        "idModem": null,
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

listausuarios:any;//lista usuarios para agregar a los asignados
asignados:any;
noasignados:any;

/*mapa*/
center: L.PointTuple;
map:L.map;
marker:any;
/*ubicacion*/
Latitud:any;
Longitud:any;

/*infomodem*/
idModem:any;
password:any;
telefono:any;
expiracion:any;

/*usuario*/
//usuario:any;

inputsdisabled=true; 
cardshidden=true;
buttonSavehidden=true;
buttonUpdDelhidden=true;
tipoUsuario:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,
    public selectprovider:SelectserviceProvider, 
    public mvService:MvserviceProvider,
    public authService:AuthserviceProvider,
    public catService:CatalogserviceProvider,
    public ciService:CIprovider
    ) {
      this.tipoUsuario=this.ciService.getTipoUsuario();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CatmaquinasPage');
    this.getinfogralMaquinas();// obtiene la informacion de todas las máquinas para la tabla
    this.getselecTipoMaquina();// obtiene la informacion del select tipo máquina
    this.getselecModeloMaquina();// obtiene la informacion del select modelo maquina
    this.center = [20.634012, -100.334345];// asigna el centro del mapa
    console.log(this.center)
    this.leafletMap();
}

  getinfogralMaquinas(){// obtiene la informacion de todas las maquinas para la tabla
    this.catService.getMaquinas().then(result=>{
    console.log(result)
    this.data=result;
    this.source= new LocalDataSource();
    this.source.load(this.data)
    },(err)=>{
      console.log(err);
    }
  );
}

  nuevamaquina(){
    if(this.tipoUsuario=="Solo Lectura")
    {
      this.mensaje="El usuario solo Lectura no tiene los permisos correspondientes"
      this.showAlert();

    }else{
    this.catService.getidMaquina().then(result=>{
    this.descripcion=null;
    this.tipo=null;
    this.modelo=null;
    this.direccion=null;
    console.log(result)
    this.inputsdisabled=false;
    this.buttonSavehidden=false;
    this.buttonUpdDelhidden=true;
    this.cardshidden=true;

    this.infomaquinanueva.idMaquina=result[0].value;
    this.infomaquinanueva.infoModem.idModem=result[0].value;
    this.Latitud=this.infomaquinanueva.latitud;
    this.Longitud=this.infomaquinanueva.longitud;
    console.log(this.infomaquinanueva);
    },(err)=>{
      console.log(err);
    }
  );
    }
}

 guardarmaquina(){
  if(this.tipoUsuario=="Solo Lectura")
  {
    this.mensaje="El usuario solo Lectura no tiene los permisos correspondientes"
    this.showAlert();

  }else{
    if( this.descripcion==null || this.descripcion==""
    ||  this.tipo==null || this.tipo==""
    || this.modelo==null || this.modelo==""
    || this.direccion=="" || this.direccion==null
  //   || this.Latitud==null || this.Latitud==""  || this.Latitud<-90 || this.Latitud>90 
  // || this.Longitud== null || this.Longitud=="" || this.Longitud>180 || this.Longitud<-180
    ){
      this.mensaje="Máquina no creada\n favor de ingresar todos los datos correctamente"
      this.showAlert();
      console.log("no creado")
    }
    else{
      // this.idMaquina=this.infomaquinanueva.idMaquina;
      // this.getInfomaquina();
      
      this.buttonSavehidden=true;
      this.inputsdisabled=true;

      this.infomaquinanueva.descripcion=this.descripcion
      this.infomaquinanueva.modelo=this.modelo
      this.infomaquinanueva.tipo=this.tipo
      this.infomaquinanueva.direccion=this.direccion;
      // this.infomaquinanueva.latitud=this.Latitud;
      // this.infomaquinanueva.longitud=this.Longitud;
      this.catService.newMaquina(this.infomaquinanueva).then(async (result)=>{
        console.log(result);
        console.log(this.infomaquinanueva);

        this.descripcion=null;
        this.modelo=null;
        this.tipo=null;
        this.direccion=null;

        this.mensaje="Máquina creada exitosamente!";
        this.showAlert();
        await this.getinfogralMaquinas();
        // this.getmaquinasid();
      },(err)=>{
        console.log(err);
      }
      );
    }
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

async asigna(){
  if(this.tipoUsuario=="Solo Lectura")
  {
    this.mensaje="El usuario solo Lectura no tiene los permisos correspondientes"
    this.showAlert();

  }else{
  if(this.noasignados==null){
    this.mensaje="No hay usuarios selecionados";
    this.showAlert();
    console.log("No hago nada")
  }
  else{
  console.log(this.noasignados)
  for(let i=0; i<this.noasignados.length;i=i+1)
  {
    for(let j=0;j<this.listausuarios.length;j=j+1){
      if(this.noasignados[i]==this.listausuarios[j].usuario){
        console.log(this.listausuarios[j])
        console.log("lo encontre")
        this.infomaquinaSeleccionada.usuarios.push(this.listausuarios[j])
      }
    }
  }
  console.log(this.infomaquinaSeleccionada);
  await this.actualizainfo();
  this.mensaje="Los Usuarios asignados han sido modificados correctamente";
  this.showAlert();
  this.infoasignados=null;
  this.infonoasignados=null;
  this.noasignados=null;
  this.asignados=null;
  await this.getselectasignados();
  await this.getselectNoasignados();
}
  }
}

 async desasigna(){
  if(this.tipoUsuario=="Solo Lectura")
  {
    this.mensaje="El usuario solo Lectura no tiene los permisos correspondientes"
    this.showAlert();

  }else{
   if(this.asignados==null){
     console.log("no hago nada");
     this.mensaje="No hay usuarios selecionados"
     this.showAlert();
   }
   else
   {
      console.log(this.asignados)
      for(let i=0;i<this.asignados.length;i=i+1) 
      {
        for(let j=0;j<this.infomaquinaSeleccionada.usuarios.length;j=j+1)
          {
            if(this.asignados[i]==this.infomaquinaSeleccionada.usuarios[j].usuario)
              {
                console.log("lo encontre");
                this.infomaquinaSeleccionada.usuarios.splice(j,1)
              }
          }
      }
      console.log(this.infomaquinaSeleccionada.usuarios);
      this.mensaje="Los Usuarios se han desasignado correctamente";
      this.showAlert();
      await this.actualizainfo();
      this.infoasignados=null;
      this.infonoasignados=null;
      this.noasignados=null;
      this.asignados=null;
      await this.getselectasignados();
      await this.getselectNoasignados();
  }
}
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
  this.catService.getInfoMaquina(this.idMaquina).then(async (result)=>{
    this.infomaquinaSeleccionada=result;
    console.log(this.infomaquinaSeleccionada);
    this.descripcion=this.infomaquinaSeleccionada.descripcion;
    this.direccion=this.infomaquinaSeleccionada.direccion;
    this.modelo=this.infomaquinaSeleccionada.modelo;
    this.tipo=this.infomaquinaSeleccionada.tipo;
    this.password=this.infomaquinaSeleccionada.infoModem.password;

    /*ubicacion*/
    this.Latitud=this.infomaquinaSeleccionada.latitud;
    this.Longitud=this.infomaquinaSeleccionada.longitud;
    
    /*info modem*/
    this.telefono=this.infomaquinaSeleccionada.infoModem.telefono;
    this.expiracion=this.infomaquinaSeleccionada.infoModem.expiracion;
    // this.map.removeLayer()
    this.mapa();
    await this.getusuarios();
    await this.getselectasignados();    
    await this.getselectNoasignados();
    },(err)=>{
      console.log(err);
    }
    );
}

 actualizainfo(){
  this.catService.updMaquina(this.infomaquinaSeleccionada).then(async (result)=>{
  console.log(result)
  this.infoasignados=null;
  this.infonoasignados=null;
  this.noasignados=null;
  this.asignados=null;
  await this.getselectNoasignados()
  await this.getselectasignados();
  await this.getinfogralMaquinas();
  },(err)=>{
    console.log(err);
  }
  );
}

modificar(){

  console.log(this.infomaquinaSeleccionada);
  if(this.tipoUsuario=="Solo Lectura")
  {
    this.mensaje="El usuario solo Lectura no tiene los permisos correspondientes"
    this.showAlert();

  }else{
  if(this.descripcion==null || this.descripcion==""
  || this.direccion==null || this.direccion==""){
    console.log("No modifique");
    this.mensaje="Máquina no modificada\n favor de ingresar todos los datos correctamente"
    this.showAlert();
  }
  else
  {
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
}

modificainfomodem(){
  if(this.tipoUsuario=="Solo Lectura")
  {
                this.mensaje="El usuario solo Lectura no tiene los permisos correspondientes"
    this.showAlert();

  }else{
  if(this.telefono==null || this.telefono==""
  ||this.password==null || this.password==""
  || this.expiracion==null || this.expiracion=="" || this.expiracion.length!=10
  ){
    console.log("no actualice")
    console.log(this.expiracion.length)
    this.mensaje="Info Módem no actualizada "
    this.showAlert();
  }
  else
  {
    this.infomaquinaSeleccionada.infoModem.telefono=this.telefono;
    this.infomaquinaSeleccionada.infoModem.password=this.password;
    this.infomaquinaSeleccionada.infoModem.expiracion=this.expiracion;
    console.log(this.infomaquinaSeleccionada);
    this.actualizainfo();
    this.mensaje="Info Módem actualizada "
    this.showAlert();
  }
}
}

updUbicacion(){
  if(this.tipoUsuario=="Solo Lectura")
  {
                this.mensaje="El usuario solo Lectura no tiene los permisos correspondientes"
    this.showAlert();

  }else{
  if(this.Latitud==null || this.Latitud==""  || this.Latitud<-90 || this.Latitud>90 
  || this.Longitud== null || this.Longitud=="" || this.Longitud>180 || this.Longitud<-180
  ){
    console.log("Coordenadas inválidas ")
    this.mensaje="Coordenadas inválidas"
    this.showAlert();
  }
  else
  {
    this.infomaquinaSeleccionada.latitud=this.Latitud;
    this.infomaquinaSeleccionada.longitud=this.Longitud;
    this.actualizainfo();
    this.mapa();
    this.mensaje="Ubicación actualizada "
    this.showAlert();
  }
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

eliminarMaquina(){
  if(this.tipoUsuario=="Solo Lectura")
  {
                this.mensaje="El usuario solo Lectura no tiene los permisos correspondientes"
    this.showAlert();

  }else{

  const confirm = this.alertCtrl.create({
    title: 'Desea Eliminar la maquina'+this.infomaquinaSeleccionada.descripcion+'?',
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
          this.catService.delMaquina(this.idMaquina).then(async (result)=>{
            console.log(result)
            this.descripcion=null;
            this.tipo=null;
            this.modelo=null;
            this.direccion=null;
            this.infonoasignados=null;
            this.noasignados=null;
            this.asignados=null;
            this.infoasignados=null;
            this.Latitud=null;
            this.Longitud=null;
            this.idModem=null;
            this.password=null;
            this.telefono=null;
            this.expiracion=null;
            await this.getinfogralMaquinas();
            this.mensaje="La máquina ha sido eliminada"
            this.showAlert();
            },(err)=>{
              console.log(err);
            }
            );
        }
      }
    ]
  });
  confirm.present();
}
}

ionViewWillLeave(){
  console.log("estoy saliendo will leave")
}

ionViewDidLeave(){
  console.log("estoy saliendo Did leave")
}

cargarDatos(event) {
  console.log(event);
    if(event.data.estado=="Borrada"){
        this.mensaje="No puedes seleccionar una máquina borrada";
        this.showAlert();
    }
    else
    {
      this.cardshidden=false;
      this.inputsdisabled=false;
      this.buttonUpdDelhidden=false;
      this.buttonSavehidden=true;

      this.idMaquina=event.data.idMaquina;
      this.getInfomaquina();
      this.getusuarios();
      this.getselectasignados();    
      this.getselectNoasignados();
    }
  }

  onDeleteConfirm(event) {
    console.log("Delete Event In Console")
    console.log(event);
    if(this.tipoUsuario=="Solo Lectura")
    {
                  this.mensaje="El usuario solo Lectura no tiene los permisos correspondientes"
      this.showAlert();

    }else{
    if(event.data.estado=="Borrada"){
      this.mensaje="No puedes borrar una máquina ya eliminada";
      this.showAlert();

    }
    else{

      const confirm = this.alertCtrl.create({
        title: 'Seguro deseas eliminar la máquina'+ event.data.descripcion+'?',
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
              this.idMaquina=event.data.idMaquina;
              this.catService.delMaquina(this.idMaquina).then(async (result)=>{
                console.log(result)
                await this.getinfogralMaquinas();
                this.mensaje="La máquina ha sido eliminada"
                this.showAlert();
                },(err)=>{
                  console.log(err);
                }
                );
            }
          }
        ]
      });
      confirm.present();
    }
  }
  }

    onCreateConfirm(event) {
    console.log("Create Event In Console")
    console.log(event);
    if(this.tipoUsuario=="Solo Lectura")
    {
                  this.mensaje="El usuario solo Lectura no tiene los permisos correspondientes"
      this.showAlert();

    }else{
    let lati 
    let long
    lati= parseFloat(event.newData.latitud);
    long= parseFloat(event.newData.longitud);
    event.newData.latitud=lati;
    event.newData.longitud=long;
    console.log(event)

    if(event.newData.estado==null || event.newData.estado==""
    ||event.newData.tipo==null || event.newData.tipo==""
    ||event.newData.modelo==null || event.newData.modelo==""
    ||event.newData.descripcion==null || event.newData.descripcion==""
    ||event.newData.latitud==null || event.newData.latitud=="" || event.newData.latitud<-90 || event.newData.latitud>90   || isNaN(event.newData.latitud)==true 
    ||event.newData.longitud==null || event.newData.longitud==""  ||event.newData.longitud>180 ||event.newData.longitud<-180  || isNaN(event.newData.longitud)==true 
    ||event.newData.direccion==null || event.newData.direccion==""
    ){
      console.log("Datos no validos")
      console.log(event)
      this.mensaje="Máquina no creada\n favor de ingresar todos los datos correctamente"
      this.showAlert();
    }
    else
    {
      console.log("Datos validos")
      console.log(event)


      this.catService.getidMaquina().then(result=>{
      console.log(result)

      this.infomaquinanueva.idMaquina=result[0].value;
      this.infomaquinanueva.infoModem.idModem=result[0].value;
      this.infomaquinanueva.estado=event.newData.estado;
      this.infomaquinanueva.tipo=event.newData.tipo
      this.infomaquinanueva.modelo=event.newData.modelo
      this.infomaquinanueva.descripcion=event.newData.descripcion
      this.infomaquinanueva.latitud=event.newData.latitud
      this.infomaquinanueva.longitud=event.newData.longitud
      this.infomaquinanueva.direccion=event.newData.direccion
      console.log(this.infomaquinanueva);
      this.catService.newMaquina(this.infomaquinanueva).then(async (result)=>{
        console.log(result);
        console.log(this.infomaquinanueva);
        this.mensaje="Máquina creada exitosamente!";
        this.showAlert();
        await this.getinfogralMaquinas();
      },(err)=>{
        console.log(err);
      }
      );

      },(err)=>{
        console.log(err);
      }
      );
    }
  }
  }

onSaveConfirm(event) { //Editar los productos
  console.log("Edit Event In Console")
  console.log(event);
  if(this.tipoUsuario=="Solo Lectura")
  {
                this.mensaje="El usuario solo Lectura no tiene los permisos correspondientes"
    this.showAlert();

  }else{
  if(event.data.estado=="Borrada"){
    this.mensaje="No puedes editar una máquina borrada";
    this.showAlert();
  }
  else{
    if(event.newData.descripcion=="" || event.newData.descripcion==null
    || event.newData.direccion=="" || event.newData.direccion==null 
    || event.newData.latitud=="" || event.newData.latitud==null || event.newData.latitud<-90 || event.newData.latitud>90   || isNaN(event.newData.latitud)==true 
    || event.newData.longitud=="" || event.newData.longitud==null ||event.newData.longitud>180 ||event.newData.longitud<-180  || isNaN(event.newData.longitud)==true 
    ){
      this.mensaje="Máquina no modificada\n favor de ingresar todos los datos correctamente"
      this.showAlert();
    }
      else{
      console.log(event.newData)
      this.catService.updMaquina(event.newData).then(async (result)=>{
      console.log(result)
      this.mensaje="Máquina modificada correctamente"
      this.showAlert();
      await this.getinfogralMaquinas();
        },(err)=>{
          console.log(err);
        }
        );
      }
    }
  }
  }

pagina(data){
  this.source.setPaging(1,data);
}
}
