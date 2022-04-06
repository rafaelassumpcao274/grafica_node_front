import { FormControl, FormGroup } from "@angular/forms";
import { Endereco } from "./endereco";

export class Cliente {

    id?:number;
    nome_empresa?: string;
    razao_social?: string;
    endereco?:Endereco;
    cnpj?:number;
    email?: string;
    contato?: string;
    telefone?:number;

    static formCliente(){
      return new FormGroup({
        nome_empresa: new FormControl(),
        razao_social:  new FormControl(),
        cnpj: new FormControl(),
        email:  new FormControl(),
        contato:  new FormControl(),
        telefone: new FormControl(),
        endereco:Endereco.formEndereco()
      });
    }
}
