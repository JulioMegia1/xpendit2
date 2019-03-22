import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
/*****************paginas**************/
import { MenuPage } from "../menu/menu";
import { PantallaprincipalPage } from "../pantallaprincipal/pantallaprincipal";
/*****************paginas**************/
/*servicios*/
import { ServicioApiProvider } from "../../providers/servicio-api/servicio-api";
/*servicios*/

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  users: any;//usado para obtener los usuarios del json 
  usuario: string;//Agregue usuario 
  password: string;////agregue contraseña
  passwordType: string ='password';
  passwordshow : boolean=false;
  pwdenc2:any;
  entra:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertController:AlertController,public servicioApi: ServicioApiProvider) {
    this.getUsers();
  }

  public verpassword(){
    if(this.passwordshow){
      this.passwordshow=false;
      this.passwordType='password';
    }
    else{
      this.passwordshow=true;
      this.passwordType='text';
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  getUsers(){
    this.servicioApi.getUsers().then(data => {
      this.users=data;
      console.log("estoy en get users y obtengo los datos del json:");
      console.log(this.users)     
    }
    )
  }

  login(){
    console.log("esta es la contraseña ingresada en el input:")
    console.log(this.password)
    let pwdencriptada={ password:this.password}; //contraseña en formato requerido para que el JSON lo encripte

    console.log(pwdencriptada);

    this.servicioApi.encripta(pwdencriptada).then((result)=>{
      //console.log(result);
      this.pwdenc2=result;
      console.log(this.pwdenc2);
      // ****************************
      console.log(this.pwdenc2.password);
      let prueba={usuario:this.usuario,password:this.pwdenc2.password}
      console.log(prueba);
      this.servicioApi.login(prueba).then((result)=>{
        console.log(result);
        this.entra= result;
        console.log(this.entra.msg,this.entra.status)
        if(this.password==null || this.usuario==null)
             {
              console.log("El usuario o password no pueden estar vacios");
              let alert = this.alertController.create ({
                title: 'El usuario o password no pueden estar vacios!',
                buttons: ['OK']
              });
              alert.present();
             }
             else{
        if(this.entra.msg=="" || this.entra.status!=1)
        {
           console.log("valido");
           //let datosusuario=this.entra.usuario;
           let usuario=this.entra.usuario.tipoUsuario;
           console.log(usuario);
          //  this.navCtrl.push(PantallaprincipalPage,{"datosusuario":datosusuario});
           this.navCtrl.push(MenuPage,{usuario});
        }
        else{
          if(this.entra.msg=="El usuario no se encuentra activo..."){
            console.log("El usuario no se encuentra activo");
            let alert = this.alertController.create ({
              title: 'El usuario no se encuentra activo, contacte al administrador',
              buttons: ['OK']
            });
            alert.present();
          }
          else{
            if(this.entra.msg=="Usuario/Password incorrecto..."){
              console.log("El usuario o password esta incorrecto");
              let alert = this.alertController.create ({
                title: 'El usuario o password esta incorrecto!',
                buttons: ['OK']
              });
              alert.present();
               
            }
            
          }
        }

        }
 
         },(err)=>{
           console.log(err);
         }
         
         );
      //*************************************** */

       },(err)=>{
         console.log(err);
       }
      
       );
  }

}
