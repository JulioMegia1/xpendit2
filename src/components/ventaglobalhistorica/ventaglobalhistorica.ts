import { Component } from '@angular/core';

/*servicios*/
import { CIprovider } from "../../providers/data/data";
import { MvserviceProvider } from "../../providers/mvservice/mvservice";

 

@Component({
  selector: 'ventaglobalhistorica',
  templateUrl: 'ventaglobalhistorica.html'
})
export class VentaglobalhistoricaComponent {

  "width" = "100%";
  height = 250;
  type = "scrollline2d";
  dataFormat = "json";
  dataSource:any;

  data = {
    chart: {
      caption: "Venta Global Histórica",
      //subcaption: "(As per government records)",
      showvalues: "1",
      numvisibleplot: "7",
      numberprefix: "$",
      formatnumberscale: "0",
      plottooltext:
        "<b>$label</b> Venta:  <b>$dataValue</b> ",
      theme: "zune",
      flatScrollBars: "0",
    },
    
    categories: [
      {
        category: null
      }
    ],
    dataset: [
      {
        data: null
      }
    ]
  };


  grafica:any; //datos de la gráfica
  usuario:any; //tipo de usuario




  constructor(public ciService:CIprovider, public mvservice:MvserviceProvider) {
    console.log('Hello VentaglobalhistoricaComponent Component');
    this.usuario=this.ciService.getUsuario(); //obtener el usuario
    this.dataSource=this.data; 
    this.getgrafica(this.usuario); //obtener datos de la grafica
  }

  getgrafica(usuario){
    this.mvservice.graficahistorica(usuario).then(result=>{
    this.grafica= result;
   
    console.log(result);
    let puntos=this.grafica.puntos;
 
 
    for (let i=0;i<puntos.length;i=i+1){
          delete (puntos[i].label);
       
          
          
    }
  
    this.mvservice.graficahistorica(usuario).then(result=>{
      this.grafica= result;
      if(this.grafica.puntos==null || this.grafica.puntos=="" || this.grafica.puntos==[])
      {  
        console.log("no hago nada")
  
      }
      else{
      let label=this.grafica.puntos;
  
 
    for (let i=0;i<label.length;i=i+1){
          delete (label[i].value);
       
       
          
          
    }
    console.log(label)
    this.data.categories[0].category=label;
    console.log(puntos);
    this.data.dataset[0].data=puntos;
    
    }}
    )

    
  },(err)=>{
    console.log(err);
  }
  );
  }

 

}
