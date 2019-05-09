import { NgModule,CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CatalarmasPage } from './catalarmas';
import { IonicSelectableModule } from 'ionic-selectable';


@NgModule({
  declarations: [
    CatalarmasPage,
  ],
  imports: [
    IonicPageModule.forChild(CatalarmasPage),
    IonicSelectableModule

  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
})
export class CatalarmasPageModule {}
