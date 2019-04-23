import { Component, NgZone } from "@angular/core";

import * as FusionCharts from "fusioncharts";

@Component({
  selector: 'historico',
  templateUrl: 'historico.html'
})
export class HistoricoComponent {
  
  dataSource: any;
  type: string;
  width: string;
  height: string;
  constructor() {
    this.type = "timeseries";
    this.width = "100%";
    this.height = "400";

    // This is the dataSource of the chart
    this.dataSource = {
      chart: {
        showlegend: 0
      },
      caption: {
        text: "Daily Visitors Count of a Website"
      },
      theme: "zune",
      yaxis: [
        {
          plot: {
            value: "Daily Visitors",
            type: "column"
          },
          format: {
            suffix: "k"
          },
          title: "Daily Visitors Count"
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
      "https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/column-chart-with-time-axis-data.json"
    ).then(jsonify);
    var schemaFetch = fetch(
      "https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/column-chart-with-time-axis-schema.json"
    ).then(jsonify);

    Promise.all([dataFetch, schemaFetch]).then(res => {
      const [data, schema] = res;
      // First we are creating a DataStore
      const fusionDataStore = new FusionCharts.DataStore();
      // After that we are creating a DataTable by passing our data and schema as arguments
      const fusionTable = fusionDataStore.createDataTable(data, schema);
      // Afet that we simply mutated our timeseries datasource by attaching the above
      // DataTable into its data property.
      this.dataSource.data = fusionTable;
    });
  }

  ngOnInit() {}
}