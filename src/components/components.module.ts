import { NgModule,CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA } from '@angular/core';
import { LuzComponent } from './luz/luz';

import { IonicModule } from "ionic-angular";
import { NavbarComponent } from './navbar/navbar';
@NgModule({
	declarations: [LuzComponent,
    NavbarComponent,
    NavbarComponent],
	imports: [IonicModule],
	exports: [LuzComponent,
    NavbarComponent,
    NavbarComponent],
	schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
})
export class ComponentsModule {}
