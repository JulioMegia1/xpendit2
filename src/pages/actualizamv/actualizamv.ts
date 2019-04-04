import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataServiceProvider } from "../../providers/data-service/data-service";


@IonicPage()
@Component({
  selector: 'page-actualizamv',
  templateUrl: 'actualizamv.html',
})
export class ActualizamvPage {

  maquinas:any;
  rielexistencias:any;
  rielproductos:any;
  rielprecios:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public dataService:DataServiceProvider) 
  {
    this.obtenermaquinas();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActualizamvPage');
  }

  obtenermaquinas(){

    this.dataService.getmaquinas().then(datos => {
    this.maquinas=datos;
    console.log(this.maquinas.maquinas[0].existencias);
    this.rielexistencias=this.maquinas.maquinas[0].existencias;//el 0 es de la maqunina 0
    console.log(this.rielexistencias);
    this.rielproductos=this.maquinas.maquinas[0].productos;
    this.rielprecios=this.maquinas.maquinas[0].precios;
   
    
});
}


}
