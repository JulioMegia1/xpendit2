import { Component, NgZone } from '@angular/core';
/*servicios*/
import { CIprovider } from "../../providers/data/data";
import { MvserviceProvider } from "../../providers/mvservice/mvservice";

@Component({
  selector: 'graficapie',
  templateUrl: 'graficapie.html'
})
export class GraficapieComponent {
  "width" = "100%";
  height = 400;
  type = 'pie3d';
  dataFormat = 'json';
  // dataSource = data;
  dataSource:any;
  data = {
    "chart": {
      "caption": "Venta x Maquina",
      //"subcaption": "For a net-worth of $1M",
      "showvalues": "1",
      "showpercentintooltip": "0",
      "numberprefix": "$",
      "enablemultislicing": "1",
      "legendposition": "right",
      "showlegend": "1",
      "showpercentvalues": "1",
      "captionpadding": "0",
      "legendcaption": "Máquinas: ",
      "legendAllowDrag": "1",
      "bgcolor": "#ffffff",
      "legendscrollbgcolor": "#ffffff",
      "legendBgColor": "#fff",
      "legendBorderColor": "#ffffff",
      "legendBorderThickness": "0",
      
      "theme": "fusion"
    },
    "data": "null"
  };

  grafica:any;
  usuario:any;

  total:number;
  logMessage = '% de venta de cada máquina';

  

  constructor(private zone:NgZone,public ciService:CIprovider, public mvservice:MvserviceProvider) {

    console.log('Hello GraficapieComponent Component');
    this.usuario=this.ciService.getTipoUsuario(); //obtener el tipo de usuario
    this.dataSource=this.data; //
    this.getgrafica(this.usuario); //obtener datos de la grafica
    let myData = this.dataSource.data;

        this.total = 0;

        // Calculate the sum of all values
        for (let i = 0; i < myData.length; i++) {
            this.total += Number(myData[i].value);
        }
   
  }


  getgrafica(usuario){
    this.mvservice.graficapie(usuario).then(result=>{
    this.grafica= result;
    this.data.data=this.grafica.puntos;
    this.data.chart.caption=this.grafica.titulo;
    console.log(result);
  },(err)=>{
    console.log(err);
  }
  );
}

  events = {
    dataPlotRollOver: this.getPercentValue()
}

getPercentValue() {
  return (eve,  arg) => {
      this.zone.run(() => {
          
          let value = (arg.value / this.total * 100).toFixed(2);
          this.logMessage = "La venta de " + arg.categoryLabel + " es  " + value + "% del total";
      })
  }
}

}
