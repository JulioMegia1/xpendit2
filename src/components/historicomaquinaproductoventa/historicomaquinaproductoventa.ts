import {  Component,  NgZone} from '@angular/core';
import * as FusionCharts from 'fusioncharts';

/*servicios*/
import { CIprovider } from "../../providers/data/data";
import { MvserviceProvider } from "../../providers/mvservice/mvservice";
import { DataServiceProvider } from '../../providers/data-service/data-service'; //datos locales de prueba


@Component({
  selector: 'historicomaquinaproductoventa',
  templateUrl: 'historicomaquinaproductoventa.html'
})
export class HistoricomaquinaproductoventaComponent {
  
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
      text: 'Historico de Ventas y productos'
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
  unidades:any;
  ventas:any;
  constructor(public ciService:CIprovider, public mvservice:MvserviceProvider,public dataService:DataServiceProvider) {
    this.idmaquina=this.ciService.getIdmaquina(); //obtener el id de la  maquina
    // This is the dataSource of the chart
    this.dataSource = this.data;
    this.fetchData();
  }
  
  fetchData() {
      this.dataService.getschema2().then(esquema => {
      this.esquema=esquema;
      console.log("estoy en get menu y obtengo los datos del json:");
      console.log(this.esquema); 
      this.mvservice.ventamaquinahistoricaunidad(this.idmaquina).then(result => {
      this.unidades= result;
      this.mvservice.ventamaquinahistoricaventa(this.idmaquina).then(result => {
        this.ventas= result;
        let a =this.ventas.puntos;
        let b=this.unidades.puntos;
        console.log(a)
        console.log(b)
        let c=[];
        for(let i=0;i<a.length;i=i+1){
          c.push([a[i].label,parseFloat(a[i].value),parseInt(b[i].value)])
        }
        console.log(c);
        



    Promise.all([c, this.esquema]).then(res => {
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
);
  }

  ngOnInit() {
    
  }
}