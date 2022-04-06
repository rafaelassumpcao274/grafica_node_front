import { Cliente } from "./cliente";
import { OrdemDeServico } from "./ordem-de-servico";

export interface ListaOrdemDeServico {

 listaOrdemServico?:OrdemDeServico[];
 empresa?:Cliente;
 mes?:number;

}