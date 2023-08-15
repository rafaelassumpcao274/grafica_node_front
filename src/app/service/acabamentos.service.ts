import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry } from 'rxjs';
import { OrdemDeServico } from 'src/models/ordem-de-servico';
import { Paginator } from 'src/models/Paginator';
import { BaseClass } from './base.service';
import { Acabamentos } from 'src/models/acabamentos';

@Injectable({
  providedIn: 'root'
})
export class AcabamentosService extends BaseClass{
  constructor(private httpClient: HttpClient,
    ) {
    super();
  }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  listarPaginado(obj?:Paginator):Observable<Acabamentos[]>{

    return this.httpClient.get<Acabamentos[]>(this.API_URL+'/acabamento',this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.handleError)
    )
  }

  salvar(acabamentos: Acabamentos): Observable<Acabamentos> {

    return this.httpClient.post<Acabamentos>(this.API_URL+'/acabamento',acabamentos,this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

}
