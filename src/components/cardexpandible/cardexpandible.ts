import { Component, ViewChild, OnInit, Renderer, Input  } from '@angular/core';

/**
 * Generated class for the CardexpandibleComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'cardexpandible',
  templateUrl: 'cardexpandible.html'
})
export class CardexpandibleComponent implements OnInit{

  accordionExapanded = false;
  @ViewChild("cc") cardContent: any;
  @Input('title') title: string;

  icon: string = "add";

  constructor(public renderer: Renderer) {
    console.log('Hello CardexpandibleComponent Component');
    
  }


  ngOnInit() {
    //console.log(this.cardContent.nativeElement);
    this.renderer.setElementStyle(this.cardContent.nativeElement, "webkitTransition", "max-height 500ms, padding 500ms");
  }

  toggleAccordion() {
    if (this.accordionExapanded) {
      this.renderer.setElementStyle(this.cardContent.nativeElement, "max-height", "0px");
      this.renderer.setElementStyle(this.cardContent.nativeElement, "padding", "0px 16px");

    } else {
      this.renderer.setElementStyle(this.cardContent.nativeElement, "max-height", "500px");
      this.renderer.setElementStyle(this.cardContent.nativeElement, "padding", "13px 16px");

    }

    this.accordionExapanded = !this.accordionExapanded;
    this.icon = this.icon == "add" ? "arrow-up" : "add";

  }

}
