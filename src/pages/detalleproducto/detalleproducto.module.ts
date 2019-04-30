import { NgModule,CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalleproductoPage } from './detalleproducto';
import { IonicSelectableModule } from 'ionic-selectable';


@NgModule({
  declarations: [
    DetalleproductoPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalleproductoPage),
    IonicSelectableModule,
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
})
export class DetalleproductoPageModule {}
