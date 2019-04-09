import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class CatalogserviceProvider {

  url ='http://dev.xpend-it.com:8892'

  constructor(public http: HttpClient) {
    console.log('Hello CatalogserviceProvider Provider');
  }

}
