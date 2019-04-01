import { NgModule,CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from "../../components/components.module";
import { ActualizamvPage } from './actualizamv';

@NgModule({
  declarations: [
    ActualizamvPage,
    ComponentsModule
  ],
  imports: [
    IonicPageModule.forChild(ActualizamvPage),
    ComponentsModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
})
export class ActualizamvPageModule {}
