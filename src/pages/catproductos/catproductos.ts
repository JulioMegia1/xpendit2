import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';


/*servicios*/
import { MvserviceProvider } from "../../providers/mvservice/mvservice";
import { CatalogserviceProvider } from "../../providers/catalogservice/catalogservice";


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

  valor="true"//habilita inputs
  mensaje:any;//mensaje del alert

  infoproducto={
    
    "idProducto": 14,
    "descripcion": null,
    "precioCompra": null,
    "imagen": "default.jpg",
    "presentacion": null
}



  myphoto:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private camera: Camera, private transfer: FileTransfer, private file: File,public alertCtrl: AlertController,
    public mvService:MvserviceProvider,
    public catService:CatalogserviceProvider,
    ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CatproductosPage');
  }


  /*************foto*/
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
    /***********foto*/

    nuevoproducto(){
      this.valor="false"
    }

    guardarproducto(){
      if(this.infoproducto.descripcion==null || this.infoproducto.descripcion==""
      || this.infoproducto.precioCompra==null || this.infoproducto.precioCompra==""
      || this.infoproducto.presentacion==null || this.infoproducto.presentacion==""
      ){
          console.log("no creado")
          this.mensaje="Producto no creado\n favor de ingresar los datos correctamente"
          this.showAlert();


        }
        else{
          this.catService.newProducto(this.infoproducto).then((result)=>{
  
            let respuesta:any; //Respuesta de la encriptacion
            respuesta=result;
            console.log(respuesta);
            console.log(this.infoproducto)
            this.mensaje="Producto creado exitosamente!"
            this.showAlert();
      
             },(err)=>{
               console.log(err);
             }
            
             );
        }
    }

    showAlert() {
      const alert = this.alertCtrl.create({
        title: this.mensaje,
        buttons: ['OK']
      });
      alert.present();
    }
  
  




}
