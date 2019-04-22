import { Component } from '@angular/core';

/*servicios*/
import { DatosUsuarioProvider } from "../../providers/data/data";
import { MvserviceProvider } from "../../providers/mvservice/mvservice";







@Component({
  selector: 'graficaproductosinventario',
  templateUrl: 'graficaproductosinventario.html'
})
export class GraficaproductosinventarioComponent {

  "width" = "100%";
  height = 250;
  type = "mscombi2d";
  dataFormat = "json";
  dataSource:any;
  data = {
    chart: {
      caption: "Productos en inventario",
      //subcaption: "ACME Inc.",
      xaxisname: "Riel",
      syaxisname: "Amount (In USD)",
      //numberprefix: "$",
      exportenabled: "0",
      numvisibleplot:12,
      showValues:1,
      placeValuesInside:0,
      rotateValues:1,
      theme: "zune"
    },
    categories: [
      {
        category:null
      }
    ],
    dataset: [
      {
        //seriesname: "Actual Expenses",
        "valueposition": "ABOVE",
        data: null
      },
      {
        //seriesname: "Budgeted Expenses",
        renderas: "line",
        
        "showvalues": "0",
        data: null
      },
    ]
  }; 

  grafica:any;
  idmaquina:any;
 


  constructor(public servicetipousuario:DatosUsuarioProvider, public mvservice:MvserviceProvider) {
    console.log('Hello GraficaproductosinventarioComponent Component');
    this.idmaquina=this.servicetipousuario.getIdmaquina(); //obtener el tipo de usuario
    this.dataSource=this.data;
    this.getgrafica(this.idmaquina)

  
  }

  getgrafica(idmaquina){
    this.mvservice.inventario(idmaquina).then(result=>{
    this.grafica= result;
    // this.data.data=this.grafica.puntos;
    // this.data.chart.caption=this.grafica.titulo;
    console.log(result);
    let puntos=this.grafica.puntos;
    console.log(puntos);
    console.log(this.listarieles(puntos));
    this.data.categories[0].category=this.listarieles(puntos);
    console.log(this.listavalorrieles(puntos));
    console.log(this.data.categories[0].category)
    this.data.dataset[0].data=this.listavalorrieles(puntos);
    this.data.dataset[1].data=this.listavalorrieles(puntos);
  },(err)=>{
    console.log(err);
  }
  );
  }

  listarieles(puntos){
    let rieles=[];
    for(let i=0;i<puntos.length;i=i+1){
      rieles.push({label:puntos[i].label});
    }return rieles;
  }
  listavalorrieles(puntos){
    let valor=[];
    for(let i=0;i<puntos.length;i=i+1){
      valor.push({value:puntos[i].value});
    }return valor;
  }


  

 

}
