import { NgModule,CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CatusuariosPage } from './catusuarios';

@NgModule({
  declarations: [
    CatusuariosPage,
  ],
  imports: [
    IonicPageModule.forChild(CatusuariosPage),
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
})
export class CatusuariosPageModule {}
