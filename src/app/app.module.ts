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
import { ServicioApiProvider } from '../providers/servicio-api/servicio-api';
import { NightmodeProvider } from '../providers/nightmode/nightmode';
import { DataServiceProvider } from '../providers/data-service/data-service';
/**********servicios******/

/*componentes*/
import {  LuzComponent} from "../components/luz/luz";
import { NavbarComponent } from "../components/navbar/navbar";
/*componentes*/

/***************fusioncharts********************* */

import { FusionChartsModule } from 'angular-fusioncharts';
import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as TimeSeries from 'fusioncharts/fusioncharts.timeseries';
import * as Widgets from 'fusioncharts/fusioncharts.widgets';

FusionChartsModule.fcRoot(FusionCharts, Charts, TimeSeries,Widgets);

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
    NavbarComponent
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
     /*componentes*/
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    /*Servicios**/
    ServicioApiProvider,
    NightmodeProvider,
    
    DataServiceProvider,
    /*Servicios**/
  ]
})
export class AppModule {}
