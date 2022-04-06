import { FormControl, FormGroup } from "@angular/forms";
import { Uf } from "./uf";

export class Cidade {

    id?:number;
    descricao_cidade?: string;
    uf?:Uf;



    static formCidade(){
      return new FormGroup({
        descricao_cidade:new FormControl(),
        uf: Uf.formUf()
      });

    }
}



