import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
/*servicios*/
import { MvserviceProvider } from "../../providers/mvservice/mvservice";






@IonicPage()
@Component({
  selector: 'page-detalleproducto',
  templateUrl: 'detalleproducto.html',
})
export class DetalleproductoPage {
  /*variables*/
  idmaquina=4;
  idproducto=-1;
  infoproducto:any;


  constructor(public navCtrl: NavController, public navParams: NavParams,public mvservice:MvserviceProvider) {
    
    //this.getinfoproducto(this.idmaquina,this.idproducto)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalleproductoPage');
    
  }
  ionViewCanEnter(){
    //this.getinfoproducto(this.idmaquina,this.idproducto)

  }
  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getinfoproducto(this.idmaquina,this.idproducto)
    
  }




  getinfoproducto(idmaquina,idproducto){
    this.mvservice.infoproducto(idmaquina,idproducto).then(result=>{
      this.infoproducto= result;
      console.log(result);
      console.log(this.infoproducto.seleccion)
      console.log(this.infoproducto.producto.precioCompra)
      console.log(this.infoproducto.existencia)
      console.log(this.infoproducto.producto.descripcion)
      console.log(this.infoproducto.faltante)
      console.log(this.infoproducto.maximo)
      
     
      },(err)=>{
        console.log(err);
      }
      );
    }



}
