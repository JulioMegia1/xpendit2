import { NgModule,CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CatmaquinasPage } from './catmaquinas';
import { IonicSelectableModule } from 'ionic-selectable';


@NgModule({
  declarations: [
    CatmaquinasPage,
  ],
  imports: [
    IonicPageModule.forChild(CatmaquinasPage),
    IonicSelectableModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
})
export class CatmaquinasPageModule {}
