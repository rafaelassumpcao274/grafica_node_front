import { Cliente } from "../cliente"
import { Formato } from "../formato"
import { Papel } from "../papel"
import { FiltroGeral } from "./filtro-geral"

export class FiltroOrdemServico extends FiltroGeral{

  cliente?:Cliente
  formato?:Formato
  papel?:Papel
  material?:string

}
