import { Component } from '@angular/core';

/**
 * Generated class for the GraficapieComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'graficapie',
  templateUrl: 'graficapie.html'
})
export class GraficapieComponent {

  text: string;

  constructor() {
    console.log('Hello GraficapieComponent Component');
    this.text = 'Hello World';
  }

}
