import { Component,Input } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: 'navbar.html'
})
export class NavbarComponent {

  @Input("mytext") textTouse;
  text: string;

  constructor() {
    console.log('Hello NavbarComponent Component');
    this.text = 'Hello World';
  }
  ngAfterViewInit()  {
    this.text=this.textTouse;
  
    
  }

}
