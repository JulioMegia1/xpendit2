import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';

/**********Paginas******/
import { LoginPage } from "../pages/login/login";
import { MenuPage } from "../pages/menu/menu";
import { TabsPage } from "../pages/tabs/tabs";
import { PantallaprincipalPage } from "../pages/pantallaprincipal/pantallaprincipal";
import { CatmaquinasPage } from "../pages/catmaquinas/catmaquinas";
import { CatproductosPage } from "../pages/catproductos/catproductos";
import { CatalogosPage } from "../pages/catalogos/catalogos";
import { ReportePage } from "../pages/reporte/reporte";
import { CatalarmasPage } from "../pages/catalarmas/catalarmas";
import { CatusuariosPage } from "../pages/catusuarios/catusuarios";
import { DetallemvPage  } from "../pages/detallemv/detallemv";
import { DetalleproductoPage } from "../pages/detalleproducto/detalleproducto";
import { ActualizamvPage } from "../pages/actualizamv/actualizamv";
/**********Paginas******/

/*********popover******/
import { BuscamaquinaproductoPage } from "../pages/buscamaquinaproducto/buscamaquinaproducto";

/**********servicios******/
import { AuthserviceProvider } from "../providers/authservice/authservice";
import { CatalogserviceProvider } from "../providers/catalogservice/catalogservice";
//import { ExtraserviceProvider } from "../providers/extraservice/extraservice";
import { MvserviceProvider  } from "../providers/mvservice/mvservice";
import { SelectserviceProvider } from "../providers/selectservice/selectservice";
import { CIprovider } from "../providers/data/data"

import { NightmodeProvider } from '../providers/nightmode/nightmode';
import { DataServiceProvider } from '../providers/data-service/data-service'; //datos de prueba locales

/**********servicios******/

/*componentes*/
import {  LuzComponent} from "../components/luz/luz";
import { NavbarComponent } from "../components/navbar/navbar";
import { CardexpandibleComponent } from "../components/cardexpandible/cardexpandible";
import {GraficapieComponent  } from "../components/graficapie/graficapie";
import { VentaxhoraComponent } from "../components/ventaxhora/ventaxhora";
import { VentaxdiaComponent } from "../components/ventaxdia/ventaxdia";
import { VentaxhoramaquinaComponent } from "../components/ventaxhoramaquina/ventaxhoramaquina";
import { VentaxdiamaquinaComponent } from "../components/ventaxdiamaquina/ventaxdiamaquina";
import { GraficaproductosinventarioComponent } from "../components/graficaproductosinventario/graficaproductosinventario";
import { TacometroproductosComponent } from "../components/tacometroproductos/tacometroproductos";
import {  TacometroventasComponent} from "../components/tacometroventas/tacometroventas";
import { VentaglobalhistoricaComponent } from "../components/ventaglobalhistorica/ventaglobalhistorica";
import { VentaxdiaproductomaquinaComponent } from "../components/ventaxdiaproductomaquina/ventaxdiaproductomaquina";
import { VentaxhoraproductomaquinaComponent } from "../components/ventaxhoraproductomaquina/ventaxhoraproductomaquina";
import { HistoricoComponent } from "../components/historico/historico";
import { HistoricomaquinaproductoventaComponent } from "../components/historicomaquinaproductoventa/historicomaquinaproductoventa";
import { HistoricodetalleproductoComponent } from "../components/historicodetalleproducto/historicodetalleproducto";
import { ActualizaComponent } from "../components/actualiza/actualiza";
import { ActualizacatMaquinaComponent } from "../components/actualizacat-maquina/actualizacat-maquina";
/*componentes*/

/**********************************selectable*************/
// npm install ionic-selectable@3.4.0 --save
import { IonicSelectableModule } from 'ionic-selectable';

/*plugins*/
import { Camera } from '@ionic-native/camera';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

/*plugin hide header*/
import {ScrollingHeaderModule} from 'ionic-scrolling-header';

/*ng2SmartTable*/
import { Ng2CompleterModule } from "ng2-completer";
import { Ng2SmartTableModule } from 'ng2-smart-table';

/***************fusioncharts********************* */
import { FusionChartsModule } from 'angular-fusioncharts';
import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as TimeSeries from 'fusioncharts/fusioncharts.timeseries';
import * as Ocean from 'fusioncharts/themes/fusioncharts.theme.ocean';
import * as Zune from 'fusioncharts/themes/fusioncharts.theme.zune';
import * as Gammel from 'fusioncharts/themes/fusioncharts.theme.gammel';
import * as Widgets from 'fusioncharts/fusioncharts.widgets';
FusionChartsModule.fcRoot(FusionCharts, Charts, TimeSeries,Ocean,Gammel,Zune,Widgets);

@NgModule({
  declarations: [
    MyApp,
    /*paginas*/
    LoginPage,
    MenuPage,
    TabsPage,
    PantallaprincipalPage,
    CatmaquinasPage,
    CatproductosPage,
    CatalogosPage,
    ReportePage,
    CatalarmasPage,
    CatusuariosPage,
    DetallemvPage,
    DetalleproductoPage,
    ActualizamvPage,
    /*paginas*/

    /****popover* */
    BuscamaquinaproductoPage,

    /*componentes*/
    LuzComponent,
    NavbarComponent,
    CardexpandibleComponent,
    GraficapieComponent,
    VentaxhoraComponent,
    VentaxdiaComponent,
    VentaxhoramaquinaComponent,
    VentaxdiamaquinaComponent,
    GraficaproductosinventarioComponent,
    TacometroproductosComponent,
    TacometroventasComponent,
    VentaglobalhistoricaComponent,
    VentaxhoraproductomaquinaComponent,
    VentaxdiaproductomaquinaComponent,
    HistoricoComponent,
    HistoricomaquinaproductoventaComponent,
    HistoricodetalleproductoComponent,
    ActualizaComponent,
    ActualizacatMaquinaComponent
    /*componentes*/
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FusionChartsModule,//fusion charts
    IonicSelectableModule,//select searcheable
    ScrollingHeaderModule, //oculat header
    IonicModule.forRoot(MyApp),
    Ng2CompleterModule, //ng2smarttable
    Ng2SmartTableModule //ng2smarttable
   ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    /*paginas*/
    LoginPage,
    MenuPage,
    TabsPage,
    PantallaprincipalPage,
    CatmaquinasPage,
    CatproductosPage,
    CatalogosPage,
    ReportePage,
    CatalarmasPage,
    CatusuariosPage,
    DetallemvPage,
    DetalleproductoPage,
    ActualizamvPage,
    /*paginas*/

    /****popover */
    BuscamaquinaproductoPage,    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    /*Servicios**/
    AuthserviceProvider,
    CatalogserviceProvider,
    //ExtraserviceProvider,
    MvserviceProvider,
    SelectserviceProvider,
    CIprovider,
    NightmodeProvider,//BORRAR----------------------------------------?????
    
    /*plugins*/
    , FileTransfer, File,Camera,
    /*plugins*/
    
    DataServiceProvider,//prueba datos locales //BORRAR----------------------------------------?????
    /*Servicios**/
  ]
})
export class AppModule {}
