import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Cliente } from 'src/models/cliente';
import { ListaOrdemDeServico } from 'src/models/listaOrdemServico';
import { Paginator } from 'src/models/Paginator';
import { BaseClass } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService extends BaseClass {


  constructor(private httpClient: HttpClient) {
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
  salvar(cliente: Cliente): Observable<Cliente> {

    return this.httpClient.post<Cliente>(this.API_URL+'/empresa',cliente,this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

}
