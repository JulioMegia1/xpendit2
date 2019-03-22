import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**MAPA leaflet
npm install leaflet --save
y agregar en index.html  <link href="https://unpkg.com/leaflet@1.1.0/dist/leaflet.css" rel="stylesheet"> */
import 'rxjs/add/operator/map';
import L from "leaflet";
/*Mapa*/


 /*GRAFICAS Chartjs
 npm install chart.js --save
*/
import { Chart } from 'chart.js';
/*chartjs*/



/*graficas fusioncharts
 npm install angular-fusioncharts
npm install fusioncharts
graficas fusioncharts*/
import * as FusionCharts from 'fusioncharts';
/*fusioncharts*/



 /*servicios*/
 import { DataServiceProvider } from '../../providers/data-service/data-service';
 /*servicios*/






@IonicPage()
@Component({
  selector: 'page-pantallaprincipal',
  templateUrl: 'pantallaprincipal.html',
})
export class PantallaprincipalPage {
  shownSessions=1;

  /*chartjs*/
  @ViewChild('barCanvas') barCanvas;
  @ViewChild('doughnutCanvas') doughnutCanvas;
  @ViewChild('lineCanvas') lineCanvas;
    barChart: any;
    doughnutChart: any;
    lineChart: any;
    /*chartjs*/


  /*mapa leaf let*/
  maquinas :any;
  center: L.PointTuple;
  map:L.map;
  /*mapa leaf let*/


  /*grafica fusioncharts*/
  dataSource: any;
  type: string;
  width: string;
  height: string;
  esquema:any;
  datos:any;
/*grafica fusioncharts*/


  constructor(public navCtrl: NavController, public navParams: NavParams,public dataService:DataServiceProvider) {
    this.getmaquinas();


    /*fusionchart*/
    this.type = 'timeseries';
    this.width = '100%';
    this.height = '400';
    // This is the dataSource of the chart
    this.dataSource = {
      // Initially data is set as null
      data: null,
      chart: {
        showLegend: 0
      },
      caption: {
        text: 'Venta Global Historicas($)'
      },
      yAxis: [
        {
          plot: {
            value: 'venta: ',
            type: 'column'
          },
          format: {
            "prefix": "$",
            "suffix": ".00"
          },
          title: 'Venta'
        }
      ]
    };
    this.fetchData();
    /*fusionchart*/
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    //20.631365, -100.292790
    this.center = [20.621197, -100.331521];
    console.log(this.center)
    this.leafletMap();

    /**graficas chartjs */
    this.barChart = new Chart(this.barCanvas.nativeElement, {

      type: 'bar',
      data: {
          labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          datasets: [{
              label: '# of Votes',
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
      }
  });

  this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'pie',
      data: {
          labels: ["IPQ botana", "IPQ Refresco", "SAFRAN I", "SAFRAN II", "CENTA", "KIWIT"],
          datasets: [{
              label: '# of Votes',
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              hoverBackgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56",
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56"
              ]
          }]
      }
  });

  this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
          labels: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00"],
          datasets: [
              {
                  label: "My First dataset",
                  fill: false,  
                  lineTension: 0.1,
                  backgroundColor: "rgba(75,192,192,0.4)",
                  borderColor: "rgba(75,192,192,1)",
                  borderCapStyle: 'butt',
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: 'miter',
                  pointBorderColor: "rgba(75,192,192,1)",
                  pointBackgroundColor: "#fff",
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: "rgba(75,192,192,1)",
                  pointHoverBorderColor: "rgba(220,220,220,1)",
                  pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 10,
                  data: [65, 59, 80, 81, 56, 55, 40],
                  spanGaps: false,
              }
          ]
      }

  });
  /**graficas chartjs */
  }

  getmaquinas(){
    console.log("constructor")
    this.dataService.getmaquinas().then(data => {
      this.maquinas=data;
      console.log("estoy en get menu y obtengo los datos del json:");
      console.log(this.maquinas); 
      for (let maquina of this.maquinas.maquinas) {
        console.log(maquina.descripcion,maquina.latitud,maquina.longitud)
        var marker = new L.Marker([maquina.latitud,maquina.longitud]).addTo(this.map)
         //this.map.addLayer(marker);
        .bindPopup(maquina.descripcion);
       }   
    }
    );
  }
/*mapa leaflet*/
  leafletMap(){
    this.map = L.map('mapId', {
      center: this.center,
      zoom: 11.5
    });
   //var position = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
   //var position = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
  var position = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'edupala.com © ionic LeafLet'
    }).addTo(this.map);
    var marker = new L.Marker(this.center).addTo(this.map);
    //this.map.addLayer(marker);
    marker.bindPopup("CI Technologies");
    console.log(this.map)
  }
  /*mapa leaflet*/


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




}
