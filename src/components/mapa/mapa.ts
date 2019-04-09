import { Component } from '@angular/core';

/**
 * Generated class for the MapaComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'mapa',
  templateUrl: 'mapa.html'
})
export class MapaComponent {

  text: string;

  constructor() {
    console.log('Hello MapaComponent Component');
    this.text = 'Hello World';
  }

}
