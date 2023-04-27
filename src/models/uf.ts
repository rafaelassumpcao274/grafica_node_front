import { FormControl, FormGroup } from "@angular/forms";

export class Uf {

    id?:number;
    descricao?: string;


    static formUf():FormGroup{

      return new FormGroup({
        descricao:new FormControl()
      });
    }

}
