import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DetallemvPage } from "../detallemv/detallemv";

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
*/
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
  @ViewChild('hora') Vhora;
  @ViewChild('maquina') Vmaquina;
  @ViewChild('global') Vglobal;
    VentaHora: any;
    ventasmaquina: any;
    ventaglobal: any;
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
        text: 'Venta Global Historica($)'
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
    this.Funcionventahora();
    this.funcionventamaquina();
    this.funcionventaglobal();

  

 

  
  /**graficas chartjs */
}

Funcionventahora(){

let datos=[65, 59, 80, 81, 56, 55, 40,65, 59, 80, 81, 56, 55, 40];
let etiquetas=["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00","07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00"];
let chartOptions = {
  legend: {
      display: false,

    },
  responsive: true, // Instruct chart js to respond nicely.
  maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height 
};
Chart.defaults.global.defaultFontColor = 'blue';
  this.VentaHora = new Chart(this.Vhora.nativeElement, {
    type: 'line',
    data: {
        labels:etiquetas,
        datasets: [
            {
                label: "Venta x Hora",
                display: false,
                fill: false,  
                lineTension: 0.1,
                backgroundColor: "rgba(24,112,61,0.4)",
                borderColor: "rgba(24,112,61,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(27,56,97,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(27,56,97,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: datos ,
                spanGaps: false,
            }
        ]
    },
    options:chartOptions

});


}

funcionventamaquina(){
let datos=[12, 19, 3, 5, 2, 3];
let etiquetas=["IPQ botana", "IPQ Refresco", "SAFRAN I", "SAFRAN II", "CENTA", "KIWIT"];
let configuraciones= {
  legend: {
     display: true,
     position: 'right',
     
   },
 //responsive: true, // Instruct chart js to respond nicely.
 //maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height 
};

Chart.defaults.global.defaultFontColor = 'blue';
  this.ventasmaquina = new Chart(this.Vmaquina.nativeElement, {
    type: 'pie',
    data: {
        labels: etiquetas,
        datasets: [{
            label: '# of Votes',
            data: datos,
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
    },
    options:configuraciones

});

}

funcionventaglobal(){
let datos=[0, 40, 48, 81, 56, 55, 40,65, 59, 80, 81, 56, 55, 40,56, 55, 40,65, 59, 80, 81, 56, 55, 40];
let etiquetas=["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00","07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00","20:00", "21:00", "22:00", "23:00"];
let chartOptions = {
  legend: {
      display: false,

    },
  responsive: true, // Instruct chart js to respond nicely.
  maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height 
};

Chart.defaults.global.defaultFontColor = 'blue';
  this.ventaglobal = new Chart(this.Vglobal.nativeElement, {
    type: 'line',
    data: {
        labels: etiquetas,
        datasets: [
            {
                label: "Venta Global",
                fill: false,  
                lineTension: 0.1,
                backgroundColor: "rgba(24,112,61,0.4)",
                borderColor: "rgba(24,112,61,1)",
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
                data: datos,
                spanGaps: false,
            }
        ]
    },
    options:chartOptions
    

});

}


ngAfterViewInit()  {
let interval = setInterval(()=> {
  console.log("hello");
  this.getmaquinas();
  this.Funcionventahora();
  this.funcionventamaquina();
  this.funcionventaglobal();


  
},3000);

  
}


  getmaquinas(){
    console.log("constructor")
    this.dataService.getmaquinas().then(data => {
      this.maquinas=data;
      console.log("estoy en get menu y obtengo los datos del json:");
      console.log(this.maquinas); 
      for (let maquina of this.maquinas.maquinas) {
        console.log(maquina.descripcion,maquina.latitud,maquina.longitud,maquina.iconourl)
        
        var punto = L.icon({
          iconUrl: maquina.iconourl,
          iconSize: [30, 30], // size of the icon
          iconAnchor: [20, 90],

        })
        var marker = new L.Marker([maquina.latitud,maquina.longitud],{icon:punto}).addTo(this.map)
         //this.map.addLayer(marker);
        .bindPopup(maquina.descripcion + " | " + maquina.alertas);

        marker.on('mouseover', function (e) {
          this.openPopup();
        });
        marker.on('mouseout', function (e) {
          this.closePopup();
        });

        marker.on('click', function (e) {
          console.log("diste click aqui");
          this.navCtrl.push(DetallemvPage);
          
          //disable mouseout behavior here?
        });
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

}
  /*mapa leaflet*/


  ira(){
    this.navCtrl.push(DetallemvPage)
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
}