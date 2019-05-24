import { NgModule,CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA } from '@angular/core';
import { LuzComponent } from './luz/luz';

import { IonicModule } from "ionic-angular";
import { NavbarComponent } from './navbar/navbar';
import { CardexpandibleComponent } from './cardexpandible/cardexpandible';
import { GraficapieComponent } from './graficapie/graficapie';
import { VentaxhoraComponent } from './ventaxhora/ventaxhora';
import { VentaxdiaComponent } from './ventaxdia/ventaxdia';
import { VentaxhoramaquinaComponent } from './ventaxhoramaquina/ventaxhoramaquina';
import { VentaxdiamaquinaComponent } from './ventaxdiamaquina/ventaxdiamaquina';
import { GraficaproductosinventarioComponent } from './graficaproductosinventario/graficaproductosinventario';
import { TacometroproductosComponent } from './tacometroproductos/tacometroproductos';
import { TacometroventasComponent } from './tacometroventas/tacometroventas';
import { VentaglobalhistoricaComponent } from './ventaglobalhistorica/ventaglobalhistorica';
import { VentaxhoraproductomaquinaComponent } from './ventaxhoraproductomaquina/ventaxhoraproductomaquina';
import { VentaxdiaproductomaquinaComponent } from './ventaxdiaproductomaquina/ventaxdiaproductomaquina';
import { HistoricoComponent } from './historico/historico';
import { HistoricomaquinaproductoventaComponent } from './historicomaquinaproductoventa/historicomaquinaproductoventa';
import { HistoricodetalleproductoComponent } from './historicodetalleproducto/historicodetalleproducto';
@NgModule({
	declarations: [LuzComponent,
    NavbarComponent,
    NavbarComponent,
    CardexpandibleComponent,
    GraficapieComponent,
    VentaxhoraComponent,
    VentaxdiaComponent,
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
    HistoricoComponent,
    HistoricomaquinaproductoventaComponent,
    HistoricodetalleproductoComponent],
	imports: [IonicModule],
	exports: [LuzComponent,
    NavbarComponent,
    NavbarComponent,
    CardexpandibleComponent,
    GraficapieComponent,
    VentaxhoraComponent,
    VentaxdiaComponent,
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
    HistoricoComponent,
    HistoricomaquinaproductoventaComponent,
    HistoricodetalleproductoComponent],
	schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
})
export class ComponentsModule {}
