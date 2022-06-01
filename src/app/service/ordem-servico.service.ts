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

  listarPaginado(obj?:Paginator) {

    return this.httpClient.post<Paginator>(this.API_URL+'/ordem-servico',obj,this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.handleError)
    )
  }

  salvar(ordemServico: OrdemDeServico): Observable<OrdemDeServico> {

    return this.httpClient.post<OrdemDeServico>(this.API_URL+'/ordem-servico/',ordemServico,this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  obterPorId(id:number): Observable<OrdemDeServico> {

    return this.httpClient.get<OrdemDeServico>(this.API_URL+'/ordem-servico/'+id,this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
}
