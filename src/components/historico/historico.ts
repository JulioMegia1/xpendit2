import { Component, NgZone } from "@angular/core";

import * as FusionCharts from "fusioncharts";

/*servicios*/
import { CIprovider } from "../../providers/data/data";
import { MvserviceProvider } from "../../providers/mvservice/mvservice";
import { DataServiceProvider } from '../../providers/data-service/data-service'; //datos locales de prueba


@Component({
  selector: 'historico',
  templateUrl: 'historico.html'
})
export class HistoricoComponent {
 
  "width" = "100%";
  height = 400;
  type = "timeseries";
  dataSource: any;
  data={
    data: null,
       chart: {
         showLegend: 0,
         formatnumberscale: "0",
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


  esquema:any;
  grafica:any;
  
  usuario:any;
 
  constructor(public ciService:CIprovider, public mvservice:MvserviceProvider,public dataService:DataServiceProvider) {

 
    this.usuario=this.ciService.getTipoUsuario(); //obtener el tipo de usuario
    this.dataSource=this.data; //
    // this.getgrafica(this.usuario); //obtener datos de la grafica
    this.fetchData();
  }


  fetchData() {
    this.dataService.getschema().then(esquema => {
      this.esquema=esquema;
      console.log("estoy en get menu y obtengo los datos del json:");
      console.log(this.esquema); 
      this.mvservice.graficahistorica(this.usuario).then(result => {
        this.grafica= result;
        if(this.grafica.puntos==null || this.grafica.puntos=="" || this.grafica.puntos==[])
        {  
          console.log("no hago nada")
    
        }
        else{
        
    let a=this.grafica.puntos

     let b=[];
    for(let i =0;i<a.length;i=i+1){
      b.push([a[i].label,parseFloat(a[i].value)])
    }

      Promise.all([b, this.esquema]).then(res => {
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
  }
    );
  }
  );
  }


//   getgrafica(usuario){
//     this.mvservice.graficahistorica(usuario).then(result=>{
//     this.grafica= result;
//     let a=this.grafica.puntos

//      let b=[];
//     for(let i =0;i<a.length;i=i+1){
//       this.b.push([a[i].label,parseFloat(a[i].value)])
//     }

   
//     console.log(result);
//     console.log(this.b);
    

//   },(err)=>{
//     console.log(err);
//   }
//   );
// }

  ngOnInit() {}
}