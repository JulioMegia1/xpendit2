import {
  Component,
  NgZone
} from '@angular/core';
import * as FusionCharts from 'fusioncharts';

@Component({
  selector: 'historicomaquinaproductoventa',
  templateUrl: 'historicomaquinaproductoventa.html'
})
export class HistoricomaquinaproductoventaComponent {
  dataSource: any;
  type: string;
  width: string;
  height: string;
  constructor() {
    this.type = 'timeseries';
    this.width = '100%';
    this.height = '400';
    // This is the dataSource of the chart
    this.dataSource = {
      // Initially data is set as null
      data: null,
      caption: {
        text: 'Historico de Ventas y productos'
      },
      // subcaption: {
      //   text: 'Analysis of O₂ Concentration and Surface Temperature'
      // },
      yAxis: [
        {
          plot: 'O2 concentration',
          // min: '3',
          // max: '6',
          title: 'Venta'
        },
        {
          plot: {
            value:'Surface Temperature',
          // min: '18',
          // max: '30',
          
          type: "column"
        },
        title: 'Producto',
        }
      ]
    };
    this.fetchData();
  }

  // In this method we will create our DataStore and using that we will create a custom DataTable which takes two
  // parameters, one is data another is schema.
  fetchData() {
    var jsonify = res => res.json();
    var dataFetch = fetch(
      'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/plotting-two-variable-measures-data.json'
    ).then(jsonify);
    var schemaFetch = fetch(
      'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/plotting-two-variable-measures-schema.json'
    ).then(jsonify);

    Promise.all([dataFetch, schemaFetch]).then(res => {
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

  ngOnInit() {
    
  }
}