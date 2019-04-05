import { Component } from '@angular/core';

const data = {
  chart: {
    caption: "Venta Global Histórica",
    //subcaption: "(As per government records)",
    showvalues: "1",
    numvisibleplot: "12",
    numberprefix: "$",
    plottooltext:
      "<b>$label</b> Venta:  <b>$dataValue</b> ",
    theme: "zune"
  },
  
  categories: [
    {
      category: [
        {
          label: "1994"
        },
        {
          label: "1995"
        },
        {
          label: "1996"
        },
        {
          label: "1997"
        },
        {
          label: "1998"
        },
        {
          label: "1999"
        },
        {
          label: "2000"
        },
        {
          label: "2001"
        },
        {
          label: "2002"
        },
        {
          label: "2003"
        },
        {
          label: "2004"
        },
        {
          label: "2005"
        },
        {
          label: "2006"
        },
        {
          label: "2007"
        },
        {
          label: "2008"
        },
        {
          label: "2009"
        },
        {
          label: "2010"
        },
        {
          label: "2011"
        },
        {
          label: "2012"
        },
        {
          label: "2013"
        },
        {
          label: "2014"
        },
        {
          label: "2015"
        },
        {
          label: "2016"
        },
        {
          label: "2017"
        },
        {
          label: "1994"
        },
        {
          label: "1995"
        },
        {
          label: "1996"
        },
        {
          label: "1997"
        },
        {
          label: "1998"
        },
        {
          label: "1999"
        },
        {
          label: "2000"
        },
        {
          label: "2001"
        },
        {
          label: "2002"
        },
        {
          label: "2003"
        },
        {
          label: "2004"
        },
        {
          label: "2005"
        },
        {
          label: "2006"
        },
        {
          label: "2007"
        },
        {
          label: "2008"
        },
        {
          label: "2009"
        },
        {
          label: "2010"
        },
        {
          label: "2011"
        },
        {
          label: "2012"
        },
        {
          label: "2013"
        },
        {
          label: "2014"
        },
        {
          label: "2015"
        },
        {
          label: "2016"
        },
        {
          label: "2017"
        }
      ]
    }
  ],
  dataset: [
    {
      data: [
        {
          value: "156"
        },
        {
          value: "1061"
        },
        {
          value: "1582"
        },
        {
          value: "2672"
        },
        {
          value: "3541"
        },
        {
          value: "2555"
        },
        {
          value: "8180"
        },
        {
          value: "4795"
        },
        {
          value: "4239"
        },
        {
          value: "1943"
        },
        {
          value: "9780"
        },
        {
          value: "2323"
        },
        {
          value: "2869"
        },
        {
          value: "8477"
        },
        {
          value: "3503"
        },
        {
          value: "1428"
        },
        {
          value: "3052"
        },
        {
          value: "6158"
        },
        {
          value: "2489"
        },
        {
          value: "1647"
        },
        {
          value: "2111"
        },
        {
          value: "1690"
        },
        {
          value: "2418"
        },
        {
          value: "1123"
        },{
          value: "1562"
        },
        {
          value: "1062"
        },
        {
          value: "1580"
        },
        {
          value: "2673"
        },
        {
          value: "3545"
        },
        {
          value: "2555"
        },
        {
          value: "8183"
        },
        {
          value: "4790"
        },
        {
          value: "4236"
        },
        {
          value: "1945"
        },
        {
          value: "9780"
        },
        {
          value: "2323"
        },
        {
          value: "2869"
        },
        {
          value: "8477"
        },
        {
          value: "3503"
        },
        {
          value: "1428"
        },
        {
          value: "3052"
        },
        {
          value: "6158"
        },
        {
          value: "2489"
        },
        {
          value: "1647"
        },
        {
          value: "2111"
        },
        {
          value: "1690"
        },
        {
          value: "2418"
        },
        {
          value: "1123"
        }
      ]
    }
  ]
};

@Component({
  selector: 'ventaglobalhistorica',
  templateUrl: 'ventaglobalhistorica.html'
})
export class VentaglobalhistoricaComponent {



  constructor() {
    console.log('Hello VentaglobalhistoricaComponent Component');
  
  }

  "width" = "100%";
  height = 250;
  type = "scrollline2d";
  dataFormat = "json";
  dataSource = data;

}
