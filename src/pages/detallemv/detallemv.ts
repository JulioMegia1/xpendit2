import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

/*paginas*/
import { ActualizamvPage } from "../actualizamv/actualizamv";

/*servicios*/
import { DataServiceProvider } from '../../providers/data-service/data-service';
/*servicios*/

/*chartjs*/
import { Chart } from 'chart.js';
/*chartjs*/


/*fusioncharts*/
import * as FusionCharts from 'fusioncharts';
/**fusioncharts*/






@IonicPage()
@Component({
  selector: 'page-detallemv',
  templateUrl: 'detallemv.html',
})
export class DetallemvPage {

  maquinas :any;
  maquinasCI:any;
  seleccion:any;

  alcancia:any="$";
  monedero:any="$";
  billetero:any="$";

  alertas:any;

  // grafica producto-inventario
  @ViewChild('prodInv') RprodInv;
  prodsInv: any;
// grafica producto-inventario



//grafica venta x hora
@ViewChild('vhora') VHora;
ventahora: any;
//grafica venta x hora

//grafica global
@ViewChild('vglobal') VGlobal;
ventaglobal: any;
//grafica global

 /*grafica fusioncharts*/
 dataSource: any;
 type: string;
 width: string;
 height: string;
 esquema:any;
 datos:any;
 
/*grafica fusioncharts*/


  


 

  constructor(public navCtrl: NavController, public navParams: NavParams,public dataService:DataServiceProvider,public toastCtrl: ToastController) {
    this.getmaquinas();
    
    
    this.funcionglobalhistorica();
    this.fetchData();
   
  }


  FuncionprodInventario(){

    let datos=[0,54,67,73,40,54,67,73,40,54,67,73,54,67,73,40,54,67,73,40,54,67,73];
    let etiquetas=["1900", "1950", "1999", "2050","1900", "1950", "1999", "2050","1900", "1950", "1999", "2050", "1950", "1999", "2050","1900", "1950", "1999", "2050","1900", "1950", "1999", "2050"];
    let chartOptions = {
      title: {
        display: false,
      },
      legend: {
          display: false,
    
        },
        scales: {
          xAxes: [{
            gridLines: {
              display: false, 
              color: "black"
            },
            scaleLabel: {
              display: false,
            }
          }],
          yAxes: [{
            
            scaleLabel: {
              display: true,
              labelString: "Existencia",
              fontColor: "red"
            }
          }]
        },
        
      responsive: true, // Instruct chart js to respond nicely.
      maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height 
    };
    Chart.defaults.global.defaultFontColor = '#1b3861';
      this.prodsInv = new Chart(this.RprodInv.nativeElement, {
        type: 'bar',
        data: {
          labels:etiquetas,
          datasets: [{
              label: "Europe",
              type: "line",
              borderColor: "#1b3861",
              data: datos,
              fill: false
            }, {
              label: "Europe",
              type: "bar",
              backgroundColor: "green",
              data: datos,
            }, 
          ]
        },
        options:chartOptions
    });
    }



