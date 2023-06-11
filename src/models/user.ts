import { FormControl, FormGroup } from "@angular/forms";

export class User {

  id?:number;
  nome?:string;
  password?: string;
  rememberMe: boolean = false

  static formUser():FormGroup{

    return new FormGroup({
      nome:new FormControl(),
      password:new FormControl(),
      rememberMe:new FormControl()
    });
  }

}
