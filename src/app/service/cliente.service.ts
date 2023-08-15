import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Cliente } from 'src/models/cliente';
import { FiltroCliente } from 'src/models/filtros/filtro-cliente';
import { ListaOrdemDeServico } from 'src/models/listaOrdemServico';
import { Paginator } from 'src/models/Paginator';
import { BaseClass } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService extends BaseClass {


  constructor(private httpClient: HttpClient,
    ) {
    super();
  }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    params:new HttpParams()
  }

  obterPorId(id:number) {

    return this.httpClient.get<Paginator>(this.API_URL+'/empresa/'+id,this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.handleError)
    )
  }


  listarPaginado(obj?:FiltroCliente) {

    return this.httpClient.post<Paginator>(this.API_URL+'/lista_empresa',obj,this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.handleError)
    )
  }

  listar(obj?:FiltroCliente) {
   this.httpOptions.params.set("page",obj?.paginacao?.currentPage ?? 0)
    return this.httpClient.get<Paginator>(this.API_URL+'/empresa',this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.handleError)
    )
  }

  // alterar rota para post clientes padrao
  salvar(cliente: Cliente): Observable<Cliente> {

    return this.httpClient.post<Cliente>(this.API_URL+'/empresa',cliente,this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  update(cliente: Cliente): Observable<Cliente> {

    return this.httpClient.put<Cliente>(this.API_URL+'/empresa',cliente,this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  excluir(id:number): Observable<any> {

    return this.httpClient.delete<any>(this.API_URL+'/empresa/'+id,this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

}
