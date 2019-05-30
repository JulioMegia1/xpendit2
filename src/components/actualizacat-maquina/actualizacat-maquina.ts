import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';

/**Servicios */
import { CIprovider } from '../../providers/data/data';

@Component({
  selector: 'actualizacat-maquina',
  templateUrl: 'actualizacat-maquina.html'
})
export class ActualizacatMaquinaComponent {

  idmaquina:any;
  
  
  constructor(public ciService:CIprovider,public alertCtrl: AlertController) {
    console.log('Hello ActualizacatMaquinaComponent Component');
    this.idmaquina=this.ciService.getIdmaquinaCatalogo();
    console.log(this.idmaquina)  
  }


}
