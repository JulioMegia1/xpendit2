import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';


/*servicios*/
import { MvserviceProvider } from "../../providers/mvservice/mvservice";
import { CatalogserviceProvider } from "../../providers/catalogservice/catalogservice";
import { SelectserviceProvider } from "../../providers/selectservice/selectservice";


/**subir imagen */
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer,   } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

/*selectable*/
import { IonicSelectableComponent } from 'ionic-selectable';
import { map } from 'rxjs/operator/map';
class Port {
  public label: any;
  public value: any;
}

@IonicPage()
@Component({
  selector: 'page-catproductos',
  templateUrl: 'catproductos.html',
})
export class CatproductosPage {

   /*********SELECT SEARCHEABLE***********/
 listaproductos:any;
 ports: Port[];  ///muestra las opciones del select
 port: Port; //muestra la opcion elegida del select

  mensaje:any;//mensaje del alert



  infoproductonuevo={
    
    "idProducto": null,
    "descripcion": null,
    "precioCompra": null,
    "imagen": "default.jpg",
    "presentacion": null
}
infoProductoSeleccionado:any;

idProducto:any;
descripcion:any;
precioCompra:any;
presentacion:any;



  myphoto:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private camera: Camera, private transfer: FileTransfer, private file: File,public alertCtrl: AlertController,
    public mvService:MvserviceProvider,
    public catService:CatalogserviceProvider,
    public selectprovider:SelectserviceProvider
    ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CatproductosPage');
    this.getproductos();
  }


  eliminarProducto(){
    this.catService.delProducto(this.idProducto).then((result)=>{
      console.log(result)
      this.mensaje="Seguro que desea eliminar la maqunia?"
      this.showAlert();
      this.getproductos();
      this.port=null;
      this.descripcion=null;
      this.precioCompra=null;
      this.presentacion=null;

    },(err)=>{
      console.log(err);
    }
    );

  }
  guardarProducto(){
    if(this.descripcion==null || this.descripcion==""
    || this.precioCompra<0 || this.precioCompra =="" || this.precioCompra==null
    || this.presentacion==null || this.presentacion==""
    )
    {
      this.mensaje="Producto no creado\n favor de ingresar todos los datos correctamente";
      this.showAlert();

    }
    else{
      this.infoproductonuevo.descripcion=this.descripcion;
      this.infoproductonuevo.precioCompra=this.precioCompra;
      this.infoproductonuevo.presentacion=this.presentacion;
      console.log(this.infoproductonuevo);
      this.catService.newProducto(this.infoproductonuevo).then((result)=>{

                console.log(result);
                console.log(this.infoproductonuevo)
                this.mensaje="Producto creado exitosamente!"
                this.showAlert();
          
                 },(err)=>{
                   console.log(err);
                 }
                
                 );
    

    }



  }

  modificarProducto(){
    if(this.descripcion==null || this.descripcion==""
    || this.precioCompra<0 || this.precioCompra =="" || this.precioCompra==null
    || this.presentacion==null || this.presentacion==""
    ){
      this.mensaje="Producto no modificado\n favor de ingresar todos los datos correctamente";
      this.showAlert();

    }
    else{
      this.infoProductoSeleccionado.descripcion=this.descripcion;
      this.infoProductoSeleccionado.precioCompra=this.precioCompra;
      this.infoProductoSeleccionado.presentacion=this.presentacion;
      console.log(this.infoProductoSeleccionado);
      this.updProducto();
      this.mensaje="Producto modificado correctamente";
      this.showAlert();


    }
    

  }

  nuevoProducto(){
    this.catService.getidProducto().then(result=>{
      console.log(result)
      this.infoproductonuevo.idProducto=result[0].value;
      console.log(this.infoproductonuevo);
        },(err)=>{
          console.log(err);
        }
        );

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

    getproductos(){
      this.selectprovider.selectproductos().then(result=>{
        this.listaproductos=result; //obtiene las maquinas
        console.log(this.listaproductos);
        this.ports=this.listaproductos; //
        console.log(this.ports)
       
  
        console.log(result);
        },(err)=>{
          console.log(err);
        }
        );
    }
  
    portChange(event: {
      component: IonicSelectableComponent,
      value: any 
    }) {
      console.log('port:', event.value);
      console.log("cambio el valor")
      console.log(this.port);
      this.idProducto=this.port.label;
      this.getinfoProducto();
  
    }

    getinfoProducto(){
      this.catService.getInfoProducto(this.idProducto).then((result)=>{

        this.infoProductoSeleccionado=result;
        this.descripcion=this.infoProductoSeleccionado.descripcion;
        this.precioCompra=this.infoProductoSeleccionado.precioCompra;
        this.presentacion=this.infoProductoSeleccionado.presentacion;
        },(err)=>{
           console.log(err);
         }
         );
    }

    updProducto(){
      this.catService.updProducto(this.infoProductoSeleccionado).then((result)=>{
      console.log(result)
      
         },(err)=>{
           console.log(err);
         }
         );
    
    }
    
    showAlert() {
      const alert = this.alertCtrl.create({
        title: this.mensaje,
        buttons: ['OK']
      });
      alert.present();
    }
  
  




}
