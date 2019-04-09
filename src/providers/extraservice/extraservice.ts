import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class ExtraserviceProvider {

  url ='http://dev.xpend-it.com:8889'

  constructor(public http: HttpClient) {
    console.log('Hello ExtraserviceProvider Provider');
  }

}
