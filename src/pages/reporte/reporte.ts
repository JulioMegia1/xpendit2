import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-reporte',
  templateUrl: 'reporte.html',
})
export class ReportePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportePage');
    this.presentLoadingCustom();
  }



  /*loading personalizado*/
  presentLoadingCustom() {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `
       
        <img src="../../assets/imgs/gif.gif" />
        <div>Descargando reporte ...</div>`,
      
    });

    loading.present();

    setTimeout(() => {
      
      window.open("https://www.xpend-it.com.mx/",'_blank');
      


    }, 3000);

    setTimeout(() => {
      loading.dismiss();
    }, 3000);
    
  }
  /***/

//  

  

}
