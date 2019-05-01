import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-buscamaquinaproducto',
  templateUrl: 'buscamaquinaproducto.html',
})
export class BuscamaquinaproductoPage {

  items;
  productosmaquina:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController) {

    this.productosmaquina=this.navParams.data.productosmaquina
    console.log(navParams)
    console.log(this.productosmaquina);
    this.initializeItems();
  }

  initializeItems() {
    this.items = this.productosmaquina
  }

  getItems(ev) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.value.toLowerCase().indexOf(val.toLowerCase()) > -1);//PONEMOS item.value ya que de ahi filtrara del JSON 
      /*   
      {
          "label": "11",
         "value": "11) Activia [E:5|F:1|M:6]"
       },
      */
      })
    }
  }

  Cerrarpopover(item){
    console.log("Diste click en "+item);
    this.viewCtrl.dismiss(item);
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuscamaquinaproductoPage');
  }

}
