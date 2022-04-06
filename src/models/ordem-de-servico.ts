import { Cliente } from "./cliente";

export interface OrdemDeServico {

    id?:number;
    empresa?:Cliente;
    material?: string;
    papel?:number;
    cor_frente?: string;
    cor_verso?: string;
    formato?:number;
    quantidade_folhas?:number;
    numeracao_ini?:number;
    numeracao_final?:number;
    observacao?: string;
    acabamento?: string;
}