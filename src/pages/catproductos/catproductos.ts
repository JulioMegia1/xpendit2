import { Component, ViewChild, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
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



/*table*/
settings = {
  hideSubHeader:false	,
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
    perPage: 5
  },
  attr: {
    class: 'table table-striped table-bordered table-hover'
  },
 
};

data:any;

  @ViewChild(Content) content: Content;


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
      this.getinfogralProductos()

  }


  getinfogralProductos(){
    this.catService.getProductos().then(result=>{
      console.log(result)
      this.data=result;

        },(err)=>{
          console.log(err);
        }
        );

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CatproductosPage');
    this.getproductos();
  }


  eliminarProducto(){
    this.catService.delProducto(this.idProducto).then((result)=>{
      console.log(result)
      this.mensaje="Seguro que desea eliminar la maquina?"
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
      let numero=parseInt(result[0].value)
      this.infoproductonuevo.idProducto=numero;
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
      this.catService.updProducto(this.infoProductoSeleccionado).then(async (result)=>{
      console.log(result)
      await this.getinfogralProductos();
      
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

    cargarDatos(event) {
      console.log(event);
      this.idProducto=event.data.idProducto;
      this.getinfoProducto();
     
    }

    onDeleteConfirm(event) {
      console.log("Delete Event In Console")
      console.log(event);
      if (window.confirm('Are you sure you want to delete?')) {
        event.confirm.resolve();
      } else {
        event.confirm.reject();
      }
    }
  
      async onCreateConfirm(event) {

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
        this.nuevoProducto();
        this.infoproductonuevo.descripcion=event.newData.descripcion;
        this.infoproductonuevo.precioCompra=event.newData.precioCompra;
        this.infoproductonuevo.presentacion=event.newData.presentacion;
        console.log(this.infoproductonuevo);
        await this.guardarProductosmartTable();

      }

    }


     guardarProductosmartTable(){
        console.log(this.infoproductonuevo);
        this.catService.newProducto(this.infoproductonuevo).then(async (result)=>{
  
                  console.log(result);
                  console.log(this.infoproductonuevo)
                  await this.getinfogralProductos();
                  this.mensaje="Producto creado exitosamente!"
                  this.showAlert();
            
                   },(err)=>{
                     console.log(err);
                   }
                  
                   );
    }
  
  
    onSaveConfirm(event) {
      console.log("Edit Event In Console")
      console.log(event);
    }
    
  
  

cambiapage(){
  this.settings.pager.perPage=2


}



}
