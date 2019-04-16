import { Component,Input } from '@angular/core';

const data = {
  chart: {
    caption: "Productos",
    lowerlimit: "0",
    upperlimit: "100",
    showvalue: "1",
    numbersuffix: "%",
    theme: "fusion",
    showtooltip: "0"
  },
  colorrange: {
    color: [
      {
        minvalue: "0",
        maxvalue: "50",
        code: "#F2726F"
      },
      {
        minvalue: "50",
        maxvalue: "75",
        code: "#FFC533"
      },
      {
        minvalue: "75",
        maxvalue: "100",
        code: "#62B58F"
      }
    ]
  },
  dials: {
    dial: [
      {
        value: "81"
      }
    ]
  }
};

@Component({
  selector: 'tacometroproductos',
  templateUrl: 'tacometroproductos.html'
})
export class TacometroproductosComponent {

  @Input("mytext") textTouse;
  text: string;

  constructor() {
    console.log('Hello TacometroproductosComponent Component');

  }


  ngOnInit()  {
    this.text=this.textTouse;
    console.log(this.text);
  }
    



  

  height = 150;
  type = "angulargauge";
  dataFormat = "json";
  dataSource = data;

}
