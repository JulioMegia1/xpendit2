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


  


    


  ionViewDidLoad() {
    console.log('ionViewDidLoad DetallemvPage');
    
    
    
    
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
      chart: {
        showLegend: 0,
        theme: "zune",
        showValues:1,
        exportEnabled:0 //para exportar grafica a png,,pdf etc

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
