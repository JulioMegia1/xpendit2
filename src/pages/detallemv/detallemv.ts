import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';


/*paginas*/
import { ActualizamvPage } from "../actualizamv/actualizamv";

/*servicios*/
//import { DataServi ceProvider } from '../../providers/data-service/data-service'; BORRAR
import { MvserviceProvider } from "../../providers/mvservice/mvservice";
import { SelectserviceProvider } from "../../providers/selectservice/selectservice";

/*fusioncharts*/
import * as FusionCharts from 'fusioncharts';
import { SelectorListContext } from '@angular/compiler';

@IonicPage()
@Component({
  selector: 'page-detallemv',
  templateUrl: 'detallemv.html',
})
export class DetallemvPage {

  maquinas :any;//obtiene todas las maquinas
  seleccion:any; //obtiene elid de la maquina seleccionada
  alarmas:any;  //obtiene las alarmas de la maquina seleccionada
  contables:any//obtiene los contables de la maquina seleccionada
  reinicia:any//reincia el inventario y muestra msj
  tacometros:any;//obtiene los tacometros
  inventario:any;
  graficahora:any;
  graficahoraacumulada:any;
  historicaventa:any;
  historicaunidad:any;

 /*grafica fusioncharts*/
 dataSource: any;
 type: string;
 width: string;
 height: string;
 esquema:any;
 datos:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,
    //public data Service:DataServiceProvider, BORRAR
    public toastCtrl: ToastController,public mvservice:MvserviceProvider,public selectprovider:SelectserviceProvider
    ) {
    
    //this.getmaquinas();
  
     
  

    // this.getmaquinasid();
    
    
    // this.funcionglobalhistorica();
    // this.fetchData();
   
  }

  ionViewCanEnter() //cuando la paginas esta activa
  {
    this.getmaquinas();
    
    // this.getalarmas(this.seleccion);
    // this.gettacometros(this.seleccion);
    // this.getcontables(this.seleccion);
    // this.getgraficahora(this.seleccion);
    // this.getinventario(this.seleccion);
  }


  getmaquinas(){
    console.log("constructor")
    let tipousuario="admin"//CAMBIAR y PONER EL USUARIO QUE SEA CAMBIAR IMPORTANTE
    this.mvservice.maquinas(tipousuario).then(data => {
      this.maquinas=data;
      console.log("estoy en get menu y obtengo los datos del json:");
      console.log(this.maquinas); 
      this.seleccion=this.maquinas[0].idMaquina;  //ASINGNA LA PRIMER MAQUINA COMO LA ELEGIDA
      console.log(this.seleccion);

    this.gettacometros(this.seleccion);
    this.getalarmas(this.seleccion);
    this.getcontables(this.seleccion);
    this.getgraficahora(this.seleccion);
    this.getgraficahoraacumulada(this.seleccion);
    this.getinventario(this.seleccion);
    this.gethistoricaventa(this.seleccion);
    this.gethistoricaunidad(this.seleccion)
    }
    );
  }

  getalarmas(seleccion){
    
  this.mvservice.alarmas(seleccion).then(result=>{
    this.alarmas= result;
    this.alarmas=this.alarmas.value;
    console.log(result);
    this.alarma();
    },(err)=>{
      console.log(err);
    }
    );
  }

  getinventario(seleccion){
    this.mvservice.inventario(seleccion).then(result=>{
      this.inventario= result;
      console.log(result);
      },(err)=>{
        console.log(err);
      }
      );
    }

  




  getcontables(seleccion){
  this.mvservice.contables(seleccion).then(result=>{
    this.contables= result;
    console.log(result);
    },(err)=>{
      console.log(err);
    }
    );
  }

  gettacometros(seleccion){
    this.mvservice.tacometros(seleccion).then(result=>{
      this.tacometros= result;
      console.log(result);
      },(err)=>{
        console.log(err);
      }
      );
    }



  confirmareinicioinventario() {
    const confirm = this.alertCtrl.create({
      title: 'Desea Actualizar el inventario de la máquina '+this.seleccion+'?',
      message: '',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.reiniciaInventario(this.seleccion)
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }


  reiniciaInventario(seleccion){
    this.mvservice.reiniciainventario(seleccion).then(result=>{
      this.reinicia= result;
      console.log(result);
      },(err)=>{
        console.log(err);
      }
      );


  }

  getgraficahora(seleccion){
    this.mvservice.ventahoramaquina(seleccion).then(result=>{
      this.graficahora= result;
      console.log(result);
      },(err)=>{
        console.log(err);
      }
      );
    }

    getgraficahoraacumulada(seleccion){
      this.mvservice.ventahoraacumuladamaquina(seleccion).then(result=>{
        this.graficahoraacumulada= result;
        console.log(result);
        },(err)=>{
          console.log(err);
        }
        );
      }

      gethistoricaventa(seleccion){
        this.mvservice.ventamaquinahistoricaventa(seleccion).then(result=>{
          this.historicaventa= result;
          console.log(result);
          },(err)=>{
            console.log(err);
          }
          );
        }

        gethistoricaunidad(seleccion){
          this.mvservice.ventamaquinahistoricaunidad(seleccion).then(result=>{
            this.historicaunidad= result;
            console.log(result);
            },(err)=>{
              console.log(err);
            }
            );
          }




  // getmaquinasid(){
  //   this.selectprovider.selectmaquinas().then(result=>{
  //     this.seleccion=result;
  //     console.log(result);
  //     },(err)=>{
  //       console.log(err);
  //     }
  //     );
  // }

  

  


  ionViewDidLoad() {
    console.log('ionViewDidLoad DetallemvPage');
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
//  fetchData() {
//   this.dataService.getschema2().then(esquema => {
//     this.esquema=esquema;
//     console.log("estoy en get menu y obtengo los datos del json:");
//     console.log(this.esquema); 
//     this.dataService.getdata2().then(datos => {
//       this.datos=datos;
//       console.log(this.datos)
//     Promise.all([this.datos, this.esquema]).then(res => {
//     const data = res[0];
//     const schema = res[1];
//     // First we are creating a DataStore
//     const fusionDataStore = new FusionCharts.DataStore();
//     // After that we are creating a DataTable by passing our data and schema as arguments
//     const fusionTable = fusionDataStore.createDataTable(data, schema);
//     // Afet that we simply mutated our timeseries datasource by attaching the above
//     // DataTable into its data property.
//     this.dataSource.data = fusionTable;
//   });
// }
//   );
// }
// );
//  }

 alarma(){
   
    let toast = this.toastCtrl.create({
      message:this.alarmas,
      
      
      //message:"hola\njulio",
      showCloseButton: true,
      closeButtonText: 'Ok',
      duration: 3000,
      position: 'top',
      cssClass:'toastCustom'
    });
    toast.present();
    
}


actualizarInfoRieles(){
  
  this.navCtrl.push(ActualizamvPage,{"seleccion":this.seleccion});
  
}

}
