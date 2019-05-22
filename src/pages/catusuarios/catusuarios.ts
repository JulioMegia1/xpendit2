import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

/*servicios*/
import { AuthserviceProvider } from "../../providers/authservice/authservice";
import { SelectserviceProvider } from "../../providers/selectservice/selectservice";
import {  MvserviceProvider} from "../../providers/mvservice/mvservice";
import { CatalogserviceProvider } from "../../providers/catalogservice/catalogservice";

@IonicPage()
@Component({
  selector: 'page-catusuarios',
  templateUrl: 'catusuarios.html',
})
export class CatusuariosPage {
  
/*table*/
settings = {
  hideSubHeader:false, 
  noDataMessage:"sin datos",
  edit: {
    confirmSave: true,
    editButtonContent: '<span class="fa-stack fa-2x"><i class="fas fa-square fa-stack-2x "></i><i class="fas fa-edit fa-stack-1x fa-inverse"></i></span>',
        saveButtonContent: '<span class="fa-stack fa-2x"><i class="fas fa-square fa-stack-2x "></i><i class="fas fa-save fa-stack-1x fa-inverse"></i></span>',

    cancelButtonContent: '<span class="fa-stack fa-2x"><i class="fas fa-square fa-stack-2x "></i><i class="fas fa-times fa-stack-1x fa-inverse"></i></span>'
        },
        delete: {
    confirmDelete: true,
    deleteButtonContent: '<span class="fa-stack fa-2x"><i class="fas fa-square fa-stack-2x "></i><i class="fas fa-trash-alt fa-stack-1x fa-inverse"></i></span>',
    saveButtonContent: '<i class="fas fa-check fa-3x"></i>',
    cancelButtonContent: '<i class="fas fa-times fa-3x"></i>'
  },
  actions:{
    
    columnTitle:"Acciones",
    position:"right",
  custom:[{
    name: 'view',
    title: '<span class="fa-stack fa-2x"><i class="fas fa-square fa-stack-2x" ></i><i class="fas fa-plus fa-stack-1x fa-inverse"></i></span>',
  }]
  },
  columns: {
    usuario: {
      title: 'usuario'
    },
    tipoUsuario: {
      title: 'Tipo',
      filter: {
        type: 'list',
        config: {
          selectText: 'Todos',
          list: [
            { value: 'Administrador', title: 'Administrador' },
            { value: 'Operador', title: 'Operador' },
            { value: 'Solo Lectura', title: 'Solo Lectura' },
          ],
        },
      },
      editor: {
        type: 'list',
        config: {
          list: [
            { value: 'Administrador', title: 'Administrador' },
            { value: 'Operador', title: 'Operador' },
            { value: 'Solo Lectura', title: 'Solo Lectura' },
          ],

        },
      },
      
    },
    estadoUsuario: {
      title: 'Status',
      filter: {
        type: 'list',
        config: {
          selectText: 'Todos',
          list: [
            { value: 'Activo', title: 'Activo' },
            { value: 'Inactivo', title: 'Inactivo' },
            { value: 'Vencido', title: 'Vencido' },
          ],

        },
      },
      editor: {
        type: 'list',
        config: {
          list: [
            { value: 'Activo', title: 'Activo' },
            { value: 'Inactivo', title: 'Inactivo' },
            { value: 'Vencido', title: 'Vencido' },
          ],

        },
      },
    },
    nombre: {
      title: 'Nombre',
    },
    paterno: {
      title: 'Paterno'
    },
    materno: {
      title: 'Materno'
    },
    email:{
      title:"Correo"
    }
  },
  pager: {
    display: true,
    perPage: 15
  },
 
};

icon="fas fa-eye"
type="password"

data:any;

@ViewChild(Content) content: Content;//minimizar header(menu)

  infousuarionuevo= {
    "usuario": null,
    "tipoUsuario": null,
    "password": null,
    "estadoUsuario": null,
    "persona": {
        "nombre": null,
        "paterno": null,
        "materno": null,
        "email": null
    },
    "notificar": 0
}

mensaje:any;

selectEstadosUsuarios:any;
selectTipoUsuarios:any;

usuarioSeleccionado:any

tipoUsuario:any;
estadoUsuario:any;
nombre:any;
paterno:any;
materno:any;
email:any;
usuario:any;
password:any;

Usuariokey:any;//valor para vuscar info

pwdEncriptada:any;

inputsdisabled=true;
buttonSavehidden=true;
buttonUpdDelhidden=true;

  constructor(public alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams,
    //servicios CI
    public authservice:AuthserviceProvider,
    public selectService:SelectserviceProvider,
    public mvService:MvserviceProvider,
    public catService:CatalogserviceProvider,
    ) {
 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CatusuariosPage');
    this.getinfogralUsuarios();
    this.infoselectEstadousuario();
    this.infoselectTipousuario();
    
  }

