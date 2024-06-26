import { FormGroup, FormControl } from "@angular/forms";
import { Cliente } from "./cliente";
import { Formato } from "./formato";
import { Papel } from "./papel";
import { Acabamentos } from "./acabamentos";

export class OrdemDeServico {

    id?:number;
    createdAt?:Date;
    empresa?:Cliente;
    material: string="";
    papel?:Papel;
    cor_frente?: string;
    cor_verso?: string;
    formato?:Formato;
    quantidade_folhas?:number;
    numeracao_ini?:number;
    numeracao_final?:number;
    observacao: string = "";
    listaAcabamentos?: Acabamentos;


    static getForm(){
      return new FormGroup({
        id:new FormControl(),
        createdAt:new FormControl(),
        empresa:Cliente.formCliente(),
        material:new FormControl(),
        papel:Papel.getForm(),
        cor_frente: new FormControl(),
        cor_verso: new FormControl(),
        formato:Formato.getForm(),
        quantidade_folhas:new FormControl(),
        numeracao_ini:new FormControl(),
        numeracao_final:new FormControl(),
        observacao: new FormControl(),
        listaAcabamentos: Acabamentos.formAcabamentos(),
      });
    }


}
