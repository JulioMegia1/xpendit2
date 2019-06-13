import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { DetallemvPage } from "../detallemv/detallemv";

/**MAPA leaflet
npm install leaflet --save
y agregar en index.html  <link href="https://unpkg.com/leaflet@1.1.0/dist/leaflet.css" rel="stylesheet"> */
import 'rxjs/add/operator/map';
import L from "leaflet";
/*Mapa*/

 /*servicios*/
 import { CIprovider } from '../../providers/data/data';
 import { MvserviceProvider } from "../../providers/mvservice/mvservice";
import { map } from 'rxjs/operator/map';
 /*servicios*/

@IonicPage()
@Component({
  selector: 'page-pantallaprincipal',
  templateUrl: 'pantallaprincipal.html',
})
export class PantallaprincipalPage {

  @ViewChild(Content) content: Content;

  usuario:any;
  tipoUsuario:any;

/*mapa leaf let*/
     maquinas :any;
     center: L.PointTuple;
     map:L.map;
     height:any;
      /*mapa leaf let*/

 hiddengraficas=false;

  
  constructor(public navCtrl: NavController, public navParams: NavParams, public mvservice: MvserviceProvider,public ciService:CIprovider) {
    this.usuario=this.ciService.getUsuario();
    this.tipoUsuario=this.ciService.getTipoUsuario();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
}

ionViewDidEnter(){
  this.center = [20.634012, -100.334345];
  console.log(this.center)
  this.leafletMap();
  this.mapa(this.usuario);
}

ionViewCanEnter(){//si el tipo de  usuario es Operador oculta 
  if(this.tipoUsuario=="Operador"){
    this.hiddengraficas=true
    this.height="100%";
  }
  else{
    this.height="400px"
  }

}

ngAfterViewInit()  {
let interval = setInterval(()=> {
  console.log("hello");
  // this.mapa(this.usuario);
  //this.getmaquinas();
},35000);
}

/*mapa leaflet*/
leafletMap(){
  if(this.map)
  {
    this.map.remove();
    console.log("ya existe lo borre")
  }
 
    console.log("lo creare ")
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
/*mapa leaflet*/

  // ira(){
  //   this.navCtrl.push(DetallemvPage)
  // }

mapa(usuario){
  this.mvservice.mapa(usuario).then(result=>{
           this.maquinas= result;
           console.log(result);
          for ( let maquina of this.maquinas)
          {
            console.log(maquina.idMaquina,maquina.latitud,maquina.longitud)
            var punto = L.icon({
              iconUrl: maquina.icono,
              iconSize: [30, 30], // size of the icon
              iconAnchor: [20, 90],
            })
            var marker = new L.Marker([maquina.latitud,maquina.longitud],{icon:punto}).addTo(this.map)
            //this.map.addLayer(marker);
           .bindPopup(maquina.texto);
      
           marker.on('mouseover', function (e) {
             this.openPopup();
           });
           marker.on('mouseout', function (e) {
             this.closePopup();
           });
      
           marker.on('click', function (e) {
             console.log("diste click aqui");
            //  this.ira();
             //disable mouseout behavior here?
           });
          }
     },(err)=>{
       console.log(err);
     }
     );
    }

  ionViewWillLeave(){
    console.log("estoy saliendo will leave")
  }

  ionViewDidLeave(){
    console.log("estoy saliendo Did leave")
  }

  ionViewWillUnload(){
    console.log("estoy saliendo will unload")
  }

}