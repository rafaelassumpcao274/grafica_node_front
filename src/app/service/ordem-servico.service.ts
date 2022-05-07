import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry } from 'rxjs';
import { OrdemDeServico } from 'src/models/ordem-de-servico';
import { Paginator } from 'src/models/Paginator';
import { BaseClass } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class OrdemServicoService extends BaseClass{
  constructor(private httpClient: HttpClient,
    ) {
    super();
  }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  listarEmpresas(obj?:Paginator) {

    return this.httpClient.post<Paginator>(this.API_URL+'/lista_empresa',obj,this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.handleError)
    )
  }

  // alterar rota para post clientes padrao
  salvar(ordemServico: OrdemDeServico): Observable<OrdemDeServico> {

    return this.httpClient.post<OrdemDeServico>(this.API_URL+'/empresa',ordemServico,this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
}
