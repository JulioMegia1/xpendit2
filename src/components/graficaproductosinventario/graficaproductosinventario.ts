import { Component,Input,OnInit } from '@angular/core';

/*servicios*/
import { CIprovider } from "../../providers/data/data";
import { MvserviceProvider } from "../../providers/mvservice/mvservice";


@Component({
  selector: 'graficaproductosinventario',
  templateUrl: 'graficaproductosinventario.html'
})
export class GraficaproductosinventarioComponent implements OnInit{

  @Input() public ciudad :string;;
  text: string;

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
      yaxisminvalue: 0,
      hideZeroPlane:1,
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
 
  constructor(public ciService:CIprovider, public mvservice:MvserviceProvider) {
    console.log('Hello GraficaproductosinventarioComponent Component');
    this.idmaquina=this.ciService.getIdmaquina(); //obtener el id de la maquina
    this.dataSource=this.data;
    this.getgrafica(this.idmaquina)  
  }

  ngOnInit()  {
    // this.text=this.textTouse;
    // console.log(this.model);

  }
  
  getgrafica(idmaquina){
    this.mvservice.inventario(idmaquina).then(result=>{
    this.grafica= result;
    // this.data.data=this.grafica.puntos;
    // this.data.chart.caption=this.grafica.titulo;
    console.log(result);
    if(this.grafica.puntos==null || this.grafica.puntos=="" || this.grafica.puntos==[])
    {  
      console.log("no hago nada")
      this.data.categories[0].category=null;
      this.data.dataset[0].data=null;
      this.data.dataset[1].data=null;

    }
    else{
    


    let puntos=this.grafica.puntos;
    console.log(puntos);
    console.log(this.listarieles(puntos));
    this.data.categories[0].category=this.listarieles(puntos);
    console.log(this.listavalorrieles(puntos));
    console.log(this.data.categories[0].category)
    

  let a=this.listavalorrieles(puntos);
  for(let i=0;i<a.length;i=i+1)
  {
    if(a[i].value<0)
    {
      a[i].value=0
    }
      
  }
  console.log(a)
  
    this.data.dataset[0].data=a;
    this.data.dataset[1].data=a;
}
  
    // this.data.dataset[0].data=this.listavalorrieles(puntos);
    // this.data.dataset[1].data=this.listavalorrieles(puntos);
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

  updatedata(){
    this.idmaquina=this.ciService.getIdmaquina(); //obtener el id de la maquina
    this.dataSource=this.data;
    this.getgrafica(this.idmaquina)  
    console.log("actualice")

  }

}
