import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/*servicios*/
import { SelectserviceProvider } from "../../providers/selectservice/selectservice";

@IonicPage()
@Component({
  selector: 'page-catalarmas',
  templateUrl: 'catalarmas.html',
})
export class CatalarmasPage {
  seleccion:any;

  prioridades:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public selectService: SelectserviceProvider) {
  this.SelectPrioridadAlarmas();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CatalarmasPage');
  }

  SelectPrioridadAlarmas(){
    this.selectService.selectprioridadalarmas().then(result=>{
       this.prioridades= result;
       console.log(result);
       },(err)=>{
         console.log(err);
       }
       );
      }

}
