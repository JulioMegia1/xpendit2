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

/**********servicios******/

import { AuthserviceProvider } from "../providers/authservice/authservice";
import { CatalogserviceProvider } from "../providers/catalogservice/catalogservice";
import { ExtraserviceProvider } from "../providers/extraservice/extraservice";
import { MvserviceProvider  } from "../providers/mvservice/mvservice";
import { SelectserviceProvider } from "../providers/selectservice/selectservice";

import { NightmodeProvider } from '../providers/nightmode/nightmode';
import { DataServiceProvider } from '../providers/data-service/data-service'; //datos de prueba locales

/**********servicios******/

/*componentes*/
import {  LuzComponent} from "../components/luz/luz";
import { NavbarComponent } from "../components/navbar/navbar";
import { CardexpandibleComponent } from "../components/cardexpandible/cardexpandible";
import {GraficapieComponent  } from "../components/graficapie/graficapie";
import { GraficalineasComponent } from "../components/graficalineas/graficalineas";
import { VentaxhoraComponent } from "../components/ventaxhora/ventaxhora";
import { VentaxdiaComponent } from "../components/ventaxdia/ventaxdia";
import { VentaxhoramaquinaComponent } from "../components/ventaxhoramaquina/ventaxhoramaquina";
import { VentaxdiamaquinaComponent } from "../components/ventaxdiamaquina/ventaxdiamaquina";
import { GraficaproductosinventarioComponent } from "../components/graficaproductosinventario/graficaproductosinventario";
import { TacometroproductosComponent } from "../components/tacometroproductos/tacometroproductos";
import {  TacometroventasComponent} from "../components/tacometroventas/tacometroventas";
import { VentaglobalhistoricaComponent } from "../components/ventaglobalhistorica/ventaglobalhistorica";
import {  MapaComponent} from "../components/mapa/mapa";
/*componentes*/

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

/******************************************** */

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

    /*componentes*/
    LuzComponent,
    NavbarComponent,
    CardexpandibleComponent,
    GraficapieComponent,
    GraficalineasComponent,
    VentaxhoraComponent,
    VentaxdiaComponent,
    VentaxhoramaquinaComponent,
    VentaxdiamaquinaComponent,
    GraficaproductosinventarioComponent,
    TacometroproductosComponent,
    TacometroventasComponent,
    VentaglobalhistoricaComponent,
    MapaComponent,

    /*componentes*/
    
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FusionChartsModule,
    IonicModule.forRoot(MyApp)
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

     /*componentes*/
     LuzComponent,
     GraficalineasComponent,
     VentaxhoraComponent
     /*componentes*/
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    /*Servicios**/
    AuthserviceProvider,
    CatalogserviceProvider,
    ExtraserviceProvider,
    MvserviceProvider,
    SelectserviceProvider,
        
    NightmodeProvider,

    
    DataServiceProvider, //prueba datos locales

    /*Servicios**/
  ]
})
export class AppModule {}
