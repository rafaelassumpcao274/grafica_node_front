import { FormControl, FormGroup } from "@angular/forms";

export class Uf {

    id?:number;
    descricao_uf?: string;


    static formUf():FormGroup{

      return new FormGroup({
        descricao_uf:new FormControl()
      });
    }

}
