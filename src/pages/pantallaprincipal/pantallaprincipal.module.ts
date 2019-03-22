import { NgModule,CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from "../../components/components.module";
import { PantallaprincipalPage } from './pantallaprincipal';

@NgModule({
  declarations: [
    PantallaprincipalPage,
    ComponentsModule,
  ],
  imports: [
    IonicPageModule.forChild(PantallaprincipalPage),
    ComponentsModule,
  ],  exports:[ComponentsModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
})
export class PantallaprincipalPageModule {}
