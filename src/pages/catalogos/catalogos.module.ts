
import { IonicPageModule } from 'ionic-angular';
import { CatalogosPage } from './catalogos';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA } from '@angular/core';


@NgModule({
  declarations: [
    CatalogosPage,
  ],
  imports: [
    IonicPageModule.forChild(CatalogosPage),
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
})
export class CatalogosPageModule {}