  getinfogralUsuarios(){
  this.catService.getinfogralUsuarios().then(result=>{
    console.log(result)
    this.data=result;
    let i=0;
    for(i=0;i<this.data.length;i=i+1){
      this.data[i].nombre=this.data[i].persona.nombre;
      this.data[i].paterno=this.data[i].persona.paterno;
      this.data[i].materno=this.data[i].persona.materno;
      this.data[i].email=this.data[i].persona.email;
    }
    console.log(this.data);
    },(err)=>{
      console.log(err);
    }
    );
  }

  nuevousuario(){
    this.inputsdisabled=false;
    this.buttonSavehidden=false;
    this.buttonUpdDelhidden=true;
    this.usuario=null;
    this.tipoUsuario=null;
    this.estadoUsuario=null;
    this.nombre=null;
    this.paterno=null;
    this.materno=null;
    this.email=null;
    this.password=null;
  }

  encriptacontrasena(data){
    let pwdencriptada={ password:data}; //contraseña en formato requerido para que el JSON lo encripte
    this.authservice.encripta(pwdencriptada).then((result)=>{
      console.log(result);
      this.pwdEncriptada=result
      },(err)=>{
        console.log(err);
      }
      );
  }

   async guardarusuario(){
    if(this.tipoUsuario==null || this.tipoUsuario==""
    || this.estadoUsuario==null || this.estadoUsuario==""
    || this.nombre==null || this.nombre==""
    || this.paterno==null || this.paterno==""
    || this.materno==null || this.materno==""
    || this.email==null || this.email==""
    || this.usuario==null || this.usuario==""
    || this.password==null || this.password==""
    // || this.infousuario.movil==null || this.infousuario.movil==""
    ){
      this.mensaje="Usuario no creado\n favor de ingresar todos los datos"
      this.showAlert();
      console.log("no creado")
      }
      else
      {

        let pwdencriptada={ password:this.password}; //contraseña en formato requerido para que el JSON lo encripte
        this.authservice.encripta(pwdencriptada).then((result)=>{
          console.log(result);
          this.pwdEncriptada=result
          },(err)=>{
            console.log(err);
          }
          );



        this.infousuarionuevo.password=this.pwdEncriptada.password;
        this.infousuarionuevo.tipoUsuario=this.tipoUsuario;
        this.infousuarionuevo.estadoUsuario=this.estadoUsuario;
        this.infousuarionuevo.persona.nombre=this.nombre;
        this.infousuarionuevo.persona.paterno=this.paterno;
        this.infousuarionuevo.persona.materno=this.materno;
        this.infousuarionuevo.persona.email=this.email;
        this.infousuarionuevo.usuario=this.usuario;
        console.log(this.infousuarionuevo);
        await this.newUsuario(this.infousuarionuevo);
      }
  }
  

  newUsuario(datos){
    this.catService.newUsuario(datos).then(async (result)=>{
      console.log(result);
      console.log(this.infousuarionuevo);
      await this.getinfogralUsuarios();
      this.mensaje="Usuario creado exitosamente!"
      this.showAlert();
    },(err)=>{
      console.log(err);
    }  
    );
  }

  delUsuario(data){
    this.catService.delUsuario(data).then(async (result)=>{
      console.log(result)
      this.mensaje="Usuario "+data+" eliminado";
      this.showAlert();
      await this.getinfogralUsuarios();//cuando termina de eliminar en la bd, actualiza la tabla
    },(err)=>{
      console.log(err);
    }
    );
  }

  infoselectEstadousuario(){
    this.selectService.selectEstadoUsuario().then((result)=>{
      this.selectEstadosUsuarios=result;
      console.log(this.selectEstadosUsuarios);
    },(err)=>{
      console.log(err);
    }
    );
  }

  infoselectTipousuario(){
    this.selectService.selectTipoUsuarios().then((result)=>{
      this.selectTipoUsuarios=result;
      console.log(this.selectTipoUsuarios);
    },(err)=>{
      console.log(err);
    }
    );
  }

  getInfoUsuario(){
    this.catService.getUsuario(this.Usuariokey).then(result=>{
      console.log(result)
      this.usuarioSeleccionado=result;
      this.usuario=this.usuarioSeleccionado.usuario;
      this.tipoUsuario=this.usuarioSeleccionado.tipoUsuario;
      this.estadoUsuario=this.usuarioSeleccionado.estadoUsuario;
      this.nombre=this.usuarioSeleccionado.persona.nombre;
      this.paterno=this.usuarioSeleccionado.persona.paterno;
      this.materno=this.usuarioSeleccionado.persona.materno;
      this.email=this.usuarioSeleccionado.persona.email;
      this.decContrasena(this.usuarioSeleccionado.password)
    },(err)=>{
      console.log(err);
    }
    );
  }

