import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
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

/*table*/
settings = {
  hideSubHeader:false, 
  noDataMessage:"sin datos",
    add: {
    confirmCreate: true,
    addButtonContent: '<i class="fas fa-plus"></i>',
    createButtonContent: '<i class="far fa-save"></i>',
    cancelButtonContent: '<i class="fas fa-times"></i>'
        },
 
  delete: {
    confirmDelete: true,
    deleteButtonContent: '<i class="fas fa-trash-alt"></i>',
    saveButtonContent: '<i class="fas fa-check"></i>',
    cancelButtonContent: '<i class="fas fa-times"></i>'
  },

  edit: {
    confirmSave: true,
    editButtonContent: '<i class="fas fa-edit"></i>',
    saveButtonContent: '<i class="far fa-save"></i>',
    cancelButtonContent: '<i class="fas fa-times"></i>'
        },
  actions:{
    columnTitle:"Actions",
    position:"right",
  custom:[{
    name: 'view',
    title: '<i class="fas fa-edit"></i>',
  }]
},
  columns: {
    descripcion: {
      title: 'Descripcion',
      // width:"30%"
    },
    precioCompra: {
      title: 'Precio Compra',
      // width:"10%"
    },
    presentacion: {
      title: 'Presentación',
      // width:"10%"
    },
    imagen: {
      title: 'Imagen',
      editable:false,
      // width:"20%"
    }
  },
  pager: {
    display: true,
    perPage: 15
  },
  attr: {
    class: 'table table-striped table-bordered table-hover'
  },
 
};
data:any; //datos de la tabla

@ViewChild(Content) content: Content; //minimizar header(menu)

mensaje:any;//mensaje del alert

infoproductonuevo={//plantilla     
    "idProducto": null,
    "descripcion": null,
    "precioCompra": null,
    "imagen": "default.jpg",
    "presentacion": null
}

infoProductoSeleccionado:any; 

//datos del card
idProducto:any;
descripcion:any;
precioCompra:any;
presentacion:any;

myphoto:any;

