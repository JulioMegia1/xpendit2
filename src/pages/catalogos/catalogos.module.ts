import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CatalogosPage } from './catalogos';

@NgModule({
  declarations: [
    CatalogosPage,
  ],
  imports: [
    IonicPageModule.forChild(CatalogosPage),
  ],
})
export class CatalogosPageModule {}
