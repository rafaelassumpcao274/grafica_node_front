import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, debounceTime, Observable, retry } from 'rxjs';
import { Formato } from 'src/models/formato';
import { Paginator } from 'src/models/Paginator';
import { BaseClass } from './base.service';
import { Iservice } from './interface/iservice';
import { FiltroFormato } from 'src/models/filtros/filtro-formato';
import { FiltroGeral } from 'src/models/filtros/filtro-geral';

@Injectable({
  providedIn: 'root'
})
export class FormatoService extends BaseClass implements Iservice{
  constructor(private httpClient: HttpClient,
    ) {
    super();
  }


  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    params:new HttpParams()
  
  }


  listarAutoComplete<Formato>(evento: any): Observable<Formato[]> {

    let filtro: FiltroGeral = new FiltroGeral;
    if (evento) {
      filtro.descricaoGr = evento.value
      this.httpOptions.params = this.Params(filtro)
  }
  return this.httpClient.get<Formato[]>(this.API_URL + '/autocomplete/formato',  this.httpOptions)
  .pipe(
    debounceTime(300),
    retry(0),
    catchError(this.handleError)
  )
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
