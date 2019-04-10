import { Pipe, PipeTransform } from '@angular/core';

/**
 npm i angular-6-datatable --save
 <!-- <tabladinamica -->
  <link rel="stylesheet"href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<link rel="stylesheet"href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"> esto va en index
 */
@Pipe({
  name: 'searchPipe',
})
export class SearchPipe implements PipeTransform {
  private searchKeyword: string = "";
private Result = [];
 

transform(items: any[], searchText: string): any[] {
  if (this.isObjNull(items)) return [-1];
  if (this.isObjNull(searchText)) return items;
  this.searchKeyword = searchText.toLowerCase();
  this.Result = items.filter(o => this.checkAgainstProperty(o.name));
  if (this.Result.length === 0) {
  return [-1];
  }
  return this.Result;
  }
   
  private checkAgainstProperty(property: any): boolean {
  let value: boolean = false;
   
  if (!this.isNullOrWhiteSpace(property)) {
  if (property.toLowerCase().indexOf(this.searchKeyword.toLowerCase()) >= 0) {
  value = true;
  }
  }
   
  return value;
  }
   
  public isObjNull(obj: any, isNumber = false): boolean {
  let value: boolean = true;
   
  if (!isNumber && obj && obj != undefined && obj != null)
  value = false;
  else if (isNumber && obj != undefined && obj != null)
  value = false;
   
  return value;
  }
   
  public isNullOrWhiteSpace(obj: string): boolean {
  let value: boolean = true;
   
  if (!this.isObjNull(obj) && obj.trim() != "")
  value = false;
   
  return value;
  }
}
