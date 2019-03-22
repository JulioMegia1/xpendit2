import { Component } from '@angular/core';
import { NightmodeProvider } from "../../providers/nightmode/nightmode";


/**
 * Generated class for the LuzComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'luz',
  templateUrl: 'luz.html'
})
export class LuzComponent {

  nm : boolean = true;

  constructor( private nightMode:NightmodeProvider) {
   
  }

  changeMode(){
    this.nightMode.activeTheme =this.nm ? 'theme-dark' : 'theme-light';
  }

}
