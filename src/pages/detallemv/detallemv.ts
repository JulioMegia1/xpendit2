import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/*servicios*/
import { DataServiceProvider } from '../../providers/data-service/data-service';



@IonicPage()
@Component({
  selector: 'page-detallemv',
  templateUrl: 'detallemv.html',
})
export class DetallemvPage {

  maquinas :any;
  maquinasCI:any;
  seleccion:any;


  


  customPopoverOptions:    { title: string, subTitle: string };

  constructor(public navCtrl: NavController, public navParams: NavParams,public dataService:DataServiceProvider,) {
    this.getmaquinas();
    this.customPopoverOptions = {
      title: '1994 Music',
      subTitle: 'Select your favorite'
    };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetallemvPage');
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
