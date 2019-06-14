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
      "caption": "Venta x Máquina",
      "captionFontSize": "18",
       "captionFontBold": "1",
      //"subcaption": "For a net-worth of $1M",
      "showvalues": "1",
      "showpercentintooltip": "0",
      "showToolTip": "0",
      "numberprefix": "$",
      "enablemultislicing": "0",
      "legendposition": "bottom",
      "showlegend": "1",
      "formatnumberscale": "0",
      "showpercentvalues": "0",
      "legendIconScale": "1",


      "legendItemFontSize": "10",
      "legendItemFontBold": "0",
      "valueFontSize": "10",



      
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
    "data": null
  };

  grafica:any;
  usuario:any;

  total:number;
  logMessage = '% de venta de cada máquina';

  constructor(private zone:NgZone,public ciService:CIprovider, public mvservice:MvserviceProvider) {

    console.log('Hello GraficapieComponent Component');
    this.usuario=this.ciService.getUsuario(); //obtener el usuario
    this.dataSource=this.data; //
    this.getgrafica(this.usuario); //obtener datos de la grafica
   
  }

  getgrafica(usuario){
    this.mvservice.graficapie(usuario).then(result=>{
    this.grafica= result;
    if(this.grafica.puntos==null || this.grafica.puntos=="" || this.grafica.puntos==[])
    {  
      console.log("no hago nada")
    }
    else{
      this.data.data=this.grafica.puntos;
      //this.data.chart.caption="Venta por Máquina";
      console.log(result);
      let myData = this.data.data;
      console.log(myData)
      this.total = 0;
      // Calculate the sum of all values
      for (let i = 0; i < myData.length; i++) 
      {
          this.total += Number(myData[i].value);
      }   
      console.log(this.total)
    }
    },(err)=>{
      console.log(err);
    }
    );
}

events = {
    dataPlotClick: this.getPercentValue()
}

getPercentValue() {
  return (eve,  arg) => {
    this.zone.run(() => {
      console.log(eve)
      console.log(arg)

      let value = (arg.value / this.total * 100).toFixed(2);
      console.log(value)
      this.logMessage = "La venta de " + arg.categoryLabel + " es  " + value + "% del total";
    })
  }
}




updateData(){
  this.getgrafica(this.usuario); //obtener datos de la grafica
}




}