  decContrasena(data){
    let pwd
    let pwdencriptada={ password:data}; //contraseña en formato requerido para que el JSON lo encripte
    this.authservice.decripta(pwdencriptada).then((result)=>{
      console.log(result);
      pwd=result
      this.password=pwd.password
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

  eliminarUsuario(){
    const confirm = this.alertCtrl.create({
      title: 'Desea eliminar el usuario '+ this.Usuariokey+" ?",
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            console.log('Agree clicked');
            this.Usuariokey;
            console.log();
            this.delUsuario(this.Usuariokey);
            this.usuario=null;
            this.tipoUsuario=null;
            this.estadoUsuario=null;
            this.nombre=null;
            this.paterno=null;
            this.materno=null;
            this.email=null;
            this.password=null;
            this.buttonUpdDelhidden=true;
            this.inputsdisabled=true;
          }
        }
      ]
    });
    confirm.present();
  }

   modificarUsuario(){//
    if(this.usuario==null || this.usuario==""
      || this.tipoUsuario==null  || this.tipoUsuario==""
      || this.estadoUsuario==null || this.estadoUsuario==""
      || this.nombre==null || this.nombre==""
      || this.paterno==null || this.paterno==""
      || this.materno==null || this.materno==""
      || this.email==null || this.email==""
      || this.password==null || this.password==""
      ){
        this.mensaje="Usuario no modificado\n favor de ingresar todos los datos correctamente";
        this.showAlert();
    }
    else
    {
      this.encriptacontrasena(this.password)
      this.usuarioSeleccionado.password=this.pwdEncriptada.password;
      this.usuarioSeleccionado.usuario=this.usuario
      this.usuarioSeleccionado.tipoUsuario= this.tipoUsuario
      this.usuarioSeleccionado.estadoUsuario=this.estadoUsuario
      this.usuarioSeleccionado.nombre=this.nombre
      this.usuarioSeleccionado.paterno=this.paterno
      this.usuarioSeleccionado.materno=this.materno
      this.usuarioSeleccionado.email=this.email
      this.usuarioSeleccionado.password=this.password
  
        console.log(this.usuarioSeleccionado);
      // this.catService.updUsuario(this.usuarioSeleccionado).then(async (result)=>{
      //   console.log(result)
      //   this.mensaje="Usuario modificado exitosamente!"
      //     this.showAlert();
      //   await this.getinfogralUsuarios(); //cuando termina de actualiza el producto en la bd, actualiza la tabla
      
      // },(err)=>{
      //   console.log(err);
      // }
      // )
  };
}

  updUsuario(data){
    this.catService.updUsuario(data).then(async (result)=>{
        console.log(result)
        // this.mensaje="Usuario modificado exitosamente!"
        //   this.showAlert();
        await this.getinfogralUsuarios(); //cuando termina de actualiza el producto en la bd, actualiza la tabla
      },(err)=>{
        console.log(err);
      }
      )
  }

cargarDatos(event) {
  console.log(event);
  this.Usuariokey=event.data.usuario;
  this.getInfoUsuario();
  this.buttonSavehidden=true;
  this.buttonUpdDelhidden=false;
  this.inputsdisabled=false;
  this.type="password"
  this.icon="fas fa-eye";
}

verpwd(){
  if(this.icon=="fas fa-eye"){
    this.icon="fas fa-eye-slash";
    this.type="text"
  }
  else{
    this.icon="fas fa-eye";
    this.type="password"
  }
}

onDeleteConfirm(event) {
  console.log("Delete Event In Console")
  console.log(event);
  const confirm = this.alertCtrl.create({
    title: 'Seguro que desea eliminar el usuario '+event.data.usuario+" ?",
    buttons: [
      {
        text: 'Cancelar',
        handler: () => {
          console.log('Disagree clicked');
        }
      },
      {
        text: 'Aceptar',
        handler: () => {
          console.log('Agree clicked');
          this.delUsuario(event.data.usuario);

        }
      }
    ]
  });
  confirm.present();
}

onSaveConfirm(event) { //Editar los productos
  console.log("Edit Event In Console")
  console.log(event);
  if(event.newData.usuario==null || event.newData.usuario==""
  ||event.newData.estadoUsuario==null || event.newData.estadoUsuario==""
  ||event.newData.tipoUsuario==null || event.newData.tipoUsuario==""
  ||event.newData.nombre==null || event.newData.nombre==""
  ||event.newData.paterno==null || event.newData.paterno==""
  ||event.newData.materno==null || event.newData.materno==""
  ||event.newData.email==null || event.newData.email==""
  ){
    this.mensaje="Usuario "+event.data.usuario+" no modificado favor de ingresar todos los datos correctamente"
    this.showAlert();
  }
  else{
    event.newData.persona.nombre=event.newData.nombre
    event.newData.persona.paterno=event.newData.paterno
    event.newData.persona.materno=event.newData.materno
    event.newData.persona.email=event.newData.email
    console.log(event.newData)
    this.updUsuario(event.newData);
    this.mensaje="Usuario "+event.data.usuario+" modificado correctamente"
    this.showAlert();
  }
}
}