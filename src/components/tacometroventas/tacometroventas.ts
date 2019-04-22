import { Component } from '@angular/core';

/*servicios*/
import { CIprovider } from "../../providers/data/data";
import { MvserviceProvider } from "../../providers/mvservice/mvservice";

@Component({
  selector: 'tacometroventas',
  templateUrl: 'tacometroventas.html'
})
export class TacometroventasComponent {

  height = 150;
  type = "angulargauge";
  dataFormat = "json";
  dataSource:any;
  data = {
    chart: {
      caption: "Ventas",
      lowerlimit: "0",
      upperlimit: "100",
      showvalue: "1",
      //numbersuffix: "%",
      numberprefix:"$",
      theme: "fusion",
      showtooltip: "0"
    },
    colorrange: {
      color: [
        {
          minvalue: "0",
          maxvalue: "50",
          code: "#F2726F"
        },
        {
          minvalue: "50",
          maxvalue: "75",
          code: "#FFC533"
        },
        {
          minvalue: "75",
          maxvalue: "100",
          code: "#62B58F"
        }
      ]
    },
    dials: {
      dial: [
        {
          value: "81"
        }
      ]
    }
  };

  grafica:any;
  idmaquina:any;
  
  constructor(public ciService:CIprovider, public mvservice:MvserviceProvider) {
    console.log('Hello TacometroventasComponent Component');
  
  }


  ngOnInit()  {
    this.idmaquina=this.ciService.getIdmaquina(); //obtener el tipo de usuario
    console.log("TENGO EL ID DE LA MAQUINA" + this.idmaquina)
    console.log('Hello TacometroproductosComponent Component');
    this.getgrafica(this.idmaquina)
    this.dataSource=this.data;
   
  }

  getgrafica(idmaquina){
    this.mvservice.tacometros(idmaquina).then(result=>{
    this.grafica= result;
    console.log(this.grafica);
    this.data.dials.dial[0].value=this.grafica[1].valor;//valor del indicador 
    console.log('valor del '+this.data.dials.dial[0].value+'valor del '+this.grafica[0].valor);

    this.data.chart.upperlimit=this.grafica[1].maximo;//
    let tercio:any;
    tercio=parseInt(this.grafica[1].maximo)/3;

    this.data.colorrange.color[0].maxvalue=tercio;//bien
    this.data.colorrange.color[1].minvalue=tercio;
    
    tercio=tercio*2;
    this.data.colorrange.color[1].maxvalue=tercio;
    this.data.colorrange.color[2].minvalue=tercio;

    tercio=tercio*3;
    this.data.colorrange.color[2].maxvalue=tercio;

},(err)=>{
  console.log(err);
}
);
}

 
}
