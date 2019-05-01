import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';

/**********Paginas******/
import { LoginPage } from "../../pages/login/login";

import { TabsPage } from "../../pages/tabs/tabs";
import { PantallaprincipalPage } from "../../pages/pantallaprincipal/pantallaprincipal";
import { DetallemvPage } from "../detallemv/detallemv";
import { DetalleproductoPage } from "../detalleproducto/detalleproducto";
import { CatalogosPage } from "../../pages/catalogos/catalogos";
import { ReportePage } from "../../pages/reporte/reporte";
/**********Paginas******/

/*servicios*/
import { CIprovider } from "../../providers/data/data";

export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  index?: number;
  tabName?: string;
  tabComponent?: any;
}

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  rootPage:any = TabsPage;
  pages: PageInterface[] = [
    { title: 'Inicio', name: 'TabsPage', component: TabsPage, tabComponent: PantallaprincipalPage, index: 0, icon: 'home' },
    { title: 'Máquinas', name: 'TabsPage', component: TabsPage, tabComponent: DetallemvPage, index: 1, icon: 'calculator' },
    { title: 'Productos', name: 'TabsPage', component: TabsPage, tabComponent: DetalleproductoPage, index: 2, icon: 'cafe' },
    { title: 'Generar Reporte', name: 'SpecialPage', component: ReportePage, icon: 'stats' },
    { title: 'Configuración', name: 'SpecialPage', component: CatalogosPage, icon: 'settings' },
    { title: 'Salir', name: 'SpecialPage', component: LoginPage, icon: 'exit' },
  ];

  usuario:any;

  @ViewChild(Nav) nav: Nav;

  constructor(public navCtrl: NavController, public navParams: NavParams,public ciService:CIprovider) {
    this.usuario=this.ciService.getTipoUsuario();
    console.log(this.usuario);
    if(this.usuario=="oper"){
      console.log("entraste como operador");
      this.pages=[
        { title: 'Inicio', name: 'TabsPage', component: TabsPage, tabComponent: PantallaprincipalPage, index: 0, icon: 'home' },
        { title: 'Máquinas', name: 'TabsPage', component: TabsPage, tabComponent: DetallemvPage, index: 1, icon: 'calculator' },
        { title: 'Productos', name: 'TabsPage', component: TabsPage, tabComponent: DetalleproductoPage, index: 2, icon: 'cafe' },
        { title: 'Generar Reporte', name: 'SpecialPage', component: ReportePage, icon: 'stats' },
        { title: 'Salir', name: 'SpecialPage', component: LoginPage, icon: 'exit' },
      ];
    }


  }

  ionviewCanEnter(){
   if(this.usuario=="oper"){
     console.log("entraste como operador");
   }

  }

  openPage(page: PageInterface) {
    //console.log(this.pages[4])
    //delete this.pages[4];
    let params = {};
 
    // The index is equal to the order of our tabs inside tabs.ts
    if (page.index) {
      params = { tabIndex: page.index }; 
    }
 
    // If tabs page is already active just change the tab index
    if (this.nav.getActiveChildNavs().length && page.index != undefined) {
      this.nav.getActiveChildNavs()[0].select(page.index);
    } else {
      // Tabs are not active, so reset the root page 
      // In this case: moving to or from SpecialPage
      this.nav.setRoot(page.component, params);
    }
  }
 
  isActive(page: PageInterface) {
    // Again the Tabs Navigation
    let childNav = this.nav.getActiveChildNavs()[0];
 
    if (childNav) {
     
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }
 
    // Fallback needed when there is no active childnav (tabs not active)
    if (this.nav.getActive() && this.nav.getActive().name === page.name) {
      return 'primary';
    }
    return;
  }

}
