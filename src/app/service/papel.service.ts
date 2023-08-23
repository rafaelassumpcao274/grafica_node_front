import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, debounceTime, Observable, retry } from 'rxjs';

import { Paginator } from 'src/models/Paginator';
import { BaseClass } from './base.service';
import { Iservice } from './interface/iservice';
import { FiltroGeral } from 'src/models/filtros/filtro-geral';
import { Papel } from 'src/models/papel';

@Injectable({
  providedIn: 'root'
})
export class PapelService extends BaseClass implements Iservice{
  constructor(private httpClient: HttpClient,
    ) {
    super();
  }


  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    params:new HttpParams()
  
  }


  listarAutoComplete<Papel>(evento: any): Observable<Papel[]> {

    let filtro: FiltroGeral = new FiltroGeral;
    if (evento) {
      filtro.descricaoGr = evento.value
      this.httpOptions.params = this.Params(filtro)
  }
  return this.httpClient.get<Papel[]>(this.API_URL + '/autocomplete/papel',  this.httpOptions)
  .pipe(
    debounceTime(300),
    retry(0),
    catchError(this.handleError)
  )
}


  listarPaginado(obj?:Paginator) {

    return this.httpClient.post<Paginator>(this.API_URL+'/Papels',obj,this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.handleError)
    )
  }

  // alterar rota para post clientes padrao
  salvar(papel: Papel): Observable<Papel> {

    return this.httpClient.post<Papel>(this.API_URL+'/Papel',Papel,this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
}
