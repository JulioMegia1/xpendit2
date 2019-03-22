import { NgModule,CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA } from '@angular/core';
import { LuzComponent } from './luz/luz';
import { TacometroComponent } from './tacometro/tacometro';
import { IonicModule } from "ionic-angular";
@NgModule({
	declarations: [LuzComponent,
    TacometroComponent],
	imports: [IonicModule],
	exports: [LuzComponent,
    TacometroComponent],
	schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
})
export class ComponentsModule {}
