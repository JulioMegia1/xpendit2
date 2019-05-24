import { Component, } from '@angular/core';
import * as FusionCharts from 'fusioncharts';

/*servicios*/
import { CIprovider } from "../../providers/data/data";
import { MvserviceProvider } from "../../providers/mvservice/mvservice";


@Component({
  selector: 'historicodetalleproducto',
  templateUrl: 'historicodetalleproducto.html'
})
export class HistoricodetalleproductoComponent {

  "width" = "100%";
  height = 400;
  type = "timeseries";
  dataSource: any;
  data={
    // Initially data is set as null
    data: null,
    "chart": {
      "showLegend": "0"
  },
    caption: {
      text: 'Histórico de Venta y producto'
    },
    // subcaption: {
    //   text: 'Analysis of O₂ Concentration and Surface Temperature'
    // },
    yAxis: [
      {
        plot: {
          value:'Venta',
          type:"line"
      },
        // min: '3',
        // max: '6',
        title: 'Venta'
      },
      {
        plot: {
          value:'Producto',
          type:"column"
        // min: '18',
        // max: '30',
      },
        title: 'Producto'
      }
    ]
  };

  idmaquina:any;
  esquema:any;
  seleccionproducto:any;

 fusionDataStore;


  constructor(public ciService:CIprovider, public mvservice:MvserviceProvider) {
    console.log('Hello HistoricodetalleproductoComponent Component');
    this.idmaquina=this.ciService.getIdmaquina(); //obtener el id de la  maquina
    this.seleccionproducto=this.ciService.getIdProducto();
    // This is the dataSource of the chart
    this.dataSource = this.data;
    this.fetchData();
  
  }

  fetchData() {
    this.ciService.getschema2().then(esquema => {
    this.esquema=esquema;
    console.log("estoy en get menu y obtengo los datos del json:");
    console.log(this.esquema); 
    this.mvservice.historicaunidad(this.idmaquina,this.seleccionproducto).then(result => {
      let unidades;

      unidades= result;
    this.mvservice.historicaventa(this.idmaquina,this.seleccionproducto).then(result => {
      let ventas;
      ventas= result;
      
      let a =ventas.puntos;
      let b=unidades.puntos;
      console.log(a)
      console.log(b)
      if(a==null  || b==null){
        console.log("error")
      }
      else{
      console.log(a)
      console.log(b)
      let c=[];
      for(let i=0;i<a.length;i=i+1){
        c.push([a[i].label,parseFloat(a[i].value),parseInt(b[i].value)])
      }
      console.log(c);
      



  Promise.all([c, this.esquema]).then(res => {
    var data = res[0];
    var schema = res[1];
    // First we are creating a DataStore
 
     this.fusionDataStore = new FusionCharts.DataStore();
     
     console.log()
    // var fusionDataStore2 = new FusionCharts.render();
    
    console.log(this.fusionDataStore)
    // After that we are creating a DataTable by passing our data and schema as arguments
    var fusionTable = this.fusionDataStore.createDataTable(data, schema);
    console.log(fusionTable)
    // Afet that we simply mutated our timeseries datasource by attaching the above
    // DataTable into its data property.
    this.dataSource.data = fusionTable;
  });}
}
);
}
);
}
);
}

ngOnInit() {
  
}

updatedata(){
  this.idmaquina=this.ciService.getIdmaquina(); //obtener el id de la  maquina
  this.seleccionproducto=this.ciService.getIdProducto();
  // this.dataSource = this.data;
  this.fetchData();
  console.log("actualice historico")
  // this.fusionDataStore.render() 

}

}
