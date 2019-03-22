import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**********Paginas******/

import { PantallaprincipalPage } from "../../pages/pantallaprincipal/pantallaprincipal";
import { DetallemvPage } from "../detallemv/detallemv";
import { DetalleproductoPage } from "../detalleproducto/detalleproducto";
/**********Paginas******/

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tab1Root: any = PantallaprincipalPage;
  tab2Root: any = DetallemvPage;
  tab3Root: any = DetalleproductoPage;
  myIndex: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  

}
