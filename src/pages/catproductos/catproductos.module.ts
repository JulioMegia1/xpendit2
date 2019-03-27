import { NgModule,CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CatproductosPage } from './catproductos';

@NgModule({
  declarations: [
    CatproductosPage,
  ],
  imports: [
    IonicPageModule.forChild(CatproductosPage),
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
})
export class CatproductosPageModule {}
