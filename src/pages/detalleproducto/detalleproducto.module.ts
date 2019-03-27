import { NgModule,CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalleproductoPage } from './detalleproducto';

@NgModule({
  declarations: [
    DetalleproductoPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalleproductoPage),
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
})
export class DetalleproductoPageModule {}
