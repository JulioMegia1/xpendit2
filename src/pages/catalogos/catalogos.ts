import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';

/************************Paginas*************************************/
import { CatmaquinasPage } from "../../pages/catmaquinas/catmaquinas";
import { CatproductosPage } from "../../pages/catproductos/catproductos";
import { CatusuariosPage } from "../../pages/catusuarios/catusuarios";
import { CatalarmasPage } from "../../pages/catalarmas/catalarmas";
/************************Paginas*************************************/



@IonicPage()
@Component({
  selector: 'page-catalogos',
  templateUrl: 'catalogos.html',
})
export class CatalogosPage {
  @ViewChild(Content) content: Content;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  irmaquinas(){
    this.navCtrl.push(CatmaquinasPage);

  }
  irproductos(){
    this.navCtrl.push(CatproductosPage);

  }
  irusuarios(){
    this.navCtrl.push(CatusuariosPage);

  }
  iralarmas(){
    this.navCtrl.push(CatalarmasPage);

  }

}