    Funcionventahora(){

      let datos=[65, 59, 80, 81, 56, 55, 40,65, 59, 80, 81, 56, 55, 40];
      let etiquetas=["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00","07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00"];
      let chartOptions = {
        legend: {
            display: false, //parte superior indentificador de la linea
            //fontColor: 'black'
      
          },scales: {
            xAxes: [{
              gridLines: {
                display: false, 
                color: "black"
              },
              scaleLabel: {
                display: false,
              }
            }],
            yAxes: [{
              
              scaleLabel: {
                display: true,
                labelString: "Venta",
                fontColor: "green"
              }
            }]
          },tooltips: {
            //intersect:true,
            cornerRadius: 20,
            caretSize: 20,
            xPadding: 20,
            yPadding: 10,
            backgroundColor: '#1b3861',
            titleFontStyle: 'normal',
            titleMarginBottom: 15
          },
        responsive: true, // Instruct chart js to respond nicely.
        maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height 
      };
      
      //Chart.defaults.global.defaultFontColor = 'black';
      
        this.ventahora = new Chart(this.VHora.nativeElement, {
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
                      pointBorderColor: "#18703d",
                      pointBackgroundColor: "#18703d",
                      pointBorderWidth: 1,
                      pointHoverRadius: 5,
                      pointRadius: 3,
                      pointHoverBackgroundColor: "#18703d",
                      pointHoverBorderColor: "#18703d",
                      pointHoverBorderWidth: 2,
                      
                      pointHitRadius: 10,
                      data: datos ,
                      spanGaps: false,
                  }
              ]
          },
          options:chartOptions
      
      });
      
      
      }



      Funcionventaglobal(){

        let datos=[65, 59, 80, 81, 56, 55, 40,65, 59, 80, 81, 56, 55, 40];
        let etiquetas=["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00","07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00"];
        let chartOptions = {
          legend: {
              display: false, //parte superior indentificador de la linea
              //fontColor: 'black'
        
            },scales: {
              xAxes: [{
                gridLines: {
                  display: false, 
                  color: "black"
                },
                scaleLabel: {
                  display: false,
                }
              }],
              yAxes: [{
                
                scaleLabel: {
                  display: true,
                  labelString: "Venta",
                  fontColor: "green"
                }
              }]
            },tooltips: {
              //intersect:true,
              cornerRadius: 20,
              caretSize: 20,
              xPadding: 20,
              yPadding: 10,
              backgroundColor: '#1b3861',
              titleFontStyle: 'normal',
              titleMarginBottom: 15
            },
          responsive: true, // Instruct chart js to respond nicely.
          maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height 
        };
        
        //Chart.defaults.global.defaultFontColor = 'black';
        
          this.ventaglobal = new Chart(this.VGlobal.nativeElement, {
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
                        pointBorderColor: "#18703d",
                        pointBackgroundColor: "#18703d",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointRadius: 3,
                        pointHoverBackgroundColor: "#18703d",
                        pointHoverBorderColor: "#18703d",
                        pointHoverBorderWidth: 2,
                        
                        pointHitRadius: 10,
                        data: datos ,
                        spanGaps: false,
                    }
                ]
            },
            options:chartOptions
        
        });
        
        
        }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetallemvPage');
    this.FuncionprodInventario();
    this.Funcionventahora();
    this.Funcionventaglobal();
    
  }
  getmaquinas(){
    console.log("constructor")
    this.dataService.getmaquinas().then(data => {
      this.maquinas=data;
      console.log("estoy en get menu y obtengo los datos del json:");
      console.log(this.maquinas.maquinas); 
       this.maquinasCI=this.maquinas.maquinas;
      console.log(this.maquinasCI[0].descripcion)
      this.seleccion=this.maquinasCI[0].descripcion;  


      this.alertas=this.maquinasCI[0].alertas;
      console.log(this.alertas);
      this.alcancia=this.alcancia.concat(this.maquinasCI[0].alcancia);
      this.monedero=this.monedero.concat(this.maquinasCI[0].monedero);
      this.billetero=this.billetero.concat(this.maquinasCI[0].billetero);



      this.alarma();
      


      
    }
    );
       
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
      caption: {
   text:'Venta Global Histórica',
        
      },
      //subcaption: {
        //text: 'Analysis of O₂ Concentration and Surface Temperature'
      //},
      yAxis: [
        {
          plot: 'venta',
          // min: '3',
          // max: '6',
          title: 'Venta',
          
           format: {
             "prefix": "$",
             "suffix": ".00"
           }
       
        },
        {
          plot: {
            value: 'Productos',
            type: 'column'
          },
          
          // min: '18',
          // max: '30',
          title: 'Productos\nVendidos'
        }
      ]
    };
 }
 
 
 /*fusion charts*/
 fetchData() {
  this.dataService.getschema2().then(esquema => {
    this.esquema=esquema;
    console.log("estoy en get menu y obtengo los datos del json:");
    console.log(this.esquema); 
    this.dataService.getdata2().then(datos => {
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

 alarma(){
    let toast = this.toastCtrl.create({
      message:this.alertas,
      showCloseButton: true,
      closeButtonText: 'Ok',
      duration: 3000,
      position: 'top',
      cssClass:'toastCustom'
    });
    toast.present();
    
}


actInfo(){
  this.navCtrl.push(ActualizamvPage);
  
}

  



  

}
