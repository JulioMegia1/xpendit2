import { NgModule,CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CatalarmasPage } from './catalarmas';

@NgModule({
  declarations: [
    CatalarmasPage,
  ],
  imports: [
    IonicPageModule.forChild(CatalarmasPage),
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
})
export class CatalarmasPageModule {}
