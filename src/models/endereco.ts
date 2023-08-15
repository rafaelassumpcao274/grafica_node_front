import { FormControl, FormGroup } from "@angular/forms";
import { Bairro } from "./bairro";

export class Endereco {

    id?:number;
    descricao?: string;
    bairro?:Bairro;
    cep?:number;
    numero?:number;
    complemento?:string;

    static formEndereco(){
      return new FormGroup({
        descricao: new FormControl(),
        cep:new FormControl(),
        numero:new FormControl(),
        complemento:new FormControl(),
        bairro : Bairro.formBairro()
      });

    };
}




