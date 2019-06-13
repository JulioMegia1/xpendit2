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
  icon="fas fa-eye fa-2x "
  type="password"
  mensaje:any;
    // passwordshow : boolean=false; //cambiar el tipo de campo del pasword

  constructor(public navCtrl: NavController, public alertController:AlertController,public authservice: AuthserviceProvider,public ciService:CIprovider) {
    this.getUsers();
  }

  // public verpassword(){
  //   if(this.passwordshow){
  //     this.passwordshow=false;
  //     this.passwordType='password';
  //   }
  //   else{
  //     this.passwordshow=true;
  //     this.passwordType='text';
  //   }
  // }

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

    /*VALIDACIÓN CAMPOS VACIOS*/
    if(this.password==null || this.usuario==null){
     console.log("El usuario o password no pueden estar vacios");
     this.mensaje="El usuario o password no pueden estar vacios"
     this.showAlert();
    }else
    {

    /*VALIDACION CARACTERES NO PERMITIDOS*/
    let caracteresNovalidos:number=0;
    for(let i =0; i<this.usuario.length;i=i+1){
      console.log(this.usuario[i])
      if(this.usuario[i]==" " || this.usuario[i]=="*" || this.usuario[i]=="&" || this.usuario[i]=="%" ||this.usuario[i]=="'" || this.usuario[i]=="." || this.usuario[i]=='"' 
      ){
        console.log("Caracteres no validos")
        caracteresNovalidos=1
      }
      else{
        console.log("continua")
      }
    }
    console.log(caracteresNovalidos)
    if(caracteresNovalidos==1){
      console.log("Usuario con caracteres Ingresados no permitidos");
     this.mensaje="Usuario con caracteres Ingresados no permitidos"
     this.showAlert();
    }
    

    else{  
      
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
           
            if(entra.msg=="" || entra.status!=1)
            {
               console.log("valido");
             this.ciService.setUsuario(entra.usuario.usuario); //enviar el usuario mediante el provider
             this.ciService.setTipoUsuario(entra.usuario.tipoUsuario);
               this.navCtrl.push(MenuPage);
            }
            else{
              if(entra.msg=="El usuario no se encuentra activo..."){
                console.log("El usuario no se encuentra activo");
                this.mensaje="El usuario no se encuentra activo, contacte al administrador"
                this.showAlert();
              }
              else
              {
                if(entra.msg=="Usuario/Password incorrecto..."){
                  console.log("El usuario o password esta incorrecto");
                  this.mensaje="El usuario o password esta incorrecto!";
                  this.showAlert();
                }
              }
            
          }
        },(err)=>{
          console.log(err);
        }
        );
      },(err)=>{
        console.log(err);
      }
      )};}
    }


    verpwd(){
      console.log("cambiar pwd")
        if(this.icon=="fas fa-eye fa-2x "){
          this.icon="fas fa-eye-slash fa-2x ";
          this.type="text"
        }
        else{
          this.icon="fas fa-eye fa-2x ";
          this.type="password"
        }
    }

  showAlert(){
    let alert = this.alertController.create ({
      title: this.mensaje,
      buttons: ['OK']
    });
    alert.present();
  }



    
}
