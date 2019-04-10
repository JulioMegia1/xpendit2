import { Component, OnInit } from '@angular/core';


import { DataServiceProvider } from "../../providers/data-service/data-service";

@Component({
  selector: 'table-demo',
  templateUrl: 'table-demo.html'
})
export class TableDemoComponent implements OnInit   {

  items = ['Java', 'Spring', 'API'];
public searchTxt:any;
public obj: any =[
{'name':'Developement', 'email' :'HRIS', 'age' :'34', 'city':'Noida, UP, India' },
{'name':'HRIS', 'email' :'php', 'age' :'34', 'city':'Noida' },
{'name':'QA', 'email' :'Wordpress', 'age' :'34', 'city':'Noida' },
{'name':'Testing', 'email' :'java', 'age' :'34', 'city':'Noida' },
{'name':'Office', 'email' :'Codeingiter', 'age' :'34', 'city':'Noida' },
{'name':'Marketing', 'email' :'API', 'age' :'34', 'city':'Noida' },
{'name':'Finacial', 'email' :'Spring', 'age' :'34', 'city':'Noida' },
{'name':'Sales', 'email' :'Laravel', 'age' :'34', 'city':'Noida' },
{'name':'Exceutive', 'email' :'jQuery', 'age' :'34', 'city':'Noida' },
{'name':'Developement', 'email' :'HRIS', 'age' :'34', 'city':'Noida, UP, India' },
{'name':'HRIS', 'email' :'php', 'age' :'34', 'city':'Noida' },
{'name':'QA', 'email' :'Wordpress', 'age' :'34', 'city':'Noida' },
{'name':'Testing', 'email' :'java', 'age' :'34', 'city':'Noida' },
{'name':'Office', 'email' :'Codeingiter', 'age' :'34', 'city':'Noida' },
{'name':'Marketing', 'email' :'API', 'age' :'34', 'city':'Noida' },
{'name':'Finacial', 'email' :'Spring', 'age' :'34', 'city':'Noida' },
{'name':'Sales', 'email' :'Laravel', 'age' :'34', 'city':'Noida' },
{'name':'Exceutive', 'email' :'jQuery', 'age' :'34', 'city':'Noida' },
{'name':'Developement', 'email' :'HRIS', 'age' :'34', 'city':'Noida, UP, India' },
{'name':'HRIS', 'email' :'php', 'age' :'34', 'city':'Noida' },
{'name':'QA', 'email' :'Wordpress', 'age' :'34', 'city':'Noida' },
{'name':'Testing', 'email' :'java', 'age' :'34', 'city':'Noida' },
{'name':'Office', 'email' :'Codeingiter', 'age' :'34', 'city':'Noida' },
{'name':'Marketing', 'email' :'API', 'age' :'34', 'city':'Noida' },
{'name':'Finacial', 'email' :'Spring', 'age' :'34', 'city':'Noida' },
{'name':'Sales', 'email' :'Laravel', 'age' :'34', 'city':'Noida' },
{'name':'Exceutive', 'email' :'jQuery', 'age' :'34', 'city':'Noida' }
];
 
userlist: any[]=[];

usuarios:any; 


  constructor( public dataService:DataServiceProvider) {
    console.log('Hello TableDemoComponent Component');
    this.getusuarios();
    this.userlist=this.obj;
    
    console.log(this.userlist)
    

  }
  ngOnInit() {
  }


  getusuarios(){
    console.log("constructor")
    this.dataService.getcatalogousuarios().then(data => {
      this.usuarios=data;
      console.log("estoy en get menu y obtengo los datos del json:");
      console.log(this.usuarios); 
      this.userlist=this.usuarios;
    }
    );
  }

  


}
