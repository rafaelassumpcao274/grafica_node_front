import { FormControl, FormGroup } from "@angular/forms";
import { Bairro } from "./bairro";

export class Endereco {

    id?:number;
    descricao?: string;
    bairro?:Bairro;
    cep?:number;

    static formEndereco(){
      return new FormGroup({
        descricao: new FormControl(),
        cep:new FormControl(),
        bairro : Bairro.formBairro()
      });

    };
}




