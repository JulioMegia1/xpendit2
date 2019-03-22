import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CatmaquinasPage } from './catmaquinas';

@NgModule({
  declarations: [
    CatmaquinasPage,
  ],
  imports: [
    IonicPageModule.forChild(CatmaquinasPage),
  ],
})
export class CatmaquinasPageModule {}
