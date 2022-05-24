import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry } from 'rxjs';
import { Formato } from 'src/models/formato';
import { Paginator } from 'src/models/Paginator';
import { BaseClass } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class FormatoService extends BaseClass{
  constructor(private httpClient: HttpClient,
    ) {
    super();
  }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  listarPaginado(obj?:Paginator) {

    return this.httpClient.post<Paginator>(this.API_URL+'/formatos',obj,this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.handleError)
    )
  }

  // alterar rota para post clientes padrao
  salvar(formato: Formato): Observable<Formato> {

    return this.httpClient.post<Formato>(this.API_URL+'/formato',formato,this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
}
