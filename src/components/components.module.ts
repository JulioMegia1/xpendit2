import { NgModule,CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA } from '@angular/core';
import { LuzComponent } from './luz/luz';

import { IonicModule } from "ionic-angular";
import { NavbarComponent } from './navbar/navbar';
import { CardexpandibleComponent } from './cardexpandible/cardexpandible';
import { GraficapieComponent } from './graficapie/graficapie';
@NgModule({
	declarations: [LuzComponent,
    NavbarComponent,
    NavbarComponent,
    CardexpandibleComponent,
    GraficapieComponent],
	imports: [IonicModule],
	exports: [LuzComponent,
    NavbarComponent,
    NavbarComponent,
    CardexpandibleComponent,
    GraficapieComponent],
	schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
})
export class ComponentsModule {}
