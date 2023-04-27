import { FormControl, FormGroup } from "@angular/forms";
import { Cidade } from "./cidade";

export class Bairro {

    id?:number;
    descricao?: string;
    cidade?:Cidade;

    static formBairro(){
      return new FormGroup({
        descricao: new FormControl(),
        cidade : Cidade.formCidade()
      });
    }
}



