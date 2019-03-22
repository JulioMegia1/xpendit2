import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class NightmodeProvider {
  public activeTheme: string ="theme-light";

  constructor(public http: HttpClient) {
    console.log('Hello NightmodeProvider Provider');
  }

}
