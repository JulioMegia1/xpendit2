import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from "../../components/components.module";
import { DetallemvPage } from './detallemv';

@NgModule({
  declarations: [
    DetallemvPage,
    ComponentsModule,
  ],
  imports: [
    IonicPageModule.forChild(DetallemvPage),
    ComponentsModule
  ],
})
export class DetallemvPageModule {}
