import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
/*servicios*/
import { DataServiceProvider } from "../../providers/data-service/data-service";


@IonicPage()
@Component({
  selector: 'page-catusuarios',
  templateUrl: 'catusuarios.html',
})
export class CatusuariosPage {

  usuarios:any; 
  searchQuery: string = '';
  items: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public dataservice:DataServiceProvider) {
    this.getusuarios();
    this.initializeItems();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CatusuariosPage');
//    this.getusuarios();
    
  }

  getusuarios(){
  console.log("constructor")
  this.dataservice.getcatalogousuarios().then(data => {
    this.usuarios=data;
    console.log("estoy en get menu y obtengo los datos del json:");
    console.log(this.usuarios); 
     
  }
  );
}


initializeItems() {
  this.items = this.usuarios;
}

getItems(ev: any) {
  // Reset items back to all of the items
  this.initializeItems();

  // set val to the value of the searchbar
  const val = ev.target.value;

  // if the value is an empty string don't filter the items
  if (val && val.trim() != '') {
    this.items = this.items.filter((item) => {
      return (item.Nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
    })
  }
}

}
