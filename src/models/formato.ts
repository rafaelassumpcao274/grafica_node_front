import { FormGroup, FormControl } from "@angular/forms";
import { Auditoria } from "./auditoria";

export class Formato  extends Auditoria{
  descricao_formato?:string;

  static getForm(){
    return new FormGroup({
      id:new FormControl(),
      createdAt:new FormControl(),
      descricao_formato:new FormControl()
    });
  }

}
