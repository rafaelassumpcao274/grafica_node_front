import { FormControl, FormGroup } from "@angular/forms";
import { Endereco } from "./endereco";

export class Cliente {

    id?:number;
    nomeEmpresa?: string;
    razaoSocial?: string;
    endereco?:Endereco;
    cnpj?:number;
    email?: string;
    contato?: string;
    telefone?:string;

    static formCliente(){
      return new FormGroup({
        nomeEmpresa: new FormControl(),
        razaoSocial:  new FormControl(),
        cnpj: new FormControl(),
        email:  new FormControl(),
        contato:  new FormControl(),
        telefone: new FormControl(),
        endereco:Endereco.formEndereco()
      });
    }
}
