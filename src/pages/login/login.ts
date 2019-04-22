import { Component } from '@angular/core';
import { IonicPage, NavController,AlertController } from 'ionic-angular';
/*****************paginas**************/
import { MenuPage } from "../menu/menu";
/*****************paginas**************/
/*servicios*/

import { AuthserviceProvider } from "../../providers/authservice/authservice";
import { CIprovider } from "../../providers/data/data";
/*servicios*/

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  users: any;//usado para obtener los usuarios del json 
  usuario: string;// usuario 
  password: any;// contraseña
  passwordType: string ='password'; //cambiar el tipo de campo del pasword
  passwordshow : boolean=false; //cambiar el tipo de campo del pasword

  constructor(public navCtrl: NavController, public alertController:AlertController,public authservice: AuthserviceProvider,public servicetipousuario:CIprovider) {
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

  getUsers(){
    this.authservice.getUsers().then(data => {
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

    this.authservice.encripta(pwdencriptada).then((result)=>{
      //console.log(result);
      let resppwdwdenc:any; //Respuesta de la encriptacion
      resppwdwdenc=result;
      console.log(resppwdwdenc);
      // ****************************
      console.log(resppwdwdenc.password);
      let login={usuario:this.usuario,password:resppwdwdenc.password} //datos para enviar al login
      console.log(login);
      this.authservice.login(login).then((result)=>{
        console.log(result);
        let entra:any;///respuesta del login
        entra= result;
        console.log(entra.msg,entra.status)
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
        if(entra.msg=="" || entra.status!=1)
        {
           console.log("valido");
         this.servicetipousuario.setTipoUsuario(entra.usuario.usuario); //obtener el tipo de usuario mediante el provider
           this.navCtrl.push(MenuPage);
        }
        else{
          if(entra.msg=="El usuario no se encuentra activo..."){
            console.log("El usuario no se encuentra activo");
            let alert = this.alertController.create ({
              title: 'El usuario no se encuentra activo, contacte al administrador',
              buttons: ['OK']
            });
            alert.present();
          }
          else{
            if(entra.msg=="Usuario/Password incorrecto..."){
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
