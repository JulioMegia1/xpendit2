import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CatalarmasPage } from './catalarmas';

@NgModule({
  declarations: [
    CatalarmasPage,
  ],
  imports: [
    IonicPageModule.forChild(CatalarmasPage),
  ],
})
export class CatalarmasPageModule {}
