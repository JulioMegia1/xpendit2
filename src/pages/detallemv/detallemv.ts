import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/*servicios*/
import { DataServiceProvider } from '../../providers/data-service/data-service';
/*servicios*/

/*chartjs*/
import { Chart } from 'chart.js';
/*chartjs*/



@IonicPage()
@Component({
  selector: 'page-detallemv',
  templateUrl: 'detallemv.html',
})
export class DetallemvPage {

  maquinas :any;
  maquinasCI:any;
  seleccion:any;

  // grafica producto-inventario
  @ViewChild('prodInv') RprodInv;
  prodsInv: any;
// grafica producto-inventario
  


 

  constructor(public navCtrl: NavController, public navParams: NavParams,public dataService:DataServiceProvider,) {
    this.getmaquinas();
   
  }


  FuncionprodInventario(){

    let datos=[0,54,67,73,40,54,67,73,40,54,67,73,54,67,73,40,54,67,73,40,54,67,73];
    let etiquetas=["1900", "1950", "1999", "2050","1900", "1950", "1999", "2050","1900", "1950", "1999", "2050", "1950", "1999", "2050","1900", "1950", "1999", "2050","1900", "1950", "1999", "2050"];
    let chartOptions = {
      title: {
        display: false,
      },
      legend: {
          display: false,
    
        },
      responsive: true, // Instruct chart js to respond nicely.
      maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height 
    };
    Chart.defaults.global.defaultFontColor = '#1b3861';
      this.prodsInv = new Chart(this.RprodInv.nativeElement, {
        type: 'bar',
        data: {
          labels:etiquetas,
          datasets: [{
              label: "Europe",
              type: "line",
              borderColor: "#1b3861",
              data: datos,
              fill: false
            }, {
              label: "Europe",
              type: "bar",
              backgroundColor: "green",
              data: datos,
            }, 
          ]
        },
        options:chartOptions
    });
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetallemvPage');
    this.FuncionprodInventario();
    
  }
  getmaquinas(){
    console.log("constructor")
    this.dataService.getmaquinas().then(data => {
      this.maquinas=data;
      console.log("estoy en get menu y obtengo los datos del json:");
      console.log(this.maquinas.maquinas); 
       this.maquinasCI=this.maquinas.maquinas;
      console.log(this.maquinasCI[0].descripcion)
      this.seleccion=this.maquinasCI[0].descripcion;
      
     
  
          
    }
    );





    
  }


  



  

}
