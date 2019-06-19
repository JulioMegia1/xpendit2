import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';


/*
  Generated class for the DownloadProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DownloadProvider {

  constructor(public http: HttpClient) {
    console.log('Hello DownloadProvider Provider');
  }


  public getPDF(): Observable<Blob> {   
    //const options = { responseType: 'blob' }; there is no use of this
        let uri = '/my/uri';
        // this.http refers to HttpClient. Note here that you cannot use the generic get<Blob> as it does not compile: instead you "choose" the appropriate API in this way.
        return this.http.get(uri, { responseType: 'blob' });
    }




}
