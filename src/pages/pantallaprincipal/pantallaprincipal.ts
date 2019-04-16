import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DetallemvPage } from "../detallemv/detallemv";

/**MAPA leaflet
npm install leaflet --save
y agregar en index.html  <link href="https://unpkg.com/leaflet@1.1.0/dist/leaflet.css" rel="stylesheet"> */
import 'rxjs/add/operator/map';
import L from "leaflet";
/*Mapa*/



/*graficas fusioncharts
 npm install angular-fusioncharts
npm install fusioncharts
*/
import * as FusionCharts from 'fusioncharts';
/*fusioncharts*/

 /*servicios*/
 import { DataServiceProvider } from '../../providers/data-service/data-service'; //datos locales de prueba
 import { DatosUsuarioProvider } from "../../providers/data/data";
 import { MvserviceProvider } from "../../providers/mvservice/mvservice";
 /*servicios*/
@IonicPage()
@Component({
  selector: 'page-pantallaprincipal',
  templateUrl: 'pantallaprincipal.html',
})
export class PantallaprincipalPage {

  //Variables fijas
  usuario:any;//falta paserle el usuario real IMPORTANTE
  permisosvista:boolean;


   /*mapa leaf let*/
     maquinas :any;
     center: L.PointTuple;
     map:L.map;
 /*mapa leaf let*/
  
  graficahora:any;
  graficadia:any;
  graficapie:any;
  historico:any;
  historicoultimo:any;




  /*grafica fusioncharts*/
  dataSource: any;
  type: string;
  width: string;
  height: string;
  esquema:any;
  datos:any;
/*grafica fusioncharts*/


  constructor(public navCtrl: NavController, public navParams: NavParams,public dataService:DataServiceProvider, public mvservice: MvserviceProvider,public servicetipousuario:DatosUsuarioProvider) {
    this.usuario=this.servicetipousuario.getTipoUsuario();
    this.funcionglobalhistorica();
    this.fetchData();
    /*fusionchart*/
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    //20.631365, -100.292790
    this.center = [20.634012, -100.334345];
    console.log(this.center)
    this.leafletMap();
    //this.getmaquinas(); 
    this.mapa(this.usuario);
  /**graficas chartjs */
}
ionViewCanEnter(){
  // if(this.usuario=="oper")
  // {
  //     this.permisosvista=false;
  // }
  // else{
  //   this.permisosvista=true;
  // }
}






ngAfterViewInit()  {
let interval = setInterval(()=> {
  console.log("hello");
  
  //this.getmaquinas();
  
  
},35000);
}



// getmaquinas(){
//   console.log("constructor")
//   this.dataService.getmaquinas().then(data => {
//     this.maquinas=data;
//     console.log("estoy en get menu y obtengo los datos del json:");
//     console.log(this.maquinas); 
//     for (let maquina of this.maquinas.maquinas) {
//       console.log(maquina.descripcion,maquina.latitud,maquina.longitud,maquina.iconourl)
      
//       var punto = L.icon({
//         iconUrl: maquina.iconourl,
//         iconSize: [30, 30], // size of the icon
//         iconAnchor: [20, 90],

//       })
//       var marker = new L.Marker([maquina.latitud,maquina.longitud],{icon:punto}).addTo(this.map)
//        //this.map.addLayer(marker);
//       .bindPopup(maquina.descripcion + " | " + maquina.alertas);

//       marker.on('mouseover', function (e) {
//         this.openPopup();
//       });
//       marker.on('mouseout', function (e) {
//         this.closePopup();
//       });

//       marker.on('click', function (e) {
//         console.log("diste click aqui");
//         //this.ira();
        
//         //disable mouseout behavior here?
//       });
//      }   
//   }
//   );
// }
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
/*mapa leaflet*/

  ira(){
    this.navCtrl.push(DetallemvPage)
  }

  /*grafica fusion charts*/
  funcionglobalhistorica(){
     /*fusionchart*/
     this.type = 'timeseries';
     this.width = '100%';
     this.height = '400';
     // This is the dataSource of the chart
     this.dataSource = {
       // Initially data is set as null
       data: null,
       chart: {
         showLegend: 0,
         theme: "zune",
         showValues:1,
        //  syAxisName: "Stock Price",
         //exportEnabled:1, //para exportar la grafica
        //  rotatevalues:1,
        // placevaluesinside:0,
         
       },
         extensions: {
          customRangeSelector: {
              enabled:1 //1 para rangos de fechas
          },
          standardRangeSelector: {
            enabled:1//1 para meses dias años
        }
      },
       caption: {
         text: 'Venta Global Histórica($)'
       },
       yAxis: [
         {
           plot: {
             value: 'venta: ',
             type: 'column',
           },
           format: {
             "prefix": "$",
             "suffix": ".00"
           },
           //title: 'Venta',
         }
       ]
     };
  }
  
  
  /*fusion charts*/
  fetchData() {
    this.dataService.getschema().then(esquema => {
      this.esquema=esquema;
      console.log("estoy en get menu y obtengo los datos del json:");
      console.log(this.esquema); 
      this.dataService.getdata().then(datos => {
        this.datos=datos;
        console.log(this.datos)
      Promise.all([this.datos, this.esquema]).then(res => {
      const data = res[0];
      const schema = res[1];
      // First we are creating a DataStore
      const fusionDataStore = new FusionCharts.DataStore();
      // After that we are creating a DataTable by passing our data and schema as arguments
      const fusionTable = fusionDataStore.createDataTable(data, schema);
      // Afet that we simply mutated our timeseries datasource by attaching the above
      // DataTable into its data property.
      this.dataSource.data = fusionTable;
    });
  }
    );
  }
  );
  }
  /*fusion charts*/

 
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
             this.ira();
             
             //disable mouseout behavior here?
           });
          }
          this.getventahoras(usuario);
          this.getventadia(usuario);
          this.getpie(usuario);
          this.gethistorico(usuario);
          this.getultimohistorico(usuario);
          

          
     },(err)=>{
       console.log(err);
     }
     );
    }



    getventahoras(usuario){
      this.mvservice.graficahoras(usuario).then(result=>{
        this.graficahora= result;
        this.servicetipousuario.setdatagraficas(this.graficahora);
        console.log(result);
      },(err)=>{
        console.log(err);
      }
      );
    }
    
    getventadia(usuario){
      this.mvservice.graficadia(usuario).then(result=>{
        this.graficadia= result;
        console.log(result);
       },(err)=>{
         console.log(err);
       }
       );
    }

    getpie(usuario){
      this.mvservice.graficapie(usuario).then(result=>{
        this.graficapie= result;
        console.log(result);
       },(err)=>{
         console.log(err);
       }
       );
    }

    gethistorico(usuario){
      this.mvservice.graficahistorica(usuario).then(result=>{
        this.historico= result;
        console.log(result);
       },(err)=>{
         console.log(err);
       }
       );
    }

    getultimohistorico(usuario){
      this.mvservice.graficahistoricaultimo(usuario).then(result=>{
        this.historicoultimo= result;
        console.log(result);
       },(err)=>{
         console.log(err);
       }
       );
    }






    // this.dataService.getmaquinas().then(data => {
    //   this.maquinas=data;
    //   console.log("estoy en get menu y obtengo los datos del json:");
    //   console.log(this.maquinas); 
        
    // }
    // );
  
}