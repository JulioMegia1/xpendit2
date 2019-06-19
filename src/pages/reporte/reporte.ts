import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IonicPage, NavController, NavParams, LoadingController, Platform } from 'ionic-angular';
import {  FileTransfer,  FileTransferObject  } from '@ionic-native/file-transfer';  
import {  File  } from '@ionic-native/file';
import { HttpHeaders } from '@angular/common/http/http';

import { DocumentViewer } from "@ionic-native/document-viewer/ngx";


import { Http, ResponseContentType } from '@angular/http';



@IonicPage()
@Component({
  selector: 'page-reporte',
  templateUrl: 'reporte.html',
})
export class ReportePage {

  nombreplataforma

  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController,
    private transfer: FileTransfer, private file: File,public http: HttpClient,private platform:Platform
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportePage');
    this.presentLoadingCustom();
  }



  /*loading personalizado*/
  presentLoadingCustom() {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `
       
        <img src="../../assets/imgs/gif.gif" />
        <div>Descargando reporte ...</div>`,
      
    });

    loading.present();

    setTimeout(() => {
      
      window.open("http://dev.xpend-it.com:8889/extras/reporte/admin",'_blank');
      


    }, 3000);

    setTimeout(() => {
      loading.dismiss();
    }, 3000);
    
  }


  // public download(fileName, filePath) {  
  //   //here encoding path as encodeURI() format.  
  //   let url = encodeURI(filePath);  
  //   //here initializing object.  
  //   this.fileTransfer = this.transfer.create();  
  //   // here iam mentioned this line this.file.externalRootDirectory is a native pre-defined file path storage. You can change a file path whatever pre-defined method.  
  //   this.fileTransfer.download(url, this.file.externalRootDirectory + fileName, true).then((entry) => {  
  //       //here logging our success downloaded file path in mobile.  
  //       console.log('download completed: ' + entry.toURL());  
  //   }, (error) => {  
  //       //here logging our error its easier to find out what type of error occured.  
  //       console.log('download failed: ' + error);  
  //   });  }


  // download() {
  //   const url = 'http://dev.xpend-it.com:8889/extras/reporte/admin';
  //   this.fileTransfer.download(url, this.file.dataDirectory + 'file.pdf').then((entry) => {
  //     console.log('download complete: ' + entry.toURL());
  //   }, (error) => {
  //     // handle error
  //   });
  // }


  // downloadFile() {
  //   return this.http
  //     .get('https://jslim.net/path/to/file/download', {
  //       ResponseContentType.blob: ResponseContentType.Blob,
  //       search: // query string if have
  //     })
  //     .map(res => {
  //       return {
  //         filename: 'filename.pdf',
  //         data: res.blob()
  //       };
  //     })
  //     .subscribe(res => {
  //         console.log('start download:',res);
  //         var url = window.URL.createObjectURL(res.data);
  //         var a = document.createElement('a');
  //         document.body.appendChild(a);
  //         a.setAttribute('style', 'display: none');
  //         a.href = url;
  //         a.download = res.filename;
  //         a.click();
  //         window.URL.revokeObjectURL(url);
  //         a.remove(); // remove the element
  //       }, error => {
  //         console.log('download error:', JSON.stringify(error));
  //       }, () => {
  //         console.log('Completed file download.')
  //       });
  // }
  
// download(){
  download(fileName, filePath){
    let url = encodeURI(filePath);  

    let path = null;
    if (this.platform.is('ios')){
      path = this.file.documentsDirectory;

    }
    else{
      path = this.file.dataDirectory;
      this.nombreplataforma="android";
    }
    const fileTransfer=this.transfer.create();
    fileTransfer.download(url,this.file.externalRootDirectory+fileName,true).then((entry )=>{
      console.log('download completed: ' + entry.toURL());  
    }, (error) => {  
      console.log('download failed: ' + error);  

    })
  }



}
