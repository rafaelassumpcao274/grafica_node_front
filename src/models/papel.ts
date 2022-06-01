import { FormControl, FormGroup } from "@angular/forms";
import { Auditoria } from "./auditoria";


export class Papel extends Auditoria {

  descricao?:string;
  quantidade_papel?:number


    static getForm(){
      return new FormGroup({
        id:new FormControl(),
        createdAt:new FormControl(),
        quantidade_papel:new FormControl(),
        descricao:new FormControl()
      });
    }
}
