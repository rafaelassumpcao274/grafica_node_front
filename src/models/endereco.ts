import { FormControl, FormGroup } from "@angular/forms";
import { Bairro } from "./bairro";

export class Endereco {

    id?:number;
    descricao_endereco?: string;
    bairro?:Bairro;
    cep?:number;

    static formEndereco(){
      return new FormGroup({
        descricao_endereco: new FormControl(),
        cep:new FormControl(),
        bairro : Bairro.formBairro()
      });

    };
}