inputsEnable=true;
buttonhideUpdDel=true;
buttonhideSave=true;

  constructor(public navCtrl: NavController, public navParams: NavParams,private camera: Camera, private transfer: FileTransfer, private file: File,public alertCtrl: AlertController,
    public mvService:MvserviceProvider,
    public catService:CatalogserviceProvider,
    ) {
      this.getinfogralProductos();//obtiene los datos de la tabla 
  }

  getinfogralProductos(){//obtiene los datos de la tabla 
    this.catService.getProductos().then(result=>{
      console.log(result)
      this.data=result;//asignas los datos de los productos a la tabla
    },(err)=>{
      console.log(err);
    }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CatproductosPage');
  }

  nuevoProducto(){
    this.catService.getidProducto().then(result=>{
      console.log(result)
      let numero=parseInt(result[0].value)
      this.infoproductonuevo.idProducto=numero;
      this.descripcion=null
      this.precioCompra=null;
      this.presentacion=null;
      console.log(this.infoproductonuevo);
      this.inputsEnable=false;
      this.buttonhideSave=false;
      this.buttonhideUpdDel=true

      this.idProducto=null;
    },(err)=>{
      console.log(err);
    }
    );
  }

  getinfoProducto(){
    this.catService.getInfoProducto(this.idProducto).then((result)=>{
        console.log(result)
        this.infoProductoSeleccionado=result;
        this.descripcion=this.infoProductoSeleccionado.descripcion;
        this.precioCompra=this.infoProductoSeleccionado.precioCompra;
        this.presentacion=this.infoProductoSeleccionado.presentacion;
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
      this.catService.newProducto(this.infoproductonuevo).then(async (result)=>{
        console.log(result);
        console.log(this.infoproductonuevo)
        await this.getinfogralProductos(); //cuando termina de guardar un nuevo producto en la bd, actualiza la tabla
        this.mensaje="Producto creado exitosamente!"
        this.showAlert();
        this.idProducto=null;
        this.descripcion=null
        this.presentacion=null;
        this.precioCompra=null;
        this.buttonhideSave=true;

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

  eliminarProducto(){
    if(this.idProducto==null){
      this.mensaje="No hay ninguna maquina Seleccionada"
      this.showAlert();
    }
    else{
      console.log(this.infoProductoSeleccionado);
      const confirm = this.alertCtrl.create({
        title: 'Seguro quieres eliminar el producto\n'+this.infoProductoSeleccionado.descripcion+"?",
        // message: 'Do you agree to use this lightsaber to do good across the intergalactic galaxy?',
        buttons: [
          {
            text: 'Cancelar',
            handler: () => {
              console.log('Disagree clicked');
                  
            }
          },
          {
            text: 'Aceptar',
            handler:  () => {
              console.log('Agree clicked')
              this.delProducto();

            }
          }
        ]
      });
      confirm.present();
   }
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

   delProducto(){
     this.catService.delProducto(this.idProducto).then(async (result)=>{
        console.log(result)
        this.descripcion=null;
        this.precioCompra=null;
        this.presentacion=null;
        this.buttonhideUpdDel=true;
        await this.getinfogralProductos();//cuando termina de eliminar en la bd, actualiza la tabla
        
      },(err)=>{
        console.log(err);
      }
      );

   }

    updProducto(){
      if(this.idProducto==null){
        this.mensaje="Ningún producto seleccionado"
        this.showAlert();
      }
      else{
      this.catService.updProducto(this.infoProductoSeleccionado).then(async (result)=>{
      console.log(result)
      await this.getinfogralProductos(); //cuando termina de actualiza el producto en la bd, actualiza la tabla
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

    cargarDatos(event) {//cargda los datos de la tabla
      console.log(event);
      this.idProducto=event.data.idProducto;
      this.getinfoProducto();
      this.inputsEnable=false;
      this.buttonhideSave=true;
      this.buttonhideUpdDel=false;
    }

    onDeleteConfirm(event) {
      console.log("Delete Event In Console")
      console.log(event);
      const confirm = this.alertCtrl.create({
        title: 'Seguro quieres eliminar el producto\n'+event.data.descripcion+"?",
        // message: 'Do you agree to use this lightsaber to do good across the intergalactic galaxy?',
        buttons: [
          {
            text: 'Cancelar',
            handler: () => {
              console.log('Disagree clicked');
                   event.confirm.reject();
            }
          },
          {
            text: 'Aceptar',
            handler: async () => {
              console.log('Agree clicked');
              event.confirm.resolve();
              console.log(event)
              this.idProducto=event.data.idProducto;
              this.delProducto();
            }
          }
        ]
      });
      confirm.present();
    }
  
      onCreateConfirm(event) {
      console.log("Create Event In Console")
      console.log(event);
      let a=parseFloat(event.newData.precioCompra)
      console.log(a)
      event.newData.precioCompra=a
      console.log(event);
      if(event.newData.descripcion==""
        || event.newData.precioCompra=="" || isNaN(event.newData.precioCompra)==true  || event.newData.precioCompra<0
        || event.newData.presentacion==""
      ){
        console.log("Datos invalidos")
        this.mensaje="Producto no creado\n favor de ingresar todos los datos correctamente";
        this.showAlert();
      }
      else{
        console.log("Datos correctos")
        this.nuevoProductosmartTable();
        this.infoproductonuevo.descripcion=event.newData.descripcion;
        this.infoproductonuevo.precioCompra=event.newData.precioCompra;
        this.infoproductonuevo.presentacion=event.newData.presentacion;
        console.log(this.infoproductonuevo);
        event.confirm.resolve();
      }
    }

    nuevoProductosmartTable(){
      this.catService.getidProducto().then(async result=>{
        console.log(result)
        let numero=parseInt(result[0].value)
        this.infoproductonuevo.idProducto=numero;
        console.log(this.infoproductonuevo);
        await this.guardarProductosmartTable();
          },(err)=>{
            console.log(err);
          }
          );
    }

    guardarProductosmartTable(){
    console.log(this.infoproductonuevo);
    this.catService.newProducto(this.infoproductonuevo).then(async (result)=>{
      console.log(result);
      console.log(this.infoproductonuevo)
      await this.getinfogralProductos();
      this.mensaje="Producto creado exitosamente!"
      this.showAlert();
      this.inputsEnable=true; 
      this.buttonhideUpdDel=true;
      this.descripcion=null;
      this.precioCompra=null;
      this.presentacion=null;

       },(err)=>{
        console.log(err);
      }
      );
    }
  
    onSaveConfirm(event) { //Editar los productos
      console.log("Edit Event In Console")
      console.log(event);
      let numero=parseFloat(event.newData.precioCompra)
      console.log(numero)
      event.newData.precioCompra=numero
      console.log(event)
      if(event.newData.descripcion==null || event.newData.descripcion==""
    || event.newData.precioCompra<0 || event.newData.precioCompra =="" || event.newData.precioCompra==null || isNaN(event.newData.precioCompra)==true
    || event.newData.presentacion==null || event.newData.presentacion==""
    ){
      this.mensaje="Producto no modificafo\n favor de ingresar todos los datos correctamente";
      this.showAlert();
    }
    else{
      this.idProducto=event.newData.idProducto;
      this.infoProductoSeleccionado=event.newData
      
      console.log(this.infoProductoSeleccionado)
      this.updProducto();
      this.mensaje="Producto modificado correctamente";
      this.showAlert();
    }
    }
}
