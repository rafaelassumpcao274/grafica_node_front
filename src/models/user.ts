import { FormControl, FormGroup } from "@angular/forms";

export class User {

  id?:number;
  userName?:string;
  password?: string;


  static formUser():FormGroup{

    return new FormGroup({
      userName:new FormControl(),
      password:new FormControl()
    });
  }

}
