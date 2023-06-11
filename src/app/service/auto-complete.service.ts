import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, debounceTime, Observable, retry, throwError } from 'rxjs';
import { Cliente } from 'src/models/cliente';
import { FiltroCliente } from 'src/models/filtros/filtro-cliente';
import { FiltroFormato } from 'src/models/filtros/filtro-formato';
import { FiltroPapel } from 'src/models/filtros/filtro-papel';
import { Formato } from 'src/models/formato';
import { ListaOrdemDeServico } from 'src/models/listaOrdemServico';
import { Paginator } from 'src/models/Paginator';
import { Papel } from 'src/models/papel';
import { BaseClass } from './base.service';
import { FiltroGeral } from 'src/models/filtros/filtro-geral';
import { Endereco } from 'src/models/endereco';

@Injectable({
  providedIn: 'root'
})
export class AutoCompleteService extends BaseClass {


  constructor(private httpClient: HttpClient,
  ) {
    super();
  }

  // // Headers
  // httpOptions = {
  //   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  // }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    params: new HttpParams()
  };




  listarCliente(obj?: FiltroCliente) {


    if (obj) {
      obj.descricaoGr = obj.nome_empresa
      this.httpOptions.params = this.Params(obj)
    }
    return this.httpClient.get<Cliente[]>(this.API_URL + '/autocomplete/empresa', this.httpOptions)
      .pipe(
        debounceTime(300),
        retry(0),
        catchError(this.handleError)
      )
  }

  listarFormato(obj?: FiltroFormato) {
    return this.httpClient.post<Formato[]>(this.API_URL + '/autoComplete/formato', obj, this.httpOptions)
      .pipe(
        debounceTime(300),
        retry(0),
        catchError(this.handleError)
      )
  }

  listarPapel(obj?: FiltroPapel) {
    return this.httpClient.post<Papel[]>(this.API_URL + '/autoComplete/papel', obj, this.httpOptions)
      .pipe(
        debounceTime(300),
        retry(0),
        catchError(this.handleError)
      )
  }


  buscarCep(filtro: FiltroGeral):Observable<Endereco> {

    if (filtro) {
      this.httpOptions.params = this.Params(filtro)
    }
    return this.httpClient.get<Endereco>(this.API_URL + '/autocomplete/endereco/cep', this.httpOptions)
      .pipe(
        debounceTime(300),
        retry(0),
        catchError(this.handleError)
      )
  }
}