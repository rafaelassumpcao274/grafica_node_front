import { FormControl, FormGroup } from "@angular/forms";
import { Uf } from "./uf";

export class Cidade {

    id?:number;
    descricao?: string;
    uf?:Uf;



    static formCidade(){
      return new FormGroup({
        descricao:new FormControl(),
        uf: Uf.formUf()
      });

    }
}



