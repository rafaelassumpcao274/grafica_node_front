import { FormGroup, FormControl } from "@angular/forms";
import { Auditoria } from "./auditoria";

export class Formato  extends Auditoria{
  
  descricao?:string;

  static getForm(){
    return new FormGroup({
      id:new FormControl(),
      createdAt:new FormControl(),
      descricao:new FormControl()
    });
  }

}
