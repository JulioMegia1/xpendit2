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
  productosvalue=[];

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController) {
    this.productosmaquina=this.navParams.data.productosmaquina
    console.log(navParams)
    console.log(this.productosmaquina);
    for(let i=0;i<this.productosmaquina.length;i=i+1)
    {
      this.productosvalue.push(this.productosmaquina[i].value)
    }
    console.log(this.productosvalue);
    this.items=this.productosvalue;
    

    this.initializeItems();

  }
  initializeItems() {
    this.items = this.productosvalue
  }

  getItems(ev) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
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
