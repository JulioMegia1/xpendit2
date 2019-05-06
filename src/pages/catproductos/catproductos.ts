import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/*servicios*/
import { MvserviceProvider } from "../../providers/mvservice/mvservice";

/**subir imagen */
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer,   } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

@IonicPage()
@Component({
  selector: 'page-catproductos',
  templateUrl: 'catproductos.html',
})
export class CatproductosPage {
  infogralproductos:any;
  descripcion:any;
  preciocompra:any;
  presentacion:any;


  myphoto:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private camera: Camera, private transfer: FileTransfer, private file: File,
    public mvservice:MvserviceProvider) {

      this.getinfogralproductos();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CatproductosPage');
  }
  takePhoto(){
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.myphoto = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

  getImage() {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum:false
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.myphoto = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

  getinfogralproductos(){
    this.mvservice.catproductosInfogralproductos().then(result=>{
      this.infogralproductos= result;
      console.log(this.infogralproductos);
      },(err)=>{
        console.log(err);
      }
      );
    }




}
