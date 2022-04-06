import { FormControl, FormGroup } from "@angular/forms";
import { Cidade } from "./cidade";

export class Bairro {

    id?:number;
    descricao_bairro?: string;
    cidade?:Cidade;

    static formBairro(){
      return new FormGroup({
        descricao_bairro: new FormControl(),
        cidade : Cidade.formCidade()
      });
    }
}



