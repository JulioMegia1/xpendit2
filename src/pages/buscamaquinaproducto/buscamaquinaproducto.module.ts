import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuscamaquinaproductoPage } from './buscamaquinaproducto';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  declarations: [
    BuscamaquinaproductoPage,
  ],
  imports: [
    IonicPageModule.forChild(BuscamaquinaproductoPage),
    IonicSelectableModule,
    
  ],
})
export class BuscamaquinaproductoPageModule {}
